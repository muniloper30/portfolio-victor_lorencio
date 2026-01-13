import {
    trigger,
    transition,
    style,
    animate,
    query,
    stagger,
    state,
    keyframes,
} from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
]);

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
    ]),
]);

export const fadeInLeft = trigger('fadeInLeft', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
]);

export const fadeInRight = trigger('fadeInRight', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
]);

export const staggerChildren = trigger('staggerChildren', [
    transition(':enter', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('100ms', [
                animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ], { optional: true }),
    ]),
]);

export const slideInFromRight = trigger('slideInFromRight', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
]);

export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' })),
    ]),
    transition(':leave', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(100%)' })),
    ]),
]);

export const scaleIn = trigger('scaleIn', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
    ]),
]);

export const typewriter = trigger('typewriter', [
    transition(':enter', [
        query('.char', [
            style({ opacity: 0 }),
            stagger('100ms', [
                animate('0.5s ease-out', style({ opacity: 1 }))
            ])
        ], { optional: true })
    ])
]);
