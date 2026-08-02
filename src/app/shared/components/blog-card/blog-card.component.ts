import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Blog } from '../../../core/models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './blog-card.component.css',
  template: `
    <article class="blog-card glass">
      <div class="blog-thumb" [style.background]="blog().image ? 'url(\\'' + blog().image + '\\') center/cover no-repeat' : blog().gradient">
        <span class="blog-badge">{{ blog().badge }}</span>
      </div>
      <div class="blog-body">
        <h3>{{ blog().title }}</h3>
        @if (blog().excerpt) {
          <p class="blog-excerpt">{{ blog().excerpt }}</p>
        }
        <span class="blog-read" (click)="readMore.emit()" style="cursor: pointer;">Read Full Article
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </article>
  `
})
export class BlogCardComponent {
  readonly blog = input.required<Blog>();
  readonly readMore = output<void>();
}
