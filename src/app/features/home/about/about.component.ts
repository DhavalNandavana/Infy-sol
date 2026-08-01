import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { CounterComponent } from '../../../shared/components/counter/counter.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective, CounterComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {}

