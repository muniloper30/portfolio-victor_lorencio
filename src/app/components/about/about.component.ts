import { Component, signal, inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateAbout } from '../../animations/gsap/about-gsap';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('sectionRef') sectionRef!: ElementRef;

  skills = signal([
    'JavaScript (ES6+)',
    'TypeScript',
    'Angular',
    'React',
    'Gsap',
    'Node.js',
    'PostgreSQL',
    'Docker',
  ]);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      animateAbout(this.sectionRef.nativeElement);
    }
  }
}
