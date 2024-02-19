import { Component } from '@angular/core';
import { TransportStaticPagesService } from 'src/app/services/transport-static-pages.service';

import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-transport-static-pages',
  templateUrl: './transport-static-pages.component.html',
  styles: [
  ]
})
export class TransportStaticPagesComponent {
  constructor(
    protected readonly transportStaticPagesService: TransportStaticPagesService,
  ) { 
    this.onReorder = this.onReorder.bind(this);
  }

  onInitNewRow(e: any) {
    e.data.enabled = true;
  }
  
  onRowInserting(e:any){

  }

  onRowUpdating(e: any) {
    e.newData = { ...e.oldData, ...e.newData };
  }

  onReorder(e:any) {
    e.promise = this.processReorder(e);
  }

  async processReorder(e:any) {
    const visibleRows = e.component.getVisibleRows();
    const from = visibleRows[e.fromIndex].data.id;
    const to = visibleRows[e.toIndex].data.id;

    await this.transportStaticPagesService.reorder(from, to);
    await e.component.refresh();
  }
}
