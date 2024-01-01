import { Component } from '@angular/core';
import { loadMessages, locale } from 'devextreme/localization';
import { AccountService } from 'src/app/services/account.service';
import * as trMessages from "devextreme/localization/messages/tr.json";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: [
    './member.component.scss'
  ]
})
export class MemberComponent {
  constructor(
    protected readonly accountService: AccountService
  ) {
    loadMessages(trMessages);
    locale('tr');
    this.isMenuOpen = JSON.parse(localStorage.getItem('isMenuOpen') ?? "true") as boolean;
  }

  protected isMenuOpen: boolean;

  protected menu: any[] = [
    {
      title: 'YÖNETİM PANELİ',
      items: [
        {
          icon: 'bi bi-plus-circle',
          title: 'Teklif Al',
          url: 'transportorder',
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
          url: 'transportorderitemfeatures',
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

  protected toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    localStorage.setItem("isMenuOpen", JSON.stringify(this.isMenuOpen));
  }
}
