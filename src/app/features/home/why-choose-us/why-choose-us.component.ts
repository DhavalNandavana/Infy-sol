import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { WHY_CHOOSE_DATA } from '../../../core/constants/why-choose.data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WhyChooseItem } from '../../../core/models/why-choose.model';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.css'
})
export class WhyChooseUsComponent {
  readonly items = WHY_CHOOSE_DATA;

  constructor(private sanitizer: DomSanitizer) {}

  safeIcon(item: WhyChooseItem): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(item.icon);
  }
}
