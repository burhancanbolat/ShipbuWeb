import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent {


  constructor(
    protected readonly accountService: AccountService
  ) {
    this.ordersStore = accountService.getOrdersStore();
  }

  protected ordersStore?: CustomStore;

}
