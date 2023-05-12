import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';

declare let gtag: Function;

@Component({
  selector: 'app-cookie-handler',
  template: '<div></div>' // Este componente não precisa de um template visual
})
export class CookieHandlerComponent implements OnInit {

  constructor(
    private ccService: NgcCookieConsentService,
    private cookieService: CookieService,
  ) {
    this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        if (event.status === this.ccService.getStatus().deny) {
          this.cookieService.deleteAll();
        } else if (event.status === this.ccService.getStatus().allow) {
          gtag('js', new Date());
          gtag('config', 'YOUR_TRACKING_ID');
        }
      });
  }

  ngOnInit(): void {
  }
}
