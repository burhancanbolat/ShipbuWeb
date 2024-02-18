import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { TransportOrdersService } from 'src/app/services/transport-orders.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent {

  constructor(
    protected readonly transportOrdersService: TransportOrdersService,
    protected readonly utilityService: UtilityService,
  ) { }

  @ViewChild('mainGrid')
  mainGrid!: DxDataGridComponent;


  protected statuses = [
    { value: 0, name: 'Teklif Verildi' },
    { value: 1, name: 'Ödeme Bekleniyor' },
    { value: 2, name: 'Ödeme Yapıldı' },
    { value: 3, name: 'Çıkış Yapıldı' },
    { value: 4, name: 'Teslim Edildi' },
  ];

  protected status1PopupVisible: boolean = false;
  protected status1FormData: any = { newPrice: 0.0 };

  async updateorderprice() {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.updateorderprice(this.status1FormData.id, this.status1FormData.newPrice);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }

  async paymentorder(id:any) {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.paymentorder(id);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }
  
  async shiporder(id:any) {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.shiporder(id);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }
  async deliveredorder(id:any) {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.deliveredorder(id);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }
}
