import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LoadingPanelComponent } from 'src/app/shared/loading-panel/loading-panel.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    LoadingPanelComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
