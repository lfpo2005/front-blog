import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from './app.component';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { PostModalComponent } from './modalpost/modalpost.component';
import { HomeComponent } from './home/home.component';
import {NavComponent} from "./nav/nav.component";
import { AppRoutingModule } from "./app.routing.module";
import { FooterComponent } from "./footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {PoliticaPSComponent} from "./politica-ps/politica-ps.component";
import {PostDetailsComponent} from "./post-details/post-details.component";

@NgModule({
  declarations: [
    AppComponent,
    CarrosselComponent,
    PostModalComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    PostDetailsComponent,
    PoliticaPSComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbCarouselModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
