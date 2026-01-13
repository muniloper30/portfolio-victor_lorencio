import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateContact } from '../../animations/gsap/contact-gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('sectionRef') sectionRef!: ElementRef;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      animateContact(this.sectionRef.nativeElement);
    }
  }
}
