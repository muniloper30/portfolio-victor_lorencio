import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    AfterViewChecked,
    OnChanges,
    SimpleChanges,
    inject,
    PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import gsap from 'gsap';

export interface ModalSkill {
    name: string;
    icon: string;
    description: string;
    years: string;
    usage: string;
    inStudy: string;
    color: string;
}

@Component({
    selector: 'app-skill-modal',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './skill-modal.component.html',
    styleUrl: './skill-modal.component.css',
})
export class SkillModalComponent implements OnChanges, AfterViewChecked {
    @Input() skill: ModalSkill | null = null;
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();

    @ViewChild('modalOverlay') overlayRef?: ElementRef<HTMLElement>;
    @ViewChild('modalContent') contentRef?: ElementRef<HTMLElement>;

    xIcon = X;
    private platformId = inject(PLATFORM_ID);

    private hasAnimatedIn = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (!isPlatformBrowser(this.platformId)) return;

        if (changes['isOpen']) {
            // cada vez que se abre, permitimos animar otra vez
            if (this.isOpen) this.hasAnimatedIn = false;
        }
    }

    ngAfterViewChecked(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        // cuando @if lo inserta, aquí ya tenemos refs
        if (this.isOpen && this.skill && !this.hasAnimatedIn && this.overlayRef && this.contentRef) {
            this.hasAnimatedIn = true;
            requestAnimationFrame(() => this.animateIn());
        }
    }

    closeModal(): void {
        if (!isPlatformBrowser(this.platformId)) {
            this.close.emit();
            return;
        }

        if (!this.overlayRef || !this.contentRef) {
            this.close.emit();
            return;
        }

        this.animateOut().then(() => this.close.emit());
    }

    private animateIn(): void {
        if (!this.overlayRef || !this.contentRef) return;

        const overlay = this.overlayRef.nativeElement;
        const content = this.contentRef.nativeElement;

        gsap.killTweensOf([overlay, content]);

        // Asegura que el overlay sea "clicable" (visibility visible) antes de animar
        gsap.set(overlay, { visibility: 'visible' });

        gsap.timeline()
            .to(overlay, { duration: 0.25, autoAlpha: 1, ease: 'power2.out' })
            .to(content, { duration: 0.35, autoAlpha: 1, scale: 1, y: 0, ease: 'power2.out' }, '-=0.12');
    }

    private animateOut(): Promise<void> {
        return new Promise((resolve) => {
            if (!this.overlayRef || !this.contentRef) return resolve();

            const overlay = this.overlayRef.nativeElement;
            const content = this.contentRef.nativeElement;

            gsap.killTweensOf([overlay, content]);

            gsap.timeline({
                onComplete: () => {
                    // opcional: dejarlo invisible por si Angular tarda un frame en quitarlo
                    gsap.set(overlay, { autoAlpha: 0, visibility: 'hidden' });
                    resolve();
                },
            })
                .to(content, { duration: 0.2, autoAlpha: 0, scale: 0.92, y: 8, ease: 'power2.in' })
                .to(overlay, { duration: 0.15, autoAlpha: 0, ease: 'power2.in' }, '-=0.08');
        });
    }
}
