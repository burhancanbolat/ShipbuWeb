import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from 'src/app/shared/panel/panel.component';
import { PageHeaderComponent } from 'src/app/shared/page-header/page-header.component';



@NgModule({
  declarations: [
    PanelComponent,
    PageHeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports : [
    PanelComponent,
    PageHeaderComponent,
  ]
})
export class SharedModule { }
