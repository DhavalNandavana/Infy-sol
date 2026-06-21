import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="modal-bg open" (click)="onBackdrop($event)">
        <div class="modal glass" style="max-width:760px;">
          <div class="modal-hero" style="height:400px; background:linear-gradient(135deg,var(--purple),var(--cyan)); display:flex; align-items:center; justify-content:center;">
            <button class="modal-close" (click)="close.emit()">✕</button>
            <p style="font-family:var(--mono); font-size:13px; letter-spacing:.1em; text-transform:uppercase;">Creative Process Reel — Coming Soon</p>
          </div>
        </div>
      </div>
    }
  `
})
export class VideoModalComponent {
  readonly isOpen = input(false);
  readonly close = output<void>();

  onBackdrop(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('modal-bg')) {
      this.close.emit();
    }
  }
}
