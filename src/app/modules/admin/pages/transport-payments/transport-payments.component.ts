import { Component } from '@angular/core';
import { TransportPaymentsService } from 'src/app/services/transport-payments.service';
import { UsersService } from 'src/app/services/users-service';

@Component({
  selector: 'app-transport-payments',
  templateUrl: './transport-payments.component.html',
  styles: [
  ]
})
export class TransportPaymentsComponent {
  constructor(
    protected readonly transportPaymentsService: TransportPaymentsService,
    protected readonly usersService: UsersService
  ) { }

  onInitNewRow(e: any) {
    e.data.date = new Date();
  }
}
