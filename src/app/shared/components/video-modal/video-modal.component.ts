import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="modal-backdrop-vid" (click)="onBackdrop($event)" (window:keydown.escape)="close.emit()">
        <div class="modal-video-container">
          <button class="modal-close-btn" (click)="close.emit()" aria-label="Close video">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="video-ratio-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/fclAh1VugdU?si=i6qTwmTXKf7qPg92&autoplay=1&rel=0" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop-vid {
      position: fixed;
      inset: 0;
      background: rgba(4, 3, 8, 0.95);
      backdrop-filter: blur(12px);
      z-index: 9999999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.4s var(--ease) forwards;
      padding: clamp(16px, 3vw, 40px);
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .modal-video-container {
      position: relative;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      animation: scaleUp 0.5s var(--ease) forwards;
    }
    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .video-ratio-wrapper {
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
      border-radius: clamp(12px, 1.5vw, 24px);
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.1);
      background: #000;
    }
    .video-ratio-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .modal-close-btn {
      position: absolute;
      top: -48px;
      right: 0;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fff;
      width: clamp(36px, 4vw, 44px);
      height: clamp(36px, 4vw, 44px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
    }
    .modal-close-btn:hover {
      background: rgba(13,204,250,0.3);
      border-color: var(--cyan);
      transform: scale(1.1);
    }
    .modal-close-btn svg {
      width: clamp(18px, 2vw, 22px);
      height: clamp(18px, 2vw, 22px);
    }
    @media (max-width: 768px) {
      .modal-video-container { width: 100%; }
      .modal-close-btn { top: -52px; }
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      .modal-video-container { width: 90%; }
    }
    @media (min-width: 1025px) {
      .modal-video-container { width: 85%; }
    }
  `]
})
export class VideoModalComponent {
  readonly isOpen = input(false);
  readonly close = output<void>();

  onBackdrop(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop-vid')) {
      this.close.emit();
    }
  }
}
