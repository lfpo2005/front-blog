import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import { HomeComponent } from "./home/home.component";
import {PoliticaPSComponent} from "./politica-ps/politica-ps.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'politica', component: PoliticaPSComponent},
  {path: 'postDetails', component: PostDetailsComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
