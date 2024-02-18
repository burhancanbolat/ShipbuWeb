import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxDrawerModule, DxFormModule, DxHtmlEditorModule, DxMenuModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransportStaticPagesComponent } from './pages/transport-static-pages/transport-static-pages.component';
import { TransportOrderItemContainerTypesComponent } from './pages/transport-order-item-container-types/transport-order-item-container-types.component';
import { TransportOrderItemFeaturesComponent } from './pages/transport-order-item-features/transport-order-item-features.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { SharedModule } from '../shared/shared.module';
import { AcademyComponent } from './pages/academy/academy.component';
import { OrdersComponent } from './pages/orders/orders.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TransportStaticPagesComponent,
    TransportOrderItemContainerTypesComponent,
    TransportOrderItemFeaturesComponent,
    InfoCardComponent,
    AcademyComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    DxDrawerModule,
    DxButtonModule,
    DxMenuModule,
    DxDataGridModule,
    DxHtmlEditorModule,
    DxSelectBoxModule,
    DxChartModule,
    DxTextBoxModule,
    DxPopupModule,
    DxFormModule
  ]
})
export class AdminModule { }
