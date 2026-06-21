import { Component, input, ElementRef, AfterViewInit, inject, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { AnimationService } from '../../../core/services/animation.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="counter">
      <b #counterEl>0</b>
      <span>{{ label() }}</span>
    </div>
  `
})
export class CounterComponent implements AfterViewInit {
  readonly target = input.required<number>();
  readonly suffix = input<string>('+');
  readonly label = input.required<string>();

  private counterEl = viewChild.required<ElementRef>('counterEl');
  private animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    this.animationService.animateCounter(
      this.counterEl().nativeElement,
      this.target(),
      this.suffix()
    );
  }
}
