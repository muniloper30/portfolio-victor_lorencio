import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    private platformId = inject(PLATFORM_ID);
    private lenis: Lenis | null = null;

    init() {
        if (!isPlatformBrowser(this.platformId)) return;

        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: true, // Mimic touch device scroll while allowing scroll sync
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Synchronize Lenis with GSAP ScrollTrigger
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    scrollTo(target: string | HTMLElement) {
        if (this.lenis) {
            this.lenis.scrollTo(target, {
                offset: -80, // Offset for the fixed header
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    }

    get instance() {
        return this.lenis;
    }
}
