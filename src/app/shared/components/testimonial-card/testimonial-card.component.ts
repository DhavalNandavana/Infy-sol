import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { Testimonial } from '../../../core/models/testimonial.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="testi-card glass" tabindex="0">
      <div class="testi-header">
        <div class="quote-icon" aria-hidden="true">
          <app-icon name="quote" />
        </div>
        <div class="stars" aria-label="5 out of 5 stars">
          {{ getStars() }}
        </div>
      </div>
      
      <p class="quote-text">&ldquo;{{ testimonial().quote }}&rdquo;</p>
      
      <div class="testi-divider"></div>

      <div class="testi-person">
        <div class="avatar" [attr.aria-label]="testimonial().name + ' avatar'">
          <span class="avatar-initials">{{ initials() }}</span>
        </div>
        <div class="person-info">
          <b class="person-name">{{ testimonial().name }}</b>
          <span class="person-role">{{ testimonial().role }}</span>
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
