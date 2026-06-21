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

  ngOnInit(): void {
    this.scrollService.init();
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  navigate(id: string): void {
    this.closeMenu();
    this.scrollService.scrollTo(id);
  }
}
