import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillModalComponent } from './skill-modal/skill-modal.component';

interface Skill {
    name: string;
    icon: string;
    description: string;
    years: string;
    usage: string;
    inStudy: string;
    size: 'large' | 'small';
    color: string;
}

type ColumnItem = Skill | Skill[];

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, SkillModalComponent],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent {

    selectedSkill = signal<Skill | null>(null);

    // Columns Structure
    columns: ColumnItem[][] = [
        // Column 1: JavaScript (Big) -> [Java, Docker] (Row) -> Tailwind (Small)
        [
            {
                name: 'JavaScript',
                icon: 'assets/icons/javascript.svg',
                description: 'JavaScript es uno de los lenguajes que más utilizo en mi día a día como desarrollador web. Comencé a usarlo desde mis primeros pasos en la programación y lo sigo aplicando actualmente en proyectos reales. Lo empleo tanto en el desarrollo de interfaces modernas como en la lógica de aplicaciones web, y continúo profundizando en el lenguaje y su ecosistema.',
                years: '2 años',
                usage: '⬆⬆⬆',
                inStudy: 'Sí',
                size: 'large',
                color: '#F7DF1E'
            },
            // Row: Java + Docker
            [
                { name: 'Java', icon: 'assets/icons/java.svg', description: 'Java fue el primer lenguaje que aprendí durante el ciclo formativo. Actualmente le doy menos uso, pero sigo reforzándolo y aplicándolo en proyectos backend con Spring Boot.', years: '2 años', usage: '⬆', inStudy: 'Sí', size: 'small', color: '#F55B23' },
                { name: 'Docker', icon: 'assets/icons/docker.svg', description: 'Utilicé Docker durante mis prácticas en CodeArts Solutions para trabajar con entornos de desarrollo y despliegue. Aún necesito seguir profundizando en su uso, ya que no lo aplico de forma habitual, pero tengo una base práctica y conocimiento de sus conceptos principales.', years: '3 meses', usage: '⬇⬇', inStudy: '—', size: 'small', color: '#2496ED' }
            ],
            // New: Tailwind CSS
            { name: 'Tailwind CSS', icon: 'assets/icons/tailwind.svg', description: 'Tailwind CSS es una de las herramientas que más utilizo porque me encanta su forma de trabajar. Lo uso en la mayoría de mis proyectos para maquetar y estilizar interfaces de forma rápida, consistente y mantenible.', years: '2 años', usage: '⬆⬆⬆', inStudy: 'Sí', size: 'small', color: '#06B6D4' }
        ],

        // Column 2: [Node, Spring] (Row) -> React (Big) -> [Postman, Figma] (Row)
        [
            // Row: Node + Spring
            [
                { name: 'Node.js', icon: 'assets/icons/node.svg', description: 'Utilicé Node.js principalmente en mis primeros proyectos backend. Lo empleé para desarrollar la API de Workout Forge y para el proyecto de fin de grado Otakusphere, creando y consumiendo APIs REST integradas con el frontend.', years: '1 año', usage: '⬇', inStudy: '—', size: 'small', color: '#339933' },
                { name: 'Spring Boot', icon: 'assets/icons/springboot.svg', description: 'Actualmente quiero estudiar Spring Boot en profundidad junto con Angular para enfocarme más en el desarrollo backend. Hice un un CRUD siguiendo un curso en Udemy para retomar el framework y ponerme al día con sus conceptos principales.', years: '3 meses', usage: '⬇', inStudy: 'Sí', size: 'small', color: '#6DB33F' }
            ],
            // React
            {
                name: 'React',
                icon: 'assets/icons/react.svg',
                description: 'React fue el framework que utilicé al inicio para mis proyectos personales en frontend. Lo he usado en proyectos como Workout Forge para crear interfaces dinámicas y bien estructuradas, y es una tecnología con la que me siento muy cómodo trabajando.',
                years: '2 años',
                usage: '⬆⬆',
                inStudy: 'Sí',
                size: 'large',
                color: '#61DAFB'
            },
            // New Row: Postman + Figma
            [
                { name: 'Postman', icon: 'assets/icons/postman.svg', description: 'Utilizo Postman como herramienta principal para probar y validar endpoints de APIs REST durante el desarrollo backend.', years: '1 año', usage: '⬆⬆', inStudy: '—', size: 'small', color: '#FF6C37' },
                { name: 'Figma', icon: 'assets/icons/figma.svg', description: 'He utilizado Figma para diseñar y prototipar vistas de mis proyectos web. Lo puse especialmente en práctica durante mis prácticas en CodeArts Solutions y en el rediseño de la web de Makking Of.', years: '1 año', usage: '⬇⬇', inStudy: '—', size: 'small', color: '#F24E1E' }
            ]
        ],

        // Column 3: TS (Big) -> Angular (Big)
        [
            {
                name: 'TypeScript',
                icon: 'assets/icons/typescript.svg',
                description: 'Utilizo TypeScript actualmente con Angular. Considero que es una herramienta muy útil para crear aplicaciones más escalables y seguras, reduciendo errores y bugs. Aunque tengo menos experiencia, me estoy formando para dominar bien sus bases.',
                years: '7 meses',
                usage: '⬆⬆',
                inStudy: 'Sí',
                size: 'large',
                color: '#3178C6'
            },
            {
                name: 'Angular',
                icon: 'assets/icons/angular.svg',
                description: 'Angular es el framework con el que está desarrollado este portfolio y también lo utilicé durante mis prácticas profesionales. Me gusta su estructura y organización, aunque es más complejo y requiere mayor documentación, lo que lo hace muy potente para aplicaciones grandes y bien organizadas.',
                years: '7 meses',
                usage: '⬆⬆⬆',
                inStudy: 'Sí',
                size: 'large',
                color: '#DD0031'
            }
        ],

        // Column 4: [Git, MySQL] (Row) -> Astro (Big) -> PostgreSQL (Small)
        [
            // Row
            [
                { name: 'Git', icon: 'assets/icons/git.svg', description: 'Utilizo Git desde hace varios años para el control de versiones y la gestión de repositorios. Es una herramienta clave en mi flujo de trabajo diario, tanto en proyectos personales como colaborativos.', years: '3 años', usage: '⬆⬆⬆', inStudy: '—', size: 'small', color: '#F05032' },
                { name: 'MySQL', icon: 'assets/icons/mysql.svg', description: 'Utilicé MySQL principalmente durante el primer año de estudio para practicar SQL y realizar distintas tareas y ejercicios relacionados con bases de datos.', years: '1 año', usage: '⬇⬇', inStudy: '—', size: 'small', color: '#4479A1' }
            ],
            // Astro
            {
                name: 'Astro',
                icon: 'assets/icons/astro.svg',
                description: 'He utilizado Astro en un proyecto profesional para De Corazón Web, ya que es uno de los mejores frameworks para sitios content-focused y alto rendimiento. También lo he usado en mi portfolio GTA junto con animaciones GSAP. Me gusta mucho su enfoque, aunque necesito seguir profundizando.',
                years: '6 meses',
                usage: '⬆',
                inStudy: 'Sí',
                size: 'large',
                color: '#BC52EE'
            },
            // PostgreSQL
            { name: 'PostgreSQL', icon: 'assets/icons/postgresql.svg', description: 'He utilizado PostgreSQL durante el último año del ciclo formativo y en varios proyectos personales, como Otakusphere, para la gestión y diseño de bases de datos en aplicaciones backend.', years: '1 año', usage: '⬆', inStudy: '—', size: 'small', color: '#336791' }
        ]
    ];

    isSkill(item: ColumnItem): item is Skill {
        return 'name' in item;
    }

    openModal(skill: Skill) {
        this.selectedSkill.set(skill);
    }

    closeModal() {
        this.selectedSkill.set(null);
    }
}
