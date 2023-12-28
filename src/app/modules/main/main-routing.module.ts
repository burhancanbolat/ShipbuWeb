import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { DashboardComponent } from './pages/profile/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'confirmemail/:userName',
      component: ConfirmEmailComponent
    },
    {
      path: 'signin',
      component: SignInComponent
    },
    {
      path: 'profile',
      component: ProfileComponent,
      children: [
        {
          path : '**',
          component : DashboardComponent
        }
      ]
    },
    
    {
      path: '',
      component: HomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
