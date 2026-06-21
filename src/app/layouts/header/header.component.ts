import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private scrollService = inject(ScrollService);
  protected readonly menuOpen = signal(false);
  protected readonly isScrolled = this.scrollService.isScrolled;
  protected readonly activeSection = signal('home');

  ngOnInit(): void {
    this.scrollService.init();
    setTimeout(() => this.setupObserver(), 100);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  navigate(id: string): void {
    this.closeMenu();
    this.activeSection.set(id);
    this.scrollService.scrollTo(id);
  }

  private setupObserver(): void {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
  }
}
