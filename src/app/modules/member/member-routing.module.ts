import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { AcademyComponent } from './pages/academy/academy.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { SupportComponent } from './pages/support/support.component';

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
        path : 'academy',
        component : AcademyComponent
      },
      {
        path : 'orders',
        component : OrdersComponent
      },
      {
        path : 'payments',
        component : PaymentsComponent
      },
      {
        path : 'support',
        component : SupportComponent
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
