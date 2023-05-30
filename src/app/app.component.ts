import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from "./shared/models/post.model";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {Meta} from "@angular/platform-browser";
import {Angulartics2GoogleTagManager} from "angulartics2";
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent, NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from "ngx-cookieconsent";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  listPosts: PostModel[] | null | undefined = null;
  isHomePage: boolean = true;
  alerts: any[] = [

  ];
  private MAINTENANCE_START_DATE = new Date(2023, 7 - 1, 25, 0, 0, 0, 0);
  private MAINTENANCE_END_DATE = new Date(2023, 8 - 1, 1, 0, 0, 0, 0);

  constructor(private router: Router,
              private metaService: Meta,
              private angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
              private ccService: NgcCookieConsentService,
              private cookieService: NgcCookieConsentService
  ) {
    angulartics2GoogleTagManager.startTracking();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const navigationEndEvent = event as NavigationEnd;
        // this.isHomePage = navigationEndEvent.url === '/' || navigationEndEvent.url === '/home',
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
    if (this.ccService.getConfig()) {
      this.ccService.getConfig().content = this.ccService.getConfig().content || {};
    }
    this.popupOpenSubscription = this.cookieService.popupOpen$.subscribe(
      () => {
        // you can use this.cookieService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.cookieService.popupClose$.subscribe(
      () => {
        // you can use this.cookieService.getConfig() to do stuff...
      });

    this.initializingSubscription = this.cookieService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      });

    this.initializedSubscription = this.cookieService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.cookieService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize...
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    this.statusChangeSubscription = this.cookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.cookieService.revokeChoice$.subscribe(
      () => {
        // you can use this.cookieService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.cookieService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
      });

  }
  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
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
