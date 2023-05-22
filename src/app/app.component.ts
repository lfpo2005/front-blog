import {Component, OnInit} from '@angular/core';
import {PostModel} from "./shared/models/post.model";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {Meta} from "@angular/platform-browser";
import {Angulartics2GoogleTagManager} from "angulartics2";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  listPosts: PostModel[] | null | undefined = null;
  isHomePage: boolean = true;

  constructor(private router: Router,
              private metaService: Meta,
              private angulartics2GoogleTagManager: Angulartics2GoogleTagManager
              ) {
    angulartics2GoogleTagManager.startTracking();
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
    this.router.navigate(['/'], { queryParams: { title: title } });
  }
  getNextSaturdayDate() {
    const today = new Date();
    const lastSaturday = this.getLastSaturday({date: today});
    const nextSaturday = new Date(lastSaturday.setDate(lastSaturday.getDate() + 7)); // Add 7 days to get next Saturday
    return nextSaturday;
  }

  isMaintenanceDay() {
    const today = new Date();
    const lastSaturday = this.getLastSaturday({date: today});
    const previousMonday = new Date(lastSaturday.setDate(lastSaturday.getDate() - 5)); // Subtract 5 days from Saturday to get Monday
    return today.getFullYear() === previousMonday.getFullYear() &&
      today.getMonth() === previousMonday.getMonth() &&
      today.getDate() === previousMonday.getDate();
  }

  getLastSaturday({date}: { date: any }) {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Last day of current month
    let day = lastDayOfMonth.getDay();
    while (day !== 6) { // Loop backwards until we find a Saturday
      lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);
      day = lastDayOfMonth.getDay();
    }
    return lastDayOfMonth;
  }

}
