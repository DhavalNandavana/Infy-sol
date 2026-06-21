import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { FEATURED_WORK_DATA } from '../../../core/constants/featured-work.data';

@Component({
  selector: 'app-featured-work',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './featured-work.component.html',
  styleUrl: './featured-work.component.css'
})
export class FeaturedWorkComponent {
  readonly features = FEATURED_WORK_DATA;
}
