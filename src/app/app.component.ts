import {Component, OnInit} from '@angular/core';
import {PostModel} from "./shared/models/post.model";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  listPosts: PostModel[] | null = null;
  isHomePage: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const navigationEndEvent = event as NavigationEnd;
        this.isHomePage = navigationEndEvent.url === '/' || navigationEndEvent.url === '/home';
      });
  }

  ngOnInit(): void {
  }
  onSearchResultsChanged(searchResults: PostModel[]) {
    this.listPosts = searchResults;
  }


}
