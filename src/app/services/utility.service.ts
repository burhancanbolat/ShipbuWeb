import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  loadingPanelVisible: boolean = false;

  lang: 'tr' | 'en' = 'tr';

  protected translations: any = {
    "tr": {
      "language": "Dil",
      "menuDashboard": "Dashboard",
      "menuPlaceOrder": "Teklif Al",
      "menuTransports": "Sevkiyatlarım",
      "titleSupport" : "Destek Talebi"
    },
    "en": {
      "language": "Language",
      "menuDashboard": "Dashboard",
      "menuPlaceOrder": "Place Order",
      "menuTransports": "My Transports",
      "titleSupport" : "Support"
    }
  };

  init() {
    let l = localStorage.getItem('lang') as 'tr' | 'en';
    if (!l)
      localStorage.setItem('lang', 'tr');
    this.lang = l ?? 'tr';
  }

  switchLanguage(l: 'tr' | 'en') {
    localStorage.setItem('lang', l);
    this.lang = l;
    window.location.reload();
  }


  translate(key: string): string {
    return this.translations[this.lang][key];
  }

}

