import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Service to manage JSON-LD structured data for SEO
 * Helps search engines understand the page content better
 */
@Injectable({
    providedIn: 'root'
})
export class StructuredDataService {
    constructor(@Inject(DOCUMENT) private document: Document) { }

    /**
     * Adds JSON-LD structured data to the page
     */
    addStructuredData(data: object): void {
        const script = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        this.document.head.appendChild(script);
    }

    /**
     * Creates Person schema for portfolio
     */
    createPersonSchema(): object {
        return {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Víctor Lorencio García',
            jobTitle: 'Desarrollador Full Stack',
            url: 'https://victorlorencio.com',
            sameAs: [
                'https://github.com/muniloper30',
                'https://www.linkedin.com/in/v%C3%ADctor-lorencio-garc%C3%ADa-a75a7a28b/'
            ],
            knowsAbout: [
                'JavaScript',
                'TypeScript',
                'Angular',
                'React',
                'Node.js',
                'PostgreSQL',
                'Docker',
                'GSAP',
                'Web Performance Optimization'
            ],
            description: 'Desarrollador Full Stack especializado en crear experiencias web modernas y accesibles con enfoque en rendimiento y buenas prácticas.',
            image: 'https://victorlorencio.com/assets/victor.png'
        };
    }

    /**
     * Creates WebSite schema
     */
    createWebSiteSchema(): object {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Víctor Lorencio García Portfolio',
            url: 'https://victorlorencio.com',
            description: 'Portfolio profesional de Víctor Lorencio García - Desarrollador Full Stack',
            author: {
                '@type': 'Person',
                name: 'Víctor Lorencio García'
            }
        };
    }
}
