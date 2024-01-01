import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children : [
      {
        path : 'placeorder',
        component : PlaceOrderComponent
      },
      {
        path : '**',
        redirectTo : 'placeorder',
        pathMatch : 'full'
      },
      
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
