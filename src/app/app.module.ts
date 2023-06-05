import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
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
import { AuthInterceptor } from "./shared/services/auth.interceptor";
import { CommonModule, DatePipe } from "@angular/common";
import { DictionaryEditorComponent } from "./dictionary-editor/dictionary-editor.component";
import { CreatedUserComponent } from "./created-user/created-user.component";
import { SimulatedComponent } from "./simulated/simulated.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { PageNotFoundComponent} from "./page-notFound/page-not-found.component";
import { CookieHandlerComponent } from "./cookie-handler/cookie-handler.component";
import { PolicyCookiesComponent } from "./policy-cookies/policy-cookies.component";
import { ShareButtonsComponent } from "./share-buttons/share-buttons.component";
import { NgxSummernoteModule } from 'ngx-summernote';
import { Angulartics2Module } from "angulartics2";
import { CookieService } from 'ngx-cookie-service';
import { AccordionComponentComponent } from "./accordion-component/accordion-component.component";
import { MessageContactComponent } from "./message-contact/message-contact.component";
import { ContactService } from "./shared/services/contact/contact.service";
import { PostListComponent} from "./post-list-component/post-list.component";
import { PostService } from "./shared/services/post/post.service";
import { Error500Component } from "./error500/error500.component";
import { ContactComponent } from "./contact/contact.component";

let domain = window.location.hostname.includes('localhost') ? 'localhost' : 'metodologia-agil.com.br';
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: domain,
    secure: true
  },
  position: 'bottom',
  theme: 'block',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
    },
    button: {
      background: '#f1d600',
    },
  },
  type: 'opt-in',
   revokable: true,
  content: {
    message: 'Este site usa cookies para garantir que você obtenha a melhor experiência em nosso site.',
    allow: 'Aceito',
    deny: 'Recusar',
    link: 'Saiba mais',
    href: '/cookies',
    policy: 'Cookie Policy'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    PostModalComponent,
    CookieHandlerComponent,
    NavComponent,
    ContactComponent,
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
    ShareButtonsComponent,
    PageNotFoundComponent,
    AccordionComponentComponent,
    PostListComponent,
    MessageContactComponent,
    Error500Component,
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
    CommonModule,
    NgxSummernoteModule,
    Angulartics2Module.forRoot(),
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    CookieService,
    JwtHelperService,
    DatePipe,
    AuthGuard,
    ContactService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
