import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { Testimonial } from '../../../core/models/testimonial.model';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="testi-card glass" tabindex="0">
      <div class="quote-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 .001 0 1 1 1z"/>
        </svg>
      </div>
      <div class="stars" aria-label="5 out of 5 stars">{{ getStars() }}</div>
      <p>{{ testimonial().quote }}</p>
      <div class="testi-person">
        <div class="avatar" [attr.aria-label]="testimonial().name + ' avatar'">
          <span class="avatar-initials">{{ initials() }}</span>
        </div>
        <div class="person-info">
          <b>{{ testimonial().name }}</b>
          <span>{{ testimonial().role }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './testimonial-card.component.css'
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<Testimonial>();

  readonly initials = computed(() => {
    const name = this.testimonial().name;
    const parts = name.split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  });

  getStars(): string {
    return '\u2605'.repeat(this.testimonial().rating);
  }
}
