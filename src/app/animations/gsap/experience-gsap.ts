import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateExperience(container: HTMLElement) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    tl.from('.experience-heading', {
        x: -50,
        opacity: 0,
        duration: 0.8
    })
        .from('.experience-tabs', {
            x: -30,
            opacity: 0,
            duration: 0.8
        }, '-=0.4')
        .from('.experience-content', {
            opacity: 0,
            y: 20,
            duration: 0.6
        }, '-=0.4');

    return tl;
}

export function animateJobTransition(content: HTMLElement, onUpdate: () => void) {
    const tl = gsap.timeline();

    // 1. Fade out current content
    tl.to(content, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
            onUpdate(); // Update Angular state (triggers re-render)

            // Wait for Angular to render new items
            setTimeout(() => {
                const items = content.querySelectorAll('.reveal-item');
                gsap.set(items, { y: '110%' });
                gsap.set(content, { opacity: 1, y: 0 });

                gsap.to(items, {
                    y: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: 'power4.out'
                });
            }, 0);
        }
    });

    return tl;
}
