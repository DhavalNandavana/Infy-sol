import { Injectable, NgZone } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class AnimationService {
  constructor(private ngZone: NgZone) {}

  initScrollTrigger(): void {
    ScrollTrigger.defaults({
      toggleActions: 'play none none none'
    });
  }

  revealElement(el: HTMLElement, delay: number = 0): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }

  revealElements(elements: HTMLElement[], stagger: number = 0.15): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo(elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elements[0],
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }

  animateCounter(el: HTMLElement, target: number, suffix: string): void {
    this.ngZone.runOutsideAngular(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val) + suffix;
        }
      });
    });
  }

  heroEntrance(container: HTMLElement): void {
    this.ngZone.runOutsideAngular(() => {
      const items = container.querySelectorAll('.reveal');
      gsap.fromTo(items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    });
  }

  createParallax(el: HTMLElement, yPercent: number = -20): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.to(el, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  cleanup(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  refreshScrollTrigger(): void {
    ScrollTrigger.refresh();
  }
}
