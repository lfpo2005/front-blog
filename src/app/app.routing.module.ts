import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import { HomeComponent } from "./home/home.component";
import {PoliticaPSComponent} from "./politica-ps/politica-ps.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {LoginComponent} from "./login/login.component";
import {DictionaryComponent} from "./dictionary/dictionary.component";
import {PanelAdminComponent} from "./painel-admin/panel-admin.component";
import {CreatedUserComponent} from "./created-user/created-user.component";
import {SimulatedComponent} from "./simulated/simulated.component";
import { AuthGuard } from './shared/guards/auth.guard';
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'politica', component: PoliticaPSComponent },
  { path: 'postDetails/:postId', component: PostDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createdUser', component: CreatedUserComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'admin', component: PanelAdminComponent },
  { path: 'simulado', component: SimulatedComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
