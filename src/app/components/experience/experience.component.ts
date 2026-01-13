import { Component, signal, inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit, computed, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateExperience, animateJobTransition } from '../../animations/gsap/experience-gsap';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('sectionRef') sectionRef!: ElementRef;
  @ViewChild('experienceContent') experienceContent!: ElementRef;

  activeTab = signal(0);

  jobs = signal([
    // ... same jobs ...
    {
      company: 'Freelance',
      title: 'Full Stack Developer',
      period: 'Octubre 2023 — Presente',
      url: '',
      responsibilities: [
        'Desarrollé aplicaciones y sitios web utilizando React, Astro, Angular, JavaScript y TypeScript, enfocadas en rendimiento, mantenibilidad y experiencia de usuario.',
        'Implementé el consumo e integración de APIs REST para la obtención y gestión de datos en aplicaciones frontend.',
        'Apliqué buenas prácticas de desarrollo, estructuración del código y control de versiones con Git en proyectos reales para clientes.',
      ]
    },
    {
      company: 'Code Arts Solutions',
      title: 'Full Stack (Prácticas profesionales)',
      period: 'Marzo 2025 — Junio 2025',
      url: 'https://www.codeartssolutions.com/',
      responsibilities: [
        'Participé en el rediseño de Makking Of, desde el prototipado en Figma hasta el desarrollo frontend con Angular y TypeScript, creando componentes reutilizables y diseño responsive.',
        'Integré y consumí APIs REST, trabajando sobre backend existente en PHP con Symfony, implementando autenticación JWT y validando flujos con Postman.',
        'Utilicé Docker en entornos Ubuntu, gestioné datos con PostgreSQL y trabajé en equipo bajo metodología Agile Scrum, con enfoque en calidad del código.',
      ]
    },
    {
      company: 'Anovo Comlink',
      title: 'Técnico de Servicio Electrónico',
      period: 'Junio 2017 — Febrero 2025',
      url: 'https://www.anovo.es/',
      responsibilities: [
        'Mantenimiento y reparación de equipos electrónicos y sistemas informáticos en entornos técnicos.',
        'Soporte técnico y resolución de incidencias, trabajando en equipos internos bajo estándares de calidad.',
        'Atención al cliente y soporte técnico para resolver problemas y diferentes tipos de incidencias.',
      ]
    }
  ]);

  currentJob = computed(() => this.jobs()[this.activeTab()]);
  renderedJob = signal<any>(null);

  constructor() {
    // Inicializar el trabajo renderizado con el primer trabajo
    this.renderedJob.set(this.jobs()[0]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      animateExperience(this.sectionRef.nativeElement);
    }
  }

  selectTab(index: number) {
    if (this.activeTab() === index) return;

    if (isPlatformBrowser(this.platformId)) {
      animateJobTransition(this.experienceContent.nativeElement, () => {
        this.activeTab.set(index);
        this.renderedJob.set(this.jobs()[index]);
      });
    } else {
      this.activeTab.set(index);
      this.renderedJob.set(this.jobs()[index]);
    }
  }
}
