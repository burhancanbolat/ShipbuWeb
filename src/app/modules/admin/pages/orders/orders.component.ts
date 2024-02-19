import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';
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

  protected status3PopupVisible: boolean = false;
  protected status3FormData: any = {};

  protected actions: any[] = [
    { id: 0, name: 'Güncelle', icon: 'bi bi-pencil' },
    { id: 1, name: 'Ödeme Geldi', icon: 'bi bi-check' },
    { id: 2, name: 'Çıkış Yap', icon: 'bi bi-truck' },
    { id: 3, name: 'Teslim Edildi', icon: 'bi bi-flag' },
    { id: 4, name: 'İptal Et', icon: 'bi bi-trash' },
    { id: 5, name: 'İncele', icon: 'bi bi-search' },
  ];

  protected trackingNumberVisible: boolean = true;

  protected shipEditorOptions: any = {
    text: 'Gemi ile yolda',
    onValueChanged: (e: any) => {
      this.trackingNumberVisible = !e.component.option('value');
      this.status3FormData.trackingNumber = this.trackingNumberVisible ? '' : 'Gemi ile yolda';
    }
  }

  async actionChanged(e: any, data: any) {
    console.log(e)
    switch (e.itemData.id) {
      case 0:
        this.status1FormData.id = data.id;
        this.status1FormData.newPrice = data.price;
        this.status1PopupVisible = true
        break;
      case 1:
        this.paymentorder(data.id);
        break;
      case 2:
        this.status3FormData.id = data.id;
        this.status3FormData.shippingNumber = '';
        this.status3FormData.trackingNumber = '';
        this.status3PopupVisible = true;
        break;
      case 3:
        this.deliveredorder(data.id);
        break;
      case 4:
        const result = await confirm("Sipariş iptal edilecektir. Devam etmek istiyor musunuz?", "UYARI");
        if (result)
          this.cancelorder(data.id);
        break;

    }
  }

  async updateorderprice() {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.updateorderprice(this.status1FormData.id, this.status1FormData.newPrice);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }

  async updateordershipping() {
    this.status3PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.updateordershipping(this.status3FormData.id, this.status3FormData.shippingNumber, this.status3FormData.trackingNumber);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }

  async paymentorder(id: any) {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.paymentorder(id);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }

  async deliveredorder(id: any) {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.deliveredorder(id);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }
  async cancelorder(id: any) {
    this.status1PopupVisible = false;
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrdersService.cancelorder(id);
    this.utilityService.loadingPanelVisible = false;
    this.mainGrid.instance.refresh();
  }
}
