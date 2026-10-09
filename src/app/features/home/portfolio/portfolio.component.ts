import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { PortfolioModalComponent } from '../../../shared/components/portfolio-modal/portfolio-modal.component';
import { PORTFOLIO_DATA } from '../../../core/constants/portfolio.data';
import { PortfolioItem } from '../../../core/models/portfolio.model';

interface CardStyle {
  transform: string;
  opacity: string;
  zIndex: string;
  filter: string;
  pointerEvents: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RevealDirective, PortfolioModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit, OnDestroy {
  readonly allItems = PORTFOLIO_DATA;
  readonly activeFilter = signal('all');
  readonly selectedItem = signal<PortfolioItem | null>(null);
  readonly activeIndex = signal(0);
  readonly isHovered = signal(false);

  readonly categories = [
    'all',
    'Branding',
    'Packaging',
    'Social Media',
    'Logo Design',
    'Marketing',
  ];

  readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allItems;
    return this.allItems.filter((item) => item.category === filter);
  });

  /** Pre-computed card styles — recalculated only when activeIndex or filteredItems change */
  readonly cardStyles = computed<CardStyle[]>(() => {
    const items = this.filteredItems();
    const total = items.length;
    const current = this.activeIndex();

    return items.map((_, index) => {
      let offset = index - current;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const absOffset = Math.abs(offset);

      if (absOffset > 3) {
        return {
          transform: 'translateX(0) scale(0.5) rotateZ(0deg)',
          opacity: '0',
          zIndex: '0',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        };
      }

      const shiftPercent = offset * 32;
      const scale = Math.max(0.55, 1 - absOffset * 0.15);
      const rotateZ = offset * -3;
      const translateY = absOffset * 8;
      const opacity = Math.max(0.15, 1 - absOffset * 0.3);
      const zIndex = 10 - absOffset;
      const blur = absOffset > 1 ? (absOffset - 1) * 2 : 0;

      return {
        transform: `translateX(${shiftPercent}%) translateY(${translateY}px) scale(${scale}) rotateZ(${rotateZ}deg)`,
        opacity: `${opacity}`,
        zIndex: `${zIndex}`,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        pointerEvents: absOffset <= 2 ? 'auto' : 'none',
      };
    });
  });

  private autoPlayInterval: any;
  private touchStartX = 0;
  private touchStartY = 0;
  private isSwiping = false;
  private readonly SWIPE_THRESHOLD = 50;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      if (!this.isHovered()) {
        this.next();
      }
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private resetAutoPlay(): void {
    this.startAutoPlay();
  }

  setFilter(category: string): void {
    this.activeFilter.set(category);
    this.activeIndex.set(0);
    this.resetAutoPlay();
  }

  next(): void {
    const items = this.filteredItems();
    if (items.length === 0) return;
    this.activeIndex.update((i) => (i + 1) % items.length);
  }

  prev(): void {
    const items = this.filteredItems();
    if (items.length === 0) return;
    this.activeIndex.update((i) => (i - 1 + items.length) % items.length);
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
    this.resetAutoPlay();
  }

  onCardClick(index: number): void {
    const current = this.activeIndex();
    if (index === current) {
      this.openModal(this.filteredItems()[index]);
    } else {
      this.goTo(index);
    }
  }

  openModal(item: PortfolioItem): void {
    this.selectedItem.set(item);
    this.stopAutoPlay();
  }

  closeModal(): void {
    this.selectedItem.set(null);
    this.resetAutoPlay();
  }

  onShowcaseHover(state: boolean): void {
    this.isHovered.set(state);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isSwiping = false;
  }

  onTouchMove(event: TouchEvent): void {
    const deltaX = event.touches[0].clientX - this.touchStartX;
    const deltaY = event.touches[0].clientY - this.touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      this.isSwiping = true;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isSwiping) return;
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(deltaX) > this.SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        this.next();
      } else {
        this.prev();
      }
      this.resetAutoPlay();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (this.selectedItem()) return;
    if (event.key === 'ArrowRight') {
      this.next();
      this.resetAutoPlay();
    }
    if (event.key === 'ArrowLeft') {
      this.prev();
      this.resetAutoPlay();
    }
  }

  /** Returns the first image for card thumbnail display */
  getCardImage(item: PortfolioItem): string | null {
    if (item.images && item.images.length > 0) return item.images[0];
    if (item.image) return item.image;
    return null;
  }
}
