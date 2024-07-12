import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {AuthGuard } from './services/guards/auth.guard'
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'Main',
    canActivate: [AuthGuard],
   /*  component: MainComponent, */
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
