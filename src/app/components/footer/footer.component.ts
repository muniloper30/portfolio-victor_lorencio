import { Component, signal, AfterViewInit, ViewChild, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-angular';
import { animateFooter } from '../../animations/gsap/footer-gsap';

interface SocialLink {
  name: string;
  url: string;
  icon?: any;
  svg?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('footerRef') footerRef!: ElementRef;

  githubIcon = Github;
  linkedinIcon = Linkedin;
  twitterIcon = Twitter;
  instagramIcon = Instagram;
  mailIcon = Mail;

  socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', url: 'https://github.com/muniloper30', icon: this.githubIcon },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/victorlorencio/', icon: this.linkedinIcon },
    { name: 'Twitter', url: 'https://x.com/VictorLorencio', svg: '/x.svg' },
    { name: 'Instagram', url: 'https://www.instagram.com/victorlorencio/', icon: this.instagramIcon },
  ]);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      animateFooter(this.footerRef.nativeElement);
    }
  }
}


