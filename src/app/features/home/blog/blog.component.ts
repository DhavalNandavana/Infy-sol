import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { BlogCardComponent } from '../../../shared/components/blog-card/blog-card.component';
import { BLOG_DATA } from '../../../core/constants/blog.data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RevealDirective, BlogCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  readonly blogs = BLOG_DATA;
}
