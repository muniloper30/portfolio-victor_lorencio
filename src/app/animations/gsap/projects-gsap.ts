import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateProjects(container: HTMLElement) {
    // Timeline for featured projects
    const tlFeatured = gsap.timeline({
        scrollTrigger: {
            trigger: '.projects-heading',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });

    tlFeatured.from('.projects-heading', {
        x: -50,
        opacity: 0,
        duration: 0.8
    })
        .from('.featured-project', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: 'power3.out'
        }, '-=0.4');

    // Separate trigger for "Other Projects" heading
    gsap.from('.other-projects-heading', {
        scrollTrigger: {
            trigger: '.other-projects-heading',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.8
    });

    // Use batch for the grid items to handle many elements correctly
    ScrollTrigger.batch('.project-card', {
        start: 'top 95%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: true
        })
    });
}

