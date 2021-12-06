import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/general/home/home.component';
import { NotFoundComponent } from './public/general/not-found/not-found.component';

const routes: Routes = [
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/home"
  },
  {
    path:"security",
    loadChildren:()=>import("./moduls/security/security.module").then(x=>x.SecurityModule)
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
