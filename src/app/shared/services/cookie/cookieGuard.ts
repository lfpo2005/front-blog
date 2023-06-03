import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CookieAcceptanceService} from "./cookieAccepted";

@Injectable({
  providedIn: 'root'
})
export class CookieGuard implements CanActivate {
  constructor(private cookieAcceptanceService: CookieAcceptanceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.cookieAcceptanceService.acceptedCookies) {
      this.router.navigate(['/cookies']);
      return false;
    }
    return true;
  }
}

