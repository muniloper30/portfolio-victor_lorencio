import { gsap } from 'gsap';

/**
 * Header animation (SAFE for SSR + mobile)
 * - Uses immediateRender:false to avoid leaving the header hidden if the animation
 *   doesn't play for any reason (e.g., timing, hydration, in-app browsers).
 * - Uses gsap.context() so you can revert cleanly if you call it from a component.
 */
export function animateHeader() {
    // Respect reduced-motion (optional but recommended)
    const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    // If not in browser (SSR) or user prefers reduced motion, do nothing safely
    if (typeof window === 'undefined' || prefersReduced) {
        return null;
    }

    // Prevent "stuck hidden" state if something interrupts the timeline
    gsap.set('header', { clearProps: 'opacity,transform' });
    gsap.set('.nav-link-item', { clearProps: 'opacity,transform' });

    // Scope everything to this context (cleanup friendly)
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' }
        });

        tl.from('header', {
            y: -100,
            opacity: 0,
            duration: 1,
            immediateRender: false
        }).from(
            '.nav-link-item',
            {
                y: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                immediateRender: false
            },
            '-=0.5'
        );

        return tl;
    });

    // Return a small API so you can cleanup in ngOnDestroy if you want
    return {
        ctx,
        revert: () => ctx.revert()
    };
}

/**
 * Mobile menu animation (SAFE for SSR + mobile)
 * - Clears any previous tweens on targets to avoid conflicts on rapid toggles.
 * - Uses fromTo with immediateRender:false for safety.
 */
export function animateMobileMenu(isOpen: boolean) {
    // Respect reduced-motion (optional but recommended)
    const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    // If not in browser (SSR) or reduced motion, just set final state and exit
    if (typeof window === 'undefined' || prefersReduced) {
        if (typeof window !== 'undefined') {
            gsap.set('.mobile-menu-overlay', {
                x: isOpen ? '0%' : '100%',
                autoAlpha: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none'
            });
            gsap.set('.mobile-nav-link', {
                x: 0,
                opacity: isOpen ? 1 : 0
            });
        }
        return null;
    }

    const overlay = '.mobile-menu-overlay';
    const links = '.mobile-nav-link';

    // Kill existing tweens to prevent race conditions when toggling fast
    gsap.killTweensOf([overlay, links]);

    if (isOpen) {
        // Ensure overlay starts hidden off-canvas but without "stuck" states
        gsap.set(overlay, { x: '100%', autoAlpha: 0, pointerEvents: 'none' });
        gsap.set(links, { x: 100, opacity: 0 });

        const tl = gsap.timeline();

        tl.fromTo(
            overlay,
            { x: '100%', autoAlpha: 0, pointerEvents: 'none', immediateRender: false },
            { x: '0%', autoAlpha: 1, pointerEvents: 'auto', duration: 0.6, ease: 'expo.out' }
        ).fromTo(
            links,
            { x: 100, opacity: 0, immediateRender: false },
            { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)' },
            '-=0.4'
        );

        return tl;
    } else {
        const tl = gsap.timeline();

        tl.to(links, {
            x: 50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.in'
        }).to(
            overlay,
            {
                x: '100%',
                autoAlpha: 0,
                pointerEvents: 'none',
                duration: 0.5,
                ease: 'expo.in'
            },
            '-=0.2'
        );

        return tl;
    }
}
