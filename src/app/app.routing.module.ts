import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PoliticaPSComponent } from "./politica-ps/politica-ps.component";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { LoginComponent } from "./login/login.component";
import { DictionaryComponent } from "./dictionary/dictionary.component";
import { PanelAdminComponent } from "./painel-admin/panel-admin.component";
import { CreatedUserComponent } from "./created-user/created-user.component";
import { SimulatedComponent } from "./simulated/simulated.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { HomePageComponent } from "./home-page/home-page.component";
import { Error500Component } from "./error500/error500.component";
import { Error404Component } from "./error404/error404.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'politica', component: PoliticaPSComponent },
  { path: 'postDetails/:postId', component: PostDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createdUser', component: CreatedUserComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'admin', component: PanelAdminComponent },
  { path: 'simulado', component: SimulatedComponent, canActivate: [AuthGuard] },
  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },
  { path: '**', redirectTo: '404' },
  { path: 'heavy', loadChildren: () => import('./heavy/heavy.module').then(m => m.HeavyModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
