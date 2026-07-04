import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './video-showcase.component.html',
  styleUrl: './video-showcase.component.css'
})
export class VideoShowcaseComponent {}
