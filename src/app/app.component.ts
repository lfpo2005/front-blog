import {Component, OnInit} from '@angular/core';
import {PostModel} from "./shared/models/post.model";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {Meta} from "@angular/platform-browser";
import {Angulartics2GoogleTagManager} from "angulartics2";
import {NgcCookieConsentService, NgcStatusChangeEvent} from "ngx-cookieconsent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  listPosts: PostModel[] | null | undefined = null;
  isHomePage: boolean = true;
  alerts: any[] = [

  ];
  private MAINTENANCE_START_DATE = new Date(2023, 5 - 1, 21, 0, 0, 0, 0);
  private MAINTENANCE_END_DATE = new Date(2023, 5 - 1, 27, 0, 0, 0, 0);

  constructor(private router: Router,
              private metaService: Meta,
              private angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
              private ccService: NgcCookieConsentService
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
  isMaintenanceDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today >= this.MAINTENANCE_START_DATE && today <= this.MAINTENANCE_END_DATE;
  }
  ngOnInit() {
    if (this.isMaintenanceDay()) {
      this.alerts.push({
        type: 'warning',
        message: 'Aviso: Manutenção programada, agendada para o próximo sábado, dia '
          + this.formatDate(this.MAINTENANCE_END_DATE) + ', das 06:00 às 08:00. O sistema pode sofrer instabilidades no período.'
      });
    }
    this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        if (event.status === this.ccService.getStatus().deny) {
        } else if (event.status === this.ccService.getStatus().allow) {
        }
      });
  }


  close(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  onSearch(title: string | undefined) {
    this.router.navigate(['/'], { queryParams: { title: title } });
  }
  formatDate(date: Date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


}
