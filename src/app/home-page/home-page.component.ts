import {Component, OnInit} from '@angular/core';
import {BlogService} from "../shared/services/blog.service";
import {ActivatedRoute} from "@angular/router";
import {ResponsePageable} from "../shared/models/responsePageable.model";
import { map } from 'rxjs/operators';
import {PostModel} from "../shared/models/post.model";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  listPosts: any;
  showClock: boolean = true;
  constructor(
    private service : BlogService,
    private route: ActivatedRoute,
    private titleService: Title,
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
    this.titleService.setTitle('Blog Agil - Home');
    this.route.queryParams
      .pipe(map((params: any) => params.title))
      .subscribe(title => {
        if (title) {
          this.getPostsByTitle(title);
        } else {
          this.getAllPosts();
        }
      });
  }

  public onSearchResultsChanged(searchResults: PostModel[]) {
    this.listPosts = searchResults;
  }
  public getPostsByTitle(title: string) {
    this.service.getPosts(title).subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
      },
      error: (e: any) => console.error(e),
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
