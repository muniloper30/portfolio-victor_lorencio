import { Component, signal, OnInit, AfterViewInit, inject, PLATFORM_ID, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateHero } from '../../animations/gsap/hero-gsap';
import { ScrollService } from '../../services/scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  private ctx?: gsap.Context;

  @ViewChild('nameVictor') nameVictor!: ElementRef;
  @ViewChild('nameLorencio') nameLorencio!: ElementRef;
  @ViewChild('typewriter') typewriter!: ElementRef;

  nameText = 'Víctor Lorencio';
  nameChars = signal<string[]>([]);

  ngOnInit() {
    // No specific initialization needed for text anymore as GSAP handles it
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ctx = gsap.context(() => {
        animateHero(
          this.nameVictor.nativeElement,
          this.nameLorencio.nativeElement,
          this.typewriter.nativeElement
        );
      });
    }
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }

  scrollTo(event: Event, target: string) {
    event.preventDefault();
    this.scrollService.scrollTo(target);
  }
}
