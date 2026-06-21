import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Service } from '../../../core/models/service.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-service-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './service-card.component.css',
  template: `
    <div class="s-card glass" (mousemove)="onMouseMove($event)" (mouseleave)="onMouseLeave($event)">
      <span class="s-num">{{ padIndex() }}</span>
      <div class="s-icon" [innerHTML]="safeIcon()"></div>
      <h3>{{ service().title }}</h3>
      <p>{{ service().description }}</p>
    </div>
  `
})
export class ServiceCardComponent {
  readonly service = input.required<Service>();
  readonly index = input.required<number>();

  constructor(private sanitizer: DomSanitizer) {}

  padIndex(): string {
    return String(this.index() + 1).padStart(2, '0');
  }

  safeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.service().icon);
  }

  onMouseMove(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  }

  onMouseLeave(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  }
}
