import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { VideoModalComponent } from '../../../shared/components/video-modal/video-modal.component';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [RevealDirective, VideoModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './video-showcase.component.html',
  styleUrl: './video-showcase.component.css'
})
export class VideoShowcaseComponent {
  readonly videoOpen = signal(false);

  openVideo(): void { this.videoOpen.set(true); }
  closeVideo(): void { this.videoOpen.set(false); }
}
