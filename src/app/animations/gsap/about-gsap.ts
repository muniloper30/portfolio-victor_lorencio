import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateAbout(container: HTMLElement) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    tl.from('.about-heading', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
        .from('.about-text', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.about-image', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        }, '-=0.8');

    // Subtle floating effect for the avatar
    gsap.to('.about-image', {
        y: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    return tl;
}
