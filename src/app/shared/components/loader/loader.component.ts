import { Component, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="loader" [class.hide]="hidden()">
      <div class="loader-mark"></div>
      <div class="loader-text">Infynex Solutions</div>
    </div>
  `
})
export class LoaderComponent implements OnInit {
  protected readonly hidden = signal(false);

  ngOnInit(): void {
    setTimeout(() => this.hidden.set(true), 1800);
  }
}
