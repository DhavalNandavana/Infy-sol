import { Component, signal, computed, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TestimonialCardComponent } from '../../../shared/components/testimonial-card/testimonial-card.component';
import { TESTIMONIALS_DATA } from '../../../core/constants/testimonial.data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealDirective, TestimonialCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  readonly testimonials = TESTIMONIALS_DATA;
  readonly currentIndex = signal(0);
  readonly translateX = computed(() => `-${this.currentIndex() * 100}%`);

  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.testimonials.length);
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
