import { Component, AfterViewInit, OnDestroy, ElementRef, viewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { AnimationService } from '../../../core/services/animation.service';
import { MagneticDirective } from '../../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(AnimationService);
  private heroSection = viewChild<ElementRef>('heroSection');
  private canvasRef = viewChild<ElementRef>('particlesCanvas');

  private animFrame = 0;

  ngAfterViewInit(): void {
    const section = this.heroSection()?.nativeElement;
    if (section) {
      this.animationService.heroEntrance(section);
    }
    this.initParticles();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrame);
  }

  private initParticles(): void {
    const canvas = this.canvasRef()?.nativeElement as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; r: number; dx: number; dy: number; o: number }[] = [];
    const count = Math.min(60, Math.floor(canvas.width / 18));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.5 + 0.15
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,204,250,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }
}
