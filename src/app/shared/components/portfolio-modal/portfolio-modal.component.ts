import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioItem } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-portfolio-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (item(); as p) {
      <div class="modal-bg open" (click)="onBackdrop($event)">
        <div class="modal glass">
          <div class="modal-hero" [style.background]="p.gradient">
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
