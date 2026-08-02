import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  activeModal = signal<'privacy' | 'terms' | null>(null);

  openModal(type: 'privacy' | 'terms') {
    this.activeModal.set(type);
  }

  closeModal() {
    this.activeModal.set(null);
  }

  onBackdropClick(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal-bg')) {
      this.closeModal();
    }
  }
}
