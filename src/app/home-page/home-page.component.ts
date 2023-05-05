import {Component, OnInit} from '@angular/core';
import {BlogService} from "../shared/services/blog.service";
import {ActivatedRoute} from "@angular/router";
import {ResponsePageable} from "../shared/models/responsePageable.model";
import { map } from 'rxjs/operators';


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
