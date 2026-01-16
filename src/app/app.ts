import { Component, signal, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollService } from './services/scroll.service';
import { StructuredDataService } from './services/structured-data.service';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  private structuredDataService = inject(StructuredDataService);
  protected readonly title = signal('Víctor Lorencio García');

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Add structured data for SEO (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.structuredDataService.addStructuredData(this.structuredDataService.createPersonSchema());
      this.structuredDataService.addStructuredData(this.structuredDataService.createWebSiteSchema());
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.init();
    }
  }
}

