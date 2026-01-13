import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateContact(container: HTMLElement) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    tl.from('.contact-heading', {
        y: 30,
        opacity: 0,
        duration: 0.8
    })
        .from('.contact-content', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4');

    return tl;
}
