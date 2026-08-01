import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { FEATURED_WORK_DATA } from '../../../core/constants/featured-work.data';
import { IconComponent } from '../../../shared/components/icon/icon.component';
@Component({
  selector: 'app-featured-work',
  standalone: true,
  imports: [RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './featured-work.component.html',
  styleUrl: './featured-work.component.css'
})
export class FeaturedWorkComponent implements OnInit, OnDestroy {
  readonly features = FEATURED_WORK_DATA;
  
  // Slider State (assuming single showcased project for the interval)
  activeSliderIndex = signal(0);
  isHovered = signal(false);
  private sliderInterval: any;

  // Modal State
  isModalOpen = signal(false);
  modalImages = signal<string[]>([]);
  modalIndex = signal(0);

  ngOnInit() {
    this.startSlider();
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  startSlider() {
    this.sliderInterval = setInterval(() => {
      if (!this.isHovered() && !this.isModalOpen()) {
        this.nextSlide();
      }
    }, 4000);
  }

  stopSlider() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  nextSlide() {
    const imagesCount = this.features[0].images?.length || 0;
    if (imagesCount > 0) {
      this.activeSliderIndex.update(i => (i + 1) % imagesCount);
    }
  }

  onGalleryHover(state: boolean) {
    this.isHovered.set(state);
  }

  openModal(images: string[] | undefined, index: number) {
    if (!images || images.length === 0) return;
    this.modalImages.set(images);
    this.modalIndex.set(index);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = '';
  }

  modalNext() {
    this.modalIndex.update(i => (i + 1) % this.modalImages().length);
  }

  modalPrev() {
    this.modalIndex.update(i => (i - 1 + this.modalImages().length) % this.modalImages().length);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isModalOpen()) return;
    if (event.key === 'Escape') this.closeModal();
    if (event.key === 'ArrowRight') this.modalNext();
    if (event.key === 'ArrowLeft') this.modalPrev();
  }
}
