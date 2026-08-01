import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoScroll]',
  standalone: true
})
export class AutoScrollDirective implements OnInit, OnDestroy {
  private animationFrameId: number | null = null;
  private isHovered = false;

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {
    this.el.nativeElement.addEventListener('mouseenter', () => this.isHovered = true);
    this.el.nativeElement.addEventListener('mouseleave', () => this.isHovered = false);
    // Also pause on touch so mobile users can scroll manually easily
    this.el.nativeElement.addEventListener('touchstart', () => this.isHovered = true);
    this.el.nativeElement.addEventListener('touchend', () => this.isHovered = false);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.scroll();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private scroll = () => {
    if (!this.isHovered) {
      const element = this.el.nativeElement;
      element.scrollLeft += 1;
      
      // If reached the end, reset to start (or loop)
      // A small buffer (like 1) prevents it from getting stuck exactly at the end due to subpixel rendering
      if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 1) {
        // Simple loop by jumping to the start. 
        // For a true seamless loop, items need to be duplicated. Here we just reset.
        element.scrollLeft = 0;
      }
    }
    this.animationFrameId = requestAnimationFrame(this.scroll);
  };
}
