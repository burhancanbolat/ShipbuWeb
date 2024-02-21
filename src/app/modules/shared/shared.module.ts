import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from 'src/app/modules/shared/page-header/page-header.component';
import { SectionHeaderComponent } from 'src/app/modules/shared/section-header/section-header.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { PanelComponent } from './panel/panel.component';
import { StatusViewComponent } from './status-view/status-view.component';



@NgModule({
  declarations: [
    LoadingPanelComponent,
    PanelComponent,
    PageHeaderComponent,
    SectionHeaderComponent,
    TabViewComponent,
    StatusViewComponent,
  ],
  imports: [
    CommonModule
  ],
  exports : [
    LoadingPanelComponent,
    PanelComponent,
    PageHeaderComponent,
    SectionHeaderComponent,
    TabViewComponent,
    StatusViewComponent,
  ]
})
export class SharedModule { }
