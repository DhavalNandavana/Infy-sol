import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  readonly isScrolled = signal(false);

  private bound = false;

  init(): void {
    if (this.bound) return;
    this.bound = true;
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    this.onScroll();
  }

  private onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  destroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
    this.bound = false;
  }
}
