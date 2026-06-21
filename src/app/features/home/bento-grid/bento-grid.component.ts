import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-bento-grid',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bento-grid.component.html',
  styleUrl: './bento-grid.component.css'
})
export class BentoGridComponent {}
