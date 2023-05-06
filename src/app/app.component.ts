import {Component, OnInit} from '@angular/core';
import {PostModel} from "./shared/models/post.model";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {Meta} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  listPosts: PostModel[] | null | undefined = null;
  isHomePage: boolean = true;

  constructor(private router: Router,
              private metaService: Meta) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const navigationEndEvent = event as NavigationEnd;
        this.isHomePage = navigationEndEvent.url === '/' || navigationEndEvent.url === '/home',
        this.metaService.addTag({
          name: 'description',
          content: 'Aprenda sobre as melhores metodologias ágeis utilizadas na indústria de tecnologia e desenvolvimento de software. Nossos artigos e tutoriais detalhados irão ajudá-lo a entender os princípios, práticas e ferramentas por trás do desenvolvimento ágil.'
        });
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
