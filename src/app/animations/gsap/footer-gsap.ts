import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateFooter(container: HTMLElement) {
    return gsap.from(container, {
        scrollTrigger: {
            trigger: container,
            start: 'top 95%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
}
