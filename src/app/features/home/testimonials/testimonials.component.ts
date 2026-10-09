import { Component, signal, computed, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TestimonialCardComponent } from '../../../shared/components/testimonial-card/testimonial-card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TESTIMONIALS_DATA } from '../../../core/constants/testimonial.data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealDirective, TestimonialCardComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  readonly testimonials = TESTIMONIALS_DATA;
  readonly currentIndex = signal(0);
  readonly direction = signal<'next' | 'prev'>('next');
  readonly currentTestimonial = computed(() => this.testimonials[this.currentIndex()]);

  private autoScrollInterval: ReturnType<typeof setInterval> | null = null;
  private resumeTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly autoScrollDelay = 4500;

  private touchStartX = 0;
  private touchStartY = 0;

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  nextTestimonial(): void {
    this.direction.set('next');
    this.currentIndex.update(i => (i + 1) % this.testimonials.length);
    this.pauseAutoScroll();
    this.resumeAutoScroll();
  }

  previousTestimonial(): void {
    this.direction.set('prev');
    this.currentIndex.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
    this.pauseAutoScroll();
    this.resumeAutoScroll();
  }

  goTo(index: number): void {
    if (index === this.currentIndex()) return;
    this.direction.set(index > this.currentIndex() ? 'next' : 'prev');
    this.currentIndex.set(index);
    this.pauseAutoScroll();
    this.resumeAutoScroll();
  }

  startAutoScroll(): void {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      this.direction.set('next');
      this.currentIndex.update(i => (i + 1) % this.testimonials.length);
    }, this.autoScrollDelay);
  }

  stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = null;
    }
  }

  pauseAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = null;
    }
  }

  resumeAutoScroll(): void {
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    this.resumeTimeout = setTimeout(() => {
      this.startAutoScroll();
    }, 2500);
  }

  onTouchStart(event: TouchEvent): void {
    this.pauseAutoScroll();
    if (event.touches.length > 0) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (event.changedTouches.length > 0) {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const deltaX = touchEndX - this.touchStartX;
      const deltaY = touchEndY - this.touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          this.nextTestimonial();
        } else {
          this.previousTestimonial();
        }
      }
    }
    this.resumeAutoScroll();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousTestimonial();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextTestimonial();
    }
  }
}
