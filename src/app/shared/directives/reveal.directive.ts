import { Directive, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { AnimationService } from '../../core/services/animation.service';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    this.animationService.revealElement(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // ScrollTrigger cleanup handled by AnimationService.cleanup()
  }
}
