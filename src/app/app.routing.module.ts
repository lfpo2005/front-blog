import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import { HomeComponent } from "./home/home.component";
import {PoliticaPSComponent} from "./politica-ps/politica-ps.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'politica', component: PoliticaPSComponent}
]

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
