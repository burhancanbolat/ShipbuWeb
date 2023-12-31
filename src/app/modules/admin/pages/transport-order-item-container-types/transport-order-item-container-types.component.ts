import { Component } from '@angular/core';
import { TransportOrderItemContainerTypesService } from 'src/app/services/transport-order-item-container-types.service';

@Component({
  selector: 'app-transport-order-item-container-types',
  templateUrl: './transport-order-item-container-types.component.html',
  styles: [
  ]
})
export class TransportOrderItemContainerTypesComponent {

  constructor(
    protected readonly transportOrderItemContainerTypesService: TransportOrderItemContainerTypesService,
  ) { 
    this.onReorder = this.onReorder.bind(this);
  }


  onInitNewRow(e: any) {
    e.data.enabled = true;
  }

  onRowInserting(e: any) {

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

    await this.transportOrderItemContainerTypesService.reorder(from, to);
    await e.component.refresh();
  }
}
