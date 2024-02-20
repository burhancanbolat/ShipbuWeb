import { Component, OnInit } from '@angular/core';
import { loadMessages, locale } from 'devextreme/localization';
import { AccountService } from 'src/app/services/account.service';
import * as trMessages from "devextreme/localization/messages/tr.json";
import { TransportPaymentsService } from 'src/app/services/transport-payments.service';

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
    protected readonly transportPaymentsService: TransportPaymentsService
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
          icon: 'bi bi-plus-circle',
          title: 'Teklif Al',
          url: 'placeorder',
        },
        {
          icon: 'bi bi-boxes',
          title: 'Sevkiyatlarım',
          url: 'orders',
        },
      ]
    },
    {
      title: 'HESAP',
      items: [
        {
          icon: 'bi bi-person',
          title: 'Profilim',
          url: 'profile',
        },
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
        {
          icon: 'bi bi-question-circle',
          title: 'Nasıl Çalışır',
          url: 'howitworks',
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
