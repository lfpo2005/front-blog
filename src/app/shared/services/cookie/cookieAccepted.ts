import { Injectable } from '@angular/core';
import {NgcCookieConsentService, NgcStatusChangeEvent} from 'ngx-cookieconsent';

@Injectable({
  providedIn: 'root'
})
export class CookieAcceptanceService {
  private hasAcceptedCookies = false;

  constructor(private ccService: NgcCookieConsentService) {
    this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        this.hasAcceptedCookies = event.status === this.ccService.getStatus().allow;
      });
  }

  get acceptedCookies(): boolean {
    return this.hasAcceptedCookies;
  }
}
