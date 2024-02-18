import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent {

  protected statuses = [
    { value: 0, name: 'Teklif Verildi' },
    { value: 1, name: 'Ödeme Bekleniyor' },
    { value: 2, name: 'Ödeme Yapıldı' },
    { value: 3, name: 'Çıkış Yapıldı' },
    { value: 4, name: 'Teslim Edildi' },
  ];

}
