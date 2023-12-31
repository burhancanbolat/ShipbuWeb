import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DxButtonModule, DxDataGridModule, DxDrawerModule, DxHtmlEditorModule, DxMenuModule, DxSelectBoxModule } from 'devextreme-angular';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransportStaticPagesComponent } from './pages/transport-static-pages/transport-static-pages.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PanelComponent } from './components/panel/panel.component';
import { HttpClientModule } from '@angular/common/http';
import { TransportOrderItemContainerTypesComponent } from './pages/transport-order-item-container-types/transport-order-item-container-types.component';
import { TransportOrderItemFeaturesComponent } from './pages/transport-order-item-features/transport-order-item-features.component';
import { InfoCardComponent } from './components/info-card/info-card.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TransportStaticPagesComponent,
    PageHeaderComponent,
    PanelComponent,
    TransportOrderItemContainerTypesComponent,
    TransportOrderItemFeaturesComponent,
    InfoCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    DxDrawerModule,
    DxButtonModule,
    DxMenuModule,
    DxDataGridModule,
    DxHtmlEditorModule,
    DxSelectBoxModule
  ]
})
export class AdminModule { }
