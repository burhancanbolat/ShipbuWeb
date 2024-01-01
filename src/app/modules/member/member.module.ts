import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { DxButtonModule, DxDrawerModule } from 'devextreme-angular';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MemberComponent,
    PlaceOrderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemberRoutingModule,
    DxDrawerModule,
    DxButtonModule,
  ]
})
export class MemberModule { }
