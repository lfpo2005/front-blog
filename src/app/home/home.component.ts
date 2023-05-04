import { PostModel } from "../shared/models/post.model";
import { BlogService } from "../shared/services/blog.service";
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map } from 'rxjs/operators';
import {ResponsePageable} from "../shared/models/responsePageable.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @Input() listPosts?: PostModel[];

  constructor(
    private service : BlogService,
    private route: ActivatedRoute,
  ) { }
  onTagClick(tag: string) {
    this.service.searchPostsByTag(tag).subscribe({
      next: (data) => {
        this.listPosts = data;
      },
      error: (e) => console.error(e),
    });
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(map((params: any) => params.tag))
      .subscribe(tag => {
        if (tag) {
          this.onTagClick(tag);
        } else {
          this.getAllPosts();
        }
      });
  }

  public getAllPosts() {
    this.service.getPosts().subscribe({
      next: (data: ResponsePageable) => {

        this.listPosts = data.content;
      },
      error: (e: any) => console.error(e),
    });
  }
}
