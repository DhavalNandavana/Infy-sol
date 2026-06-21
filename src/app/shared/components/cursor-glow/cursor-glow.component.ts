import { Component, HostListener, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cursor-glow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div id="cursor-glow" [style.left.px]="x()" [style.top.px]="y()"></div>`
})
export class CursorGlowComponent {
  protected readonly x = signal(0);
  protected readonly y = signal(0);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.x.set(e.clientX);
    this.y.set(e.clientY);
  }
}
