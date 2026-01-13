import { Component, signal, HostListener, inject, PLATFORM_ID, AfterViewInit, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { animateHeader, animateMobileMenu } from '../../animations/gsap/header-gsap';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);

  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  menuIcon = Menu;
  xIcon = X;

  navItems = signal([
    { href: '#about', label: 'Sobre Mí' },
    { href: '#experience', label: 'Experiencia' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contacto' },
  ]);

  constructor() {
    // Sincronizar animaciones de GSAP con el estado del menú móvil
    effect(() => {
      const isOpen = this.mobileMenuOpen();
      if (isPlatformBrowser(this.platformId)) {
        animateMobileMenu(isOpen);
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 0);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      animateHeader();
    }
  }

  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    this.scrollService.scrollTo(href);
    this.closeMobileMenu();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}

