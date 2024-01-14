import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from 'src/app/shared/panel/panel.component';
import { PageHeaderComponent } from 'src/app/shared/page-header/page-header.component';
import { SectionHeaderComponent } from 'src/app/shared/section-header/section-header.component';



@NgModule({
  declarations: [
    PanelComponent,
    PageHeaderComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    PanelComponent,
    PageHeaderComponent,
    SectionHeaderComponent,
  ]
})
export class SharedModule { }
