import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import { HomeComponent } from "./home/home.component";
import {PoliticaPSComponent} from "./politica-ps/politica-ps.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {LoginComponent} from "./login/login.component";
import {DictionaryComponent} from "./dictionary/dictionary.component";
import {PanelAdminComponent} from "./painel-admin/panel-admin.component";
import {CreatedUserComponent} from "./created-user/created-user.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'politica', component: PoliticaPSComponent},
  {path: 'postDetails/:postId', component: PostDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'createdUser', component: CreatedUserComponent},
  {path: 'dictionary', component: DictionaryComponent},
  {path: 'admin', component: PanelAdminComponent},
]

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
