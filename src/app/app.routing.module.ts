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
import { PageNotFoundComponent } from "./page-notFound/page-not-found.component";
import { PolicyCookiesComponent } from "./policy-cookies/policy-cookies.component";
import { AccordionComponentComponent } from "./accordion-component/accordion-component.component";
import { PostEditorComponent } from "./post-editor/post-editor.component";
import { HomeComponent } from "./home/home.component";
import { Error500Component } from "./error500/error500.component";
import { CookieGuard } from "./shared/services/cookie/cookieGuard";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
 { path: '', redirectTo: '/home', pathMatch: 'full' },

  // { path: '', component: HomeComponent },
  //  { path: '', component: HomeComponent, canActivate: [CookieGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'policy', component: PolicyPSComponent },
  { path: 'cookies', component: PolicyCookiesComponent },
  { path: 'postDetails/:postId', component: PostDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createdUser', component: CreatedUserComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'release', component: AccordionComponentComponent },
  { path: 'post-editor', component: PostEditorComponent },
  { path: 'post-editor/:postId', component: PostEditorComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'admin', component: PanelAdminComponent },
  { path: 'simulado', component: SimulatedComponent, canActivate: [AuthGuard] },
  { path: 'heavy', loadChildren: () => import('./heavy/heavy.module').then(m => m.HeavyModule) },
  { path: 'lazy', loadChildren: () => import('./heavy/lazy.module').then(m => m.LazyModule) },
  { path: '500', component: Error500Component },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
