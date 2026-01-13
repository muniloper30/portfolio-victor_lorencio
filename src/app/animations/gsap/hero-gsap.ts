import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export function animateHero(nameVictor: HTMLElement, nameLorencio: HTMLElement, typewriter?: HTMLElement) {
    // Hidden state
    gsap.set('.hero-main-content', { autoAlpha: 1 }); // Main container visible but children hidden
    gsap.set([nameVictor, nameLorencio], { opacity: 0, text: "" });
    gsap.set(['#wave1', '#wave2', '#wave3'], { strokeDasharray: 1000, strokeDashoffset: 1000 });

    const tl = gsap.timeline({
        defaults: { ease: 'power4.out' }
    });

    // 1. Reveal name lines (Typewriter effect)
    tl.to(nameVictor, {
        opacity: 1,
        duration: 1.2,
        text: { value: "Victor", delimiter: "" },
        ease: "power1.inOut"
    }, 0.5)
        .to(nameLorencio, {
            opacity: 1,
            duration: 1.5,
            text: { value: "Lorencio", delimiter: "" },
            ease: "power1.inOut"
        }, "-=0.3")
        .addLabel("nameDone"); // 👈 justo al acabar Lorencio

    // 3. Looping Phrase Animation (Start after name animation)
    tl.add(() => {
        const phrases = ["Frontend Developer", "Fitness freak", "Pasta Lover"];

        if (typewriter) {
            const loopTl = gsap.timeline({ repeat: -1 });

            phrases.forEach((phrase) => {
                loopTl
                    // Type In
                    .set(typewriter, {
                        opacity: 1,
                        x: 0,
                        text: "",
                        borderRight: "2px solid #e3e019ff"
                    })
                    .to(typewriter, {
                        duration: 1.5, // 👈 más rápido (antes 1.5)
                        text: { value: phrase, delimiter: "" },
                        ease: "none"
                    })
                    .to({}, { duration: 1.5 }) // pause más corta
                    // Type Out
                    .to(typewriter, {
                        duration: 1.5,
                        text: { value: "", delimiter: "" },
                        ease: "none"
                    })
                    .set(typewriter, { opacity: 0 });
            });
        }
    }, "nameDone"); //Start after name animation


    // Infinite oscillation for waves
    gsap.to('#wave1', {
        attr: { d: "M-400,400 Q360,500 1120,400 T1840,400" },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to('#wave2', {
        attr: { d: "M-400,450 Q360,300 1120,450 T1840,450" },
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to('#wave3', {
        attr: { d: "M-400,500 Q360,600 1120,500 T1840,500" },
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    return tl;
}
