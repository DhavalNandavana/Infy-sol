import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FeaturedWorkComponent } from './featured-work/featured-work.component';
import { VideoShowcaseComponent } from './video-showcase/video-showcase.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogComponent } from './blog/blog.component';
import { BentoGridComponent } from './bento-grid/bento-grid.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ClientMarqueeComponent } from './marquee/marquee.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    PortfolioComponent,
    FeaturedWorkComponent,
    VideoShowcaseComponent,
    WhyChooseUsComponent,
    TestimonialsComponent,
    BlogComponent,
    BentoGridComponent,
    TimelineComponent,
    ClientMarqueeComponent,
    ContactComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-services />
    <app-portfolio />
    <app-featured-work />
    <app-video-showcase />
    <app-why-choose-us />
    <app-testimonials />
    <app-blog />
    <app-bento-grid />
    <app-timeline />
    <app-client-marquee />
    <app-contact />
  `
})
export class HomeComponent {}
