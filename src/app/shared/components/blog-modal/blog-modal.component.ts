import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Blog } from '../../../core/models/blog.model';

@Component({
  selector: 'app-blog-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (blog(); as b) {
      <div class="modal-bg open" (click)="onBackdrop($event)">
        <div class="modal glass blog-modal">
          <div class="modal-hero" [style.background]="b.image ? 'linear-gradient(to top, rgba(6,5,12,0.9) 0%, rgba(6,5,12,0.1) 80%), url(\\'' + b.image + '\\') center/cover no-repeat' : b.gradient">
            <button class="modal-close" (click)="close.emit()">✕</button>
            <div class="modal-hero-content">
              <span class="blog-badge-modal">{{ b.badge }}</span>
              <h2>{{ b.title }}</h2>
            </div>
          </div>
          <div class="modal-body blog-content" [innerHTML]="b.content">
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .blog-modal { max-width: clamp(340px, 90vw, 860px); }
    .modal-hero { display: flex; align-items: flex-end; padding: clamp(20px, 3vw, 40px); height: clamp(220px, 35vw, 400px); border-top-left-radius: var(--radius); border-top-right-radius: var(--radius); }
    .modal-hero-content { position: relative; z-index: 2; }
    .blog-badge-modal { display: inline-block; padding: 6px 14px; border-radius: 100px; background: rgba(0,0,0,.3); backdrop-filter: blur(4px); font-family: var(--mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; margin-bottom: 16px; border: 1px solid rgba(255,255,255,.1); }
    .modal-hero h2 { font-size: clamp(24px, 3vw, 42px); color: #fff; line-height: 1.2; text-shadow: 0 4px 12px rgba(0,0,0,.3); margin: 0; }
    .blog-content { padding: clamp(30px, 4vw, 50px) clamp(22px, 3vw, 50px); font-size: clamp(15px, 1.1vw, 18px); line-height: 1.8; color: var(--muted); }
    .blog-content p { margin-bottom: 24px; }
    .blog-content h3, .blog-content h4 { color: var(--text); font-family: var(--display); margin-top: 36px; margin-bottom: 16px; font-size: clamp(20px, 1.8vw, 26px); }
    .blog-content ul, .blog-content ol { padding-left: 20px; margin-bottom: 24px; }
    .blog-content li { margin-bottom: 12px; }
    .blog-content strong { color: var(--cyan); font-weight: 600; }
  `]
})
export class BlogModalComponent {
  readonly blog = input<Blog | null>(null);
  readonly close = output<void>();

  onBackdrop(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('modal-bg')) {
      this.close.emit();
    }
  }
}
