import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/profile/dashboard/dashboard.component';
import { StaticPageComponent } from './pages/static-page/static-page.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    ConfirmEmailComponent,
    ProfileComponent,
    DashboardComponent,
    StaticPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
