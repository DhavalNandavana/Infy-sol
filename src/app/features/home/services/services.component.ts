import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ServiceCardComponent } from '../../../shared/components/service-card/service-card.component';
import { SERVICES_DATA } from '../../../core/constants/services.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective, ServiceCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  readonly services = SERVICES_DATA;
}
