import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styles: [
  ]
})
export class PaymentsComponent {
  constructor(
    protected readonly accountService: AccountService,
  ) {

  }
}
