import {Component, OnInit} from '@angular/core';
import {PostModel} from "./shared/models/post.model";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  listPosts: PostModel[] | null | undefined = null;
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
  onSearch(title: string | undefined) {
    if (this.isHomePage) {
      this.router.navigate(['/'], { queryParams: { title: title } });
    }
  }


}
