import { PostModel } from "../shared/models/post.model";
import { BlogService } from "../shared/services/blog.service";
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @Input() listPosts?: PostModel[];

  constructor(private service : BlogService) { }
  onTagClick(tag: string) {
    this.service.searchPostsByTag(tag).subscribe({
      next: (data) => {
        this.listPosts = data;
      },
      error: (e) => console.error(e),
    });
  }
  ngOnInit(): void {
    this.getAllPosts();
    if (!this.listPosts) {
      this.getAllPosts();
    }
  }
  public getAllPosts() {
    this.service.getAllPosts().subscribe({
      next: (data) => {
        this.listPosts = data.content;
      },
      error: (e) => console.error(e),
    });
  }
}
