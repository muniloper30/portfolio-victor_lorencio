import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Make Skills animate EXACTLY like your Projects animation style:
 * - A heading animates in (like .projects-heading and .other-projects-heading)
 * - Cards animate in using ScrollTrigger.batch (best for many items)
 *
 * Requirements in your template:
 * - Skills heading element: add class="skills-heading" (or change selector below)
 * - Each skill card root element: add class="skill-card"
 */
export function animateSkills() {
    // SSR safety + reduced motion
    const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (typeof window === 'undefined' || prefersReduced) return null;

    // --- 1) Heading animation (matches "Other Projects" heading animation) ---
    gsap.from('.skills-heading', {
        scrollTrigger: {
            trigger: '.skills-heading',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.8
    });

    // --- 2) Cards animation (matches ScrollTrigger.batch('.project-card', ...) ) ---
    // Set initial state like your projects cards (invisible + moved)
    gsap.set('.skill-card', { opacity: 0, y: 50, scale: 1 });

    ScrollTrigger.batch('.skill-card', {
        start: 'top 95%',
        once: true,
        onEnter: (batch) =>
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: true
            })
    });

    // Optional: return triggers so you can kill/revert on destroy if needed
    return {
        kill: () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            gsap.killTweensOf('.skills-heading');
            gsap.killTweensOf('.skill-card');
        }
    };
}
