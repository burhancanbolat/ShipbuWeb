import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransportStaticPagesComponent } from './pages/transport-static-pages/transport-static-pages.component';
import { TransportOrderItemContainerTypesComponent } from './pages/transport-order-item-container-types/transport-order-item-container-types.component';
import { TransportOrderItemFeaturesComponent } from './pages/transport-order-item-features/transport-order-item-features.component';
import { AcademyComponent } from './pages/academy/academy.component';
import { TransportPaymentsComponent } from './pages/transport-payments/transport-payments.component';
import { TransportFeeManagementComponent } from './pages/transport-fee-management/transport-fee-management.component';
import { TransportOrdersComponent } from './pages/transport-orders/transport-orders.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'transportstaticpages',
        component: TransportStaticPagesComponent
      },
      {
        path: 'transportorderitemcontainertypes',
        component: TransportOrderItemContainerTypesComponent
      },
      {
        path: 'transportorderitemfeatures',
        component: TransportOrderItemFeaturesComponent
      },
      {
        path: 'academy',
        component: AcademyComponent
      },
      {
        path: 'transportorders',
        component: TransportOrdersComponent
      },
      {
        path: 'transportpayments',
        component: TransportPaymentsComponent
      },
      {
        path: 'transportfee',
        component: TransportFeeManagementComponent
      },
      {
        path: 'members',
        component: UsersComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
