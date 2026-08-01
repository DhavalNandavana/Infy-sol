import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioItem } from '../../../core/models/portfolio.model';
import { AutoScrollDirective } from '../../../shared/directives/auto-scroll.directive';

@Component({
  selector: 'app-portfolio-modal',
  standalone: true,
  imports: [AutoScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .images-slider { display: flex; height: 100%; width: 100%; overflow-x: auto; overflow-y: hidden; gap: 16px; padding: 20px; align-items: center; scrollbar-width: none; }
    .images-slider::-webkit-scrollbar { display: none; }
    .slider-img { height: 90%; max-width: 90%; object-fit: contain; flex-shrink: 0; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
  `],
  template: `
    @if (item(); as p) {
      <div class="modal-bg open" (click)="onBackdrop($event)">
        <div class="modal glass">
          <div class="modal-hero" [style.background]="p.image ? 'url(&quot;' + p.image + '&quot;) center/contain no-repeat, ' + p.gradient : p.gradient">
            @if (p.images && p.images.length > 0) {
              <div class="images-slider" appAutoScroll>
                @for (img of p.images; track img) {
                  <img [src]="img" class="slider-img" alt="">
                }
              </div>
            }
            <button class="modal-close" (click)="close.emit()">✕</button>
          </div>
          <div class="modal-body">
            <div class="modal-client">{{ p.client }}</div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
            <div class="modal-tags">
              @for (tag of p.tags; track tag) {
                <span>{{ tag }}</span>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class PortfolioModalComponent {
  readonly item = input<PortfolioItem | null>(null);
  readonly close = output<void>();

  onBackdrop(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('modal-bg')) {
      this.close.emit();
    }
  }
}
