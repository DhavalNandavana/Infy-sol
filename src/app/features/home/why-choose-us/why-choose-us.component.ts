import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { WHY_CHOOSE_DATA } from '../../../core/constants/why-choose.data';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.css',
})
export class WhyChooseUsComponent {
  readonly items = WHY_CHOOSE_DATA;
}
