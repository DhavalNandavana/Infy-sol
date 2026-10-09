import { Component, signal, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!isRemoved()) {
      <div
        class="splash-screen"
        [class.fade-out]="isFadingOut()"
        role="status"
        aria-live="polite"
        aria-label="Loading Infynex Solutions"
      >
        <div class="splash-content">
          <div class="logo-wrapper">
            <div class="ambient-glow" aria-hidden="true"></div>
            <img
              src="assets/Loding Icon.png"
              alt="Infynex Solutions Emblem"
              class="splash-logo"
            />
          </div>

          <div class="brand-name">
            <span class="brand-infynex">Infynex</span>
            <span class="brand-solutions">Solutions</span>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit, OnDestroy {
  protected readonly isFadingOut = signal(false);
  protected readonly isRemoved = signal(false);

  private fadeOutTimer: ReturnType<typeof setTimeout> | null = null;
  private removeTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    // At 2.7s, initiate smooth exit transition (fade out + subtle scale)
    this.fadeOutTimer = setTimeout(() => {
      this.isFadingOut.set(true);
    }, 2700);

    // At 3.15s, cleanly remove the splash overlay from the DOM
    this.removeTimer = setTimeout(() => {
      this.isRemoved.set(true);
    }, 3150);
  }

  ngOnDestroy(): void {
    if (this.fadeOutTimer) clearTimeout(this.fadeOutTimer);
    if (this.removeTimer) clearTimeout(this.removeTimer);
  }
}
