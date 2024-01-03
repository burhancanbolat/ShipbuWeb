import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { DashboardComponent } from './pages/profile/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StaticPageComponent } from './pages/static-page/static-page.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
      pathMatch: 'full'
    },
    {
      path: 'register',
      component: RegisterComponent,
      pathMatch: 'full'
    },
    {
      path: 'confirmemail/:userName',
      component: ConfirmEmailComponent,
      pathMatch: 'full'
    },
    {
      path: 'signin/:returnUrl',
      component: SignInComponent,
      pathMatch: 'full'
    },
    {
      path: 'signin',
      component: SignInComponent,
    },
    {
      path: 'page/:name',
      component: StaticPageComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
      children: [
        {
          path: '**',
          component: DashboardComponent
        }
      ]
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch:'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
