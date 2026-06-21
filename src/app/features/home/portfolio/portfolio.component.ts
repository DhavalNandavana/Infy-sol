import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { PortfolioModalComponent } from '../../../shared/components/portfolio-modal/portfolio-modal.component';
import { PORTFOLIO_DATA } from '../../../core/constants/portfolio.data';
import { PortfolioItem } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RevealDirective, PortfolioModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  readonly allItems = PORTFOLIO_DATA;
  readonly activeFilter = signal('all');
  readonly selectedItem = signal<PortfolioItem | null>(null);

  readonly categories = ['all', 'Branding', 'Packaging', 'Social Media', 'Logo Design', 'Marketing'];

  readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allItems;
    return this.allItems.filter(item => item.category === filter);
  });

  setFilter(category: string): void {
    this.activeFilter.set(category);
  }

  openModal(item: PortfolioItem): void {
    this.selectedItem.set(item);
  }

  closeModal(): void {
    this.selectedItem.set(null);
  }

  getHeightClass(h: number): string {
    return h === 1 ? '260px' : h === 2 ? '340px' : '200px';
  }
}
