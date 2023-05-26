import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PolicyPSComponent } from "./policy-privacy-security/policy-p-s.component";
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
import {PolicyCookiesComponent} from "./policy-cookies/policy-cookies.component";
import {AccordionComponentComponent} from "./accordion-component/accordion-component.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'policy', component: PolicyPSComponent },
  { path: 'cookies', component: PolicyCookiesComponent },
  { path: 'postDetails/:postId', component: PostDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createdUser', component: CreatedUserComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'release', component: AccordionComponentComponent },
  { path: 'admin', component: PanelAdminComponent },
/*
  { path: 'simulado', component: SimulatedComponent, canActivate: [AuthGuard] } // pausa login
*/
  { path: 'simulado', component: SimulatedComponent }, // remover apos configuração do google
  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },
  { path: 'heavy', loadChildren: () => import('./heavy/heavy.module').then(m => m.HeavyModule) },
  { path: 'lazy', loadChildren: () => import('./heavy/lazy.module').then(m => m.LazyModule) },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
