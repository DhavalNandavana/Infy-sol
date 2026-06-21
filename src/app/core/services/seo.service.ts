import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /**
   * Updates the global page metadata, including title, standard meta tags,
   * Open Graph, and Twitter Card tags.
   */
  updateMetadata(config: PageMetadata): void {
    // Update Title
    this.titleService.setTitle(config.title);
    
    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    if (config.image) {
      this.metaService.updateTag({ property: 'og:image', content: config.image });
    }
    if (config.url) {
      this.metaService.updateTag({ property: 'og:url', content: config.url });
    }
    if (config.type) {
      this.metaService.updateTag({ property: 'og:type', content: config.type });
    }

    // Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    if (config.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: config.image });
    }
  }

  /**
   * Injects JSON-LD structured data into the document head safely.
   */
  setStructuredData(schemaData: any): void {
    const existingScript = document.head.querySelector('#json-ld-schema');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }
    
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
  }
}
