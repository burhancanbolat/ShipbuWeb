import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardAdmin, authGuardMember } from './guard';

const routes: Routes = [
  {
    path: 'member', 
    loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule),
    canActivate: [authGuardMember]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuardAdmin]
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
