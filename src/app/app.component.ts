import { Component, OnInit } from '@angular/core';
import { PostModel } from "./shared/models/post.model";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from 'rxjs/operators';
import { Meta } from "@angular/platform-browser";
import { Angulartics2GoogleTagManager } from "angulartics2";
import { NgcCookieConsentService } from "ngx-cookieconsent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  listPosts: PostModel[] | null | undefined = null;
  alerts: any[] = [

  ];
  private MAINTENANCE_START_DATE = new Date(2023, 6 - 1, 17, 0, 0, 0, 0);
  private MAINTENANCE_END_DATE = new Date(2023, 6 - 1, 18, 9, 0, 0, 0);

  constructor(private router: Router,
              private metaService: Meta,
              private angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
              private ccService: NgcCookieConsentService,
  ) {
    angulartics2GoogleTagManager.startTracking();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const navigationEndEvent = event as NavigationEnd;
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
          + this.formatDate(this.MAINTENANCE_END_DATE) + ', das 07:00 às 09:00. O sistema pode sofrer instabilidades no período.'
      });
    }
    if (this.ccService.getConfig()) {
      this.ccService.getConfig().content = this.ccService.getConfig().content || {};
    }
  }
  onCookieAccept() {
    this.router.navigate(['/home']);
  }

  onCookieLearnMore() {
    this.router.navigate(['/cookies']);
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
