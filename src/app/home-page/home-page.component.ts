import { Component, OnInit } from '@angular/core';
import { BaseService } from "../shared/services/base.service";
import { ActivatedRoute } from "@angular/router";
import { ResponsePageable } from "../shared/models/responsePageable.model";
import { map } from 'rxjs/operators';
import { Title } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  listPosts: any;
  showClock: boolean = true;
  constructor(
    private service : BaseService,
    private route: ActivatedRoute,
    private titleService: Title,
    private cookieService: CookieService
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
  public getPostsByTitle(title: string) {
    this.service.getPostsByTitle(title).subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
      },
      error: (e: any) => console.error(e),
    });
  }
  public getAllPosts() {
    this.service.getAllPosts().subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
      },
      error: (e: any) => console.error(e),
    });
  }


}
