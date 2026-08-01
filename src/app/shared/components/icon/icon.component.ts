import { Component, input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    :host svg {
      width: 100%;
      height: 100%;
    }
  `]
})
export class IconComponent {
  readonly name = input.required<string>();
  
  @HostBinding('attr.aria-hidden') ariaHidden = 'true';
}
