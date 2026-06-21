import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CursorGlowComponent } from './shared/components/cursor-glow/cursor-glow.component';
import { WhatsAppFloatComponent } from './shared/components/whatsapp-float/whatsapp-float.component';
import { AnimationService } from './core/services/animation.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    CursorGlowComponent,
    WhatsAppFloatComponent
  ],
  template: `
    <app-loader />
    <app-cursor-glow />
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-whatsapp-float />
  `,
  styles: [`
    main { position: relative; z-index: 1; }
  `]
})
export class App implements OnInit, OnDestroy {
  private animationService = inject(AnimationService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.animationService.initScrollTrigger();
    
    // Inject Graphic Design Agency JSON-LD Structured Data
    this.seoService.setStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': 'https://infynexsolutions.com/#organization',
          'name': 'Infynex Solutions',
          'url': 'https://infynexsolutions.com/',
          'logo': 'https://infynexsolutions.com/assets/logo.png',
          'image': 'https://infynexsolutions.com/assets/og-image.jpg',
          'description': 'Infynex Solutions is a premium creative agency specializing in branding, packaging, logo design, social media marketing, and SEO-driven digital growth.',
          'telephone': '+91-9824253581',
          'priceRange': '$$',
          'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'IN'
          }
        },
        {
          '@type': 'WebSite',
          '@id': 'https://infynexsolutions.com/#website',
          'url': 'https://infynexsolutions.com/',
          'name': 'Infynex Solutions',
          'description': 'Creative Graphic Design & Branding Agency',
          'publisher': {
            '@id': 'https://infynexsolutions.com/#organization'
          }
        }
      ]
    });
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
