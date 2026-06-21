import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CLIENT_LOGOS } from '../../../core/constants/client-logo.data';

@Component({
  selector: 'app-client-marquee',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.css'
})
export class ClientMarqueeComponent {
  readonly logos = CLIENT_LOGOS;
}
