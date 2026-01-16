import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * Directive for optimizing images with lazy loading, proper dimensions,
 * and loading priorities to improve Core Web Vitals (LCP, CLS)
 * 
 * Usage:
 * <img appOptimizeImage [src]="imagePath" alt="description" [eager]="false" width="800" height="600">
 */
@Directive({
    selector: 'img[appOptimizeImage]',
    standalone: true
})
export class OptimizeImageDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    /**
     * Set to true for above-the-fold images (hero, LCP elements)
     * Set to false for below-the-fold images
     */
    @Input() eager = false;

    /**
     * Image width - REQUIRED to prevent CLS
     */
    @Input() width?: number;

    /**
     * Image height - REQUIRED to prevent CLS
     */
    @Input() height?: number;

    ngOnInit() {
        const img = this.el.nativeElement as HTMLImageElement;

        // Set loading attribute based on priority
        if (this.eager) {
            this.renderer.setAttribute(img, 'loading', 'eager');
            this.renderer.setAttribute(img, 'fetchpriority', 'high');
        } else {
            this.renderer.setAttribute(img, 'loading', 'lazy');
        }

        // Ensure width and height are set to prevent CLS
        if (this.width) {
            this.renderer.setAttribute(img, 'width', this.width.toString());
        }
        if (this.height) {
            this.renderer.setAttribute(img, 'height', this.height.toString());
        }

        // Add decoding attribute for better performance
        this.renderer.setAttribute(img, 'decoding', this.eager ? 'sync' : 'async');

        // Warn if dimensions are missing (CLS risk)
        if (!this.width || !this.height) {
            console.warn(
                `OptimizeImageDirective: Missing width or height for image. This may cause CLS issues.`,
                img.src
            );
        }
    }
}
