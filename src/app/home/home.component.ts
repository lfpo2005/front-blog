import { Component, OnInit } from '@angular/core';
import { BaseService } from "../shared/services/base.service";
import { ActivatedRoute } from "@angular/router";
import { ResponsePageable } from "../shared/models/responsePageable.model";
import { map } from 'rxjs/operators';
import { Title } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";
import {PostService} from "../shared/services/post/post.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
 listPosts: any;
  showClock: boolean = true;
  constructor(
    private postService : PostService,
    private route: ActivatedRoute,
    private titleService: Title,
    private cookieService: CookieService
  ) { }
  onTagClick(tag: string) {
    this.postService.searchPostsByTag(tag).subscribe({
      next: (data) => {
        this.listPosts = data;
      },
      error: (e) => console.error(e),
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Agile Domain - Home');
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
  public getPostsByTitle(title: string) {
    this.postService.getPostsByTitle(title).subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
      },
      error: (e: any) => console.error(e),
    });
  }
  public getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
      },
      error: (e: any) => console.error(e),
    });
  }
}
