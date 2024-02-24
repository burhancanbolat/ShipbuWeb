import { Component, OnInit } from '@angular/core';
import { loadMessages, locale } from 'devextreme/localization';
import { AccountService } from 'src/app/services/account.service';
import * as trMessages from "devextreme/localization/messages/tr.json";
import { TransportPaymentsService } from 'src/app/services/transport-payments.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: [
    './member.component.scss'
  ]
})
export class MemberComponent implements OnInit {
  constructor(
    protected readonly accountService: AccountService,
    protected readonly transportPaymentsService: TransportPaymentsService,
    protected readonly utilityService : UtilityService,
  ) {
    loadMessages(trMessages);
    locale('tr');
    this.isMenuOpen = JSON.parse(localStorage.getItem('isMenuOpen') ?? "true") as boolean;
  }


  protected isMenuOpen: boolean;
  protected userBalance: number  = 0;

  protected menu: any[] = [
    {
      title: 'YÖNETİM PANELİ',
      items: [
        {
          icon: 'bi bi-person',
          title: 'Dashboard',
          url: 'profile',
        },
        {
          icon: 'bi bi-plus-circle',
          title: this.utilityService.translate('menuPlaceOrder'),
          url: 'placeorder',
        },
        {
          icon: 'bi bi-boxes',
          title: this.utilityService.translate('menuTransports'),
          url: 'orders',
        },
      ]
    },
    {
      title: 'HESAP',
      items: [
        {
          icon: 'bi bi-list-check',
          title: 'Ödemelerim',
          url: 'payments',
        },
      ]
    },
    {
      title: 'SHIPBU',
      items: [
        {
          icon: 'bi bi-mortarboard',
          title: 'Shipbu Akademi',
          url: 'academy',
        },
      ]
    },

  ]

  async ngOnInit(): Promise<any> {
    this.userBalance = await this.transportPaymentsService.userBalance(this.accountService.user!.id);
  }

  protected toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    localStorage.setItem("isMenuOpen", JSON.stringify(this.isMenuOpen));
  }
}
