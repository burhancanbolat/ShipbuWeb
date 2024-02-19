import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import * as trMessages from "devextreme/localization/messages/tr.json";
import { locale, loadMessages } from "devextreme/localization";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.scss'
  ]
})
export class AdminComponent {

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
      title: 'GENEL',
      items: [
        {
          icon: 'bi bi-layout-text-sidebar-reverse',
          title: 'Dashboard',
          url: 'dashboard',
        }
      ]
    },
    {
      title: 'TANIMLAMALAR',
      items: [
        {
          icon: 'bi bi-file-richtext',
          title: 'İçerik Sayfaları',
          url: 'transportstaticpages',
        },
        {
          icon: 'bi bi-youtube',
          title: 'Akademi',
          url: 'academy',
        },
        {
          icon: 'bi bi-box',
          title: 'Konteyner Tipleri',
          url: 'transportorderitemcontainertypes',
        },
        {
          icon: 'bi bi-list-check',
          title: 'Sipariş Paket İşlem',
          url: 'transportorderitemfeatures',
        },

      ]
    },
    {
      title: 'HESAP',
      items: [
        {
          icon: 'bi bi-people',
          title: 'Üyeler',
          url: 'members',
        },
        {
          icon: 'bi bi-cart',
          title: 'Sevkiyatlar',
          url: 'transportorders',
        },
        {
          icon: 'bi bi-currency-dollar',
          title: 'Ödemeler',
          url: 'transportpayments',
        },
        
      ]
    },

  ]

  protected toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    localStorage.setItem("isMenuOpen", JSON.stringify(this.isMenuOpen));
  }
}
