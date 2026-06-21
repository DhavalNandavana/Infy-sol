import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Testimonial } from '../../../core/models/testimonial.model';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="testi-card glass">
      <div class="stars">{{ getStars() }}</div>
      <p>"{{ testimonial().quote }}"</p>
      <div class="testi-person">
        <div class="avatar"></div>
        <div>
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

  getStars(): string {
    return '★'.repeat(this.testimonial().rating);
  }
}
