import { gsap } from 'gsap';

export function animateHeader() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('header', {
        y: -100,
        opacity: 0,
        duration: 1
    })
        .from('.nav-link-item', {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, '-=0.5');

    return tl;
}

export function animateMobileMenu(isOpen: boolean) {
    const overlay = '.mobile-menu-overlay';
    const links = '.mobile-nav-link';

    if (isOpen) {
        const tl = gsap.timeline();

        tl.fromTo(overlay,
            { x: '100%', autoAlpha: 0, pointerEvents: 'none' },
            { x: '0%', autoAlpha: 1, pointerEvents: 'auto', duration: 0.6, ease: 'expo.out' }
        )
            .fromTo(links,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, '-=0.4');

        return tl;
    } else {
        const tl = gsap.timeline();

        tl.to(links, {
            x: 50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.in'
        })
            .to(overlay, {
                x: '100%',
                autoAlpha: 0,
                pointerEvents: 'none',
                duration: 0.5,
                ease: 'expo.in'
            }, '-=0.2');

        return tl;
    }
}
