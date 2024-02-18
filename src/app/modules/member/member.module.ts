import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { DxButtonModule, DxDataGridModule, DxDrawerModule, DxFileUploaderModule, DxFormModule, DxLookupModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxSwitchModule, DxTextAreaModule, DxTileViewModule, DxToolbarModule } from 'devextreme-angular';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { SharedModule } from '../shared/shared.module';
import { AcademyComponent } from './pages/academy/academy.component';
import { OrdersComponent } from './pages/orders/orders.component';


@NgModule({
  declarations: [
    MemberComponent,
    PlaceOrderComponent,
    AcademyComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemberRoutingModule,
    DxDrawerModule,
    DxButtonModule,
    DxFormModule,
    DxSwitchModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxTileViewModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxLookupModule
  ]
})
export class MemberModule { }
