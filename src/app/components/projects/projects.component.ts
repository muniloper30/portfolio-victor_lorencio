import { Component, signal, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Github, ExternalLink, Folder } from 'lucide-angular';
import { animateProjects } from '../../animations/gsap/projects-gsap';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('sectionRef') sectionRef!: ElementRef;

  githubIcon = Github;
  externalLinkIcon = ExternalLink;
  folderIcon = Folder;

  featuredProjects = signal([
    {
      title: 'DeCorazón las Palmas',
      description: 'Aplicación web para la promoción de servicios de decoración de eventos. Construida con Astro para maximizar rendimiento y SEO, utiliza Tailwind CSS para un diseño moderno y responsivo, e integra EmailJS para el envío de formularios de contacto sin necesidad de backend.El proyecto está desplegado en producción bajo dominio propio .es, cuidando aspectos de accesibilidad, optimización y experiencia de usuario.',
      technologies: ['Astro', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'EmailJS'],
      github: 'https://github.com/muniloper30/decorazonweb',
      demo: 'https://decorazonlaspalmas.es/',
      image: 'assets/projects/project1.png'
    },
    {
      title: 'Workout Forge',
      description: 'Aplicación web para la creación y gestión de rutinas de entrenamiento personalizadas. Desarrollada con React para el frontend y backend en Node.js + Express , bases de datos almacenada en Supabase .',
      technologies: ['React', 'Node.js', 'Express', 'Supabase', 'Maps API'],
      github: 'https://github.com/muniloper30/workout-forge',
      demo: 'https://workout-forge.vercel.app/',
      image: 'assets/projects/project2.png'
    },
    {
      title: 'Portfolio Web inspirado en GTA VI',
      description: 'Proyecto personal y educativo enfocado en la creación de una experiencia web visualmente impactante, inspirada en la estética y narrativa del videojuego GTA VI. A partir del aprendizaje obtenido en el desarrollo de una landing page desde cero, el proyecto evoluciona hacia un portfolio interactivo que combina diseño moderno, animaciones avanzadas y alto rendimiento.',
      technologies: ['Astro', 'Tailwind CSS', 'GSAP', ''],
      github: 'https://github.com/muniloper30/portfolioGta',
      demo: 'https://portfolio-gta.vercel.app/',
      image: 'assets/projects/project3.png'
    }
  ]);

  otherProjects = signal([
    {
      title: 'GifsApp',
      description: 'Aplicación de búsqueda de GIFs desarrollada para dominar Angular moderno (v17+). Implementa Signals para la gestión reactiva del estado, inject para una inyección de dependencias más limpia y componentes standalone, aplicando buenas prácticas actuales en arquitectura y consumo de APIs.',
      technologies: ['Angular', 'Tailwind CSS', 'TypeScript', 'GIPHY API'],
      github: 'https://github.com/muniloper30/GifsApp'
    },
    {
      title: 'Makking Of (Prácticas profesionales)',
      description: 'Rediseño completo de la web para la una agencia especializada en desarrollo de negocio, eventos, audiovisual, rrss, comunicación, marketing. Desarrollo full stack con Symfony y Angular: API REST, autenticación JWT, control de roles, componentes reutilizables, diseño responsive y protección de rutas',
      technologies: ['Angular', 'Symfony', 'JWT', 'Docker', 'PostgreSQL', 'Git', 'GitHub', 'Agile', 'Scrum',],

    },
    {
      title: 'Otakusphere',
      description: 'Plataforma web para registrar, valorar y gestionar animes y mangas vistos, pendientes y favoritos, con integración de APIs externas (AniList / MyAnimeList API) para información actualizada.',
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'API REST', 'PostgreSQL', 'Git/GitHub', 'Agile/Scrum'],
      github: 'https://github.com/muniloper30/otakusphere',
      demo: ''
    },
    {
      title: 'Api Workout',
      description: 'Api Rest para la gestión de rutinas de entrenamiento personalizadas. Construida con Node.js y Express para alimentar Workout Forge. Incluye autenticación, gestión de usuarios y endpoints seguros para rutinas personalizadas.',
      technologies: ['Node.js', 'JavaScript', 'Supabase', 'PostgreSQL', 'Postman', 'Git/GitHub',],
      github: 'https://github.com/muniloper30/workouts-fit-api',
      demo: 'https://workouts-fit-api.vercel.app/',
    },
    {
      title: 'Todo List',
      description: 'Primera aplicación web sencilla To-Do List (lista de tareas) Creada para aprender HTML, CSS y JavaScript, donde los usuarios pueden agregar, eliminar y marcar tareas como completadas. La aplicación utiliza LocalStorage para guardar las tareas de forma persistente, lo que permite que las tareas se conserven incluso después de cerrar o recargar el navegador.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'],
      github: 'https://github.com/muniloper30/todoList',
      demo: 'https://todo-list-psi-rust-49.vercel.app/'
    },
    {
      title: 'Reluvo - Recovery & Mobility App',
      description: 'Reluvo es una aplicación de bienestar actualmente en desarrollo, enfocada en la movilidad, los estiramientos y la recuperación corporal. Su objetivo es ayudar a reducir la rigidez, aliviar tensiones y mejorar el movimiento diario mediante rutinas guiadas y una experiencia de usuario calmada y accesible.',
      technologies: ['En desarrollo'],
      github: ''
    }
  ]);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      animateProjects(this.sectionRef.nativeElement);
    }
  }
}
