import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { DxButtonModule, DxDataGridModule, DxDrawerModule, DxFileUploaderModule, DxFormModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxSwitchModule, DxTabsModule, DxTextAreaModule, DxTileViewModule, DxToolbarModule } from 'devextreme-angular';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { SharedModule } from '../shared/shared.module';
import { AcademyComponent } from './pages/academy/academy.component';


@NgModule({
  declarations: [
    MemberComponent,
    PlaceOrderComponent,
    AcademyComponent,
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
    DxTabsModule,
    DxTileViewModule,
    DxTextAreaModule,
    DxSelectBoxModule,
  ]
})
export class MemberModule { }
