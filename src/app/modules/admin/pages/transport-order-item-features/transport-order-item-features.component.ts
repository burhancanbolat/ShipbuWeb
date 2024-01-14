import { Component } from '@angular/core';
import { TransportOrderItemFeaturesService } from 'src/app/services/transport-order-item-features.service';

@Component({
  selector: 'app-transport-order-item-features',
  templateUrl: './transport-order-item-features.component.html',
  styles: [
  ]
})
export class TransportOrderItemFeaturesComponent {
  constructor(
    protected readonly transportOrderItemFeaturesService: TransportOrderItemFeaturesService,
  ) {
    this.onReorder = this.onReorder.bind(this);
  }

  protected typesEditorOptions: any = {
    items: [
      { value: 0, text: 'Yok' },
      { value: 1, text: 'Görsel' },
      { value: 2, text: 'PDF' },
      { value: 3, text: 'Text' },
    ],
    valueExpr: 'value',
    displayExpr: 'text'
  }

  onInitNewRow(e: any) {
    e.data.enabled = true;
    e.data.fee = 0;
  }

  onRowInserting(e: any) {

  }

  onRowUpdating(e: any) {
    e.newData = { ...e.oldData, ...e.newData };
  }

  onReorder(e: any) {
    e.promise = this.processReorder(e);
  }

  async processReorder(e: any) {
    const visibleRows = e.component.getVisibleRows();
    const from = visibleRows[e.fromIndex].data.id;
    const to = visibleRows[e.toIndex].data.id;

    await this.transportOrderItemFeaturesService.reorder(from, to);
    await e.component.refresh();
  }
}
