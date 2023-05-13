import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { PostModalComponent } from './modalpost/modalpost.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from "./nav/nav.component";
import { AppRoutingModule } from "./app.routing.module";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PolicyPSComponent } from "./policy-privacy-security/policy-p-s.component";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { LoginComponent } from "./login/login.component";
import { DictionaryComponent } from "./dictionary/dictionary.component";
import { PanelAdminComponent } from "./painel-admin/panel-admin.component";
import { JwtHelperService } from "@auth0/angular-jwt";
import { PostEditorComponent } from "./post-editor/post-editor.component";
import { NgxSummernoteModule } from 'ngx-summernote';
import { AuthInterceptor } from "./shared/services/auth.interceptor";
import { CommonModule, DatePipe } from "@angular/common";
import { DictionaryEditorComponent } from "./dictionary-editor/dictionary-editor.component";
import { CreatedUserComponent } from "./created-user/created-user.component";
import { SimulatedComponent } from "./simulated/simulated.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { HomePageComponent } from "./home-page/home-page.component";
import { Error404Component } from "./error404/error404.component";
import { Error500Component } from "./error500/error500.component";
import { ErrorInterceptor } from "./shared/services/erro.inteceptor";
import {CookieHandlerComponent} from "./cookie-handler/cookie-handler.component";
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import {PolicyCookiesComponent} from "./policy-cookies/policy-cookies.component";


const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'https://metodologia-agil.com.br/'
  },
  position: 'bottom',
  theme: 'classic',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
    },
    button: {
      background: '#f1d600',
    },
  },
  type: 'info',
  content: {
    message: 'Este site usa cookies para garantir que você obtenha a melhor experiência em nosso site.',
    dismiss: 'Entendi',
    deny: 'Recusar',
    link: 'Saiba mais',
    href: 'cookies',
    policy: 'Cookie Policy'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    PostModalComponent,
    HomePageComponent,
    NavComponent,
    FooterComponent,
    PostDetailsComponent,
    PolicyPSComponent,
    LoginComponent,
    DictionaryComponent,
    PanelAdminComponent,
    PostEditorComponent,
    DictionaryEditorComponent,
    CreatedUserComponent,
    SimulatedComponent,
    HomeComponent,
    Error404Component,
    Error500Component,
    CookieHandlerComponent,
    PolicyCookiesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    CommonModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    JwtHelperService,
    DatePipe,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
