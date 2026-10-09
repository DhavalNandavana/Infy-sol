import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

export interface BentoItem {
  id: string;
  gridClass: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  aspectRatio: string;
  tags: string[];
}

@Component({
  selector: 'app-bento-grid',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bento-grid.component.html',
  styleUrl: './bento-grid.component.css'
})
export class BentoGridComponent {
  readonly activeModalItem = signal<BentoItem | null>(null);

  readonly items: BentoItem[] = [
    {
      id: 'branding',
      gridClass: 'b1',
      badge: '01 / IDENTITY',
      title: 'Branding',
      description: 'Full identity systems built to scale across every touchpoint.',
      image: 'assets/Branding.jpeg',
      imageAlt: 'Luxury brand identity and bespoke packaging showcase',
      aspectRatio: '16:9 Format',
      tags: ['Identity Systems', 'Packaging', 'Guidelines']
    },
    {
      id: 'marketing',
      gridClass: 'b2',
      badge: '02 / PERFORMANCE',
      title: 'Marketing',
      description: 'Campaigns engineered for reach, engagement, and conversion.',
      image: 'assets/Marketing.jpeg',
      imageAlt: 'High-performance marketing analytics and social growth dashboard',
      aspectRatio: '16:9 Format',
      tags: ['Data Analytics', 'Growth', 'Campaigns']
    },
    {
      id: 'design',
      gridClass: 'b3',
      badge: '03 / UI & UX',
      title: 'Design',
      description: 'Pixel-perfect creative, sleek interfaces, every time.',
      image: 'assets/Design.jpeg',
      imageAlt: 'UI/UX product design workspace with Figma interfaces',
      aspectRatio: '4:3 Format',
      tags: ['UI/UX', 'Prototypes', 'Design System']
    },
    {
      id: 'seo',
      gridClass: 'b4',
      badge: '04 / VISIBILITY',
      title: 'SEO',
      description: 'Search dominance and compounding organic visibility.',
      image: 'assets/SEO.jpeg',
      imageAlt: 'Top search engine rankings and holographic organic traffic graph',
      aspectRatio: '4:3 Format',
      tags: ['Rank #1', 'Organic Search', 'Audits']
    },
    {
      id: 'strategy',
      gridClass: 'b5',
      badge: '05 / ROADMAP',
      title: 'Strategy',
      description: 'Research-backed direction before a single pixel is placed.',
      image: 'assets/Strategy.jpeg',
      imageAlt: 'Executive boardroom strategic roadmap and SWOT analysis',
      aspectRatio: '16:9 Format',
      tags: ['SWOT Roadmap', 'Market Fit', 'GTM']
    },
    {
      id: 'creativity',
      gridClass: 'b6',
      badge: '06 / CONCEPT',
      title: 'Creativity',
      description: 'Bold ideas, artistic flair, and carefully executed storytelling.',
      image: 'assets/Creativity.jpeg',
      imageAlt: 'Concept art illustration desk with Create Something Epic neon sign',
      aspectRatio: '4:3 Format',
      tags: ['Concept Art', 'Visual Story', 'Direction']
    }
  ];

  openModal(item: BentoItem): void {
    this.activeModalItem.set(item);
  }

  closeModal(): void {
    this.activeModalItem.set(null);
  }

  onBackdrop(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-bg')) {
      this.closeModal();
    }
  }
}
