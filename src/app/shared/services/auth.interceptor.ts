// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   constructor(private authService: AuthService, private router: Router) {}
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           this.authService.logout();
//           this.router.navigate(['/login']);
//         }
//
//         return throwError(error);
//       })
//     );
//   }
// }

import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(true); // Assume que o usuário está sempre autenticado
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Add this line
  private returnUrl = new BehaviorSubject<string | null>(null);

  constructor() { }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return true; // Sempre retorna true
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(true); // Mesmo após o logout, considera que o usuário está autenticado
  }

  setReturnUrl(url: string | null) {
    this.returnUrl.next(url);
  }

  getReturnUrl(): string | null {
    return this.returnUrl.getValue();
  }
}
