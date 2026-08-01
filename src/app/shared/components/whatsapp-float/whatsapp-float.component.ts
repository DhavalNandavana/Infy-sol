import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="https://wa.me/918320233869" target="_blank" rel="noopener" class="whatsapp-float">
      <span class="wa-tip">Chat with us!</span>
      <app-icon name="whatsapp" style="color: white; width: 24px; height: 24px;" />
    </a>
  `
})
export class WhatsAppFloatComponent {}
