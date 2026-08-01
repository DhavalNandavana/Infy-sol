import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { BlogCardComponent } from '../../../shared/components/blog-card/blog-card.component';
import { BlogModalComponent } from '../../../shared/components/blog-modal/blog-modal.component';
import { BLOG_DATA } from '../../../core/constants/blog.data';
import { Blog } from '../../../core/models/blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RevealDirective, BlogCardComponent, BlogModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  readonly blogs = BLOG_DATA;
  selectedBlog = signal<Blog | null>(null);

  openBlog(blog: Blog) {
    this.selectedBlog.set(blog);
    document.body.style.overflow = 'hidden';
  }

  closeBlog() {
    this.selectedBlog.set(null);
    document.body.style.overflow = '';
  }
}
