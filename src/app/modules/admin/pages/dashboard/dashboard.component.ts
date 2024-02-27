import { AfterViewInit, Component } from '@angular/core';
import { TransportDashboardService } from 'src/app/services/transport-dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements AfterViewInit {

  constructor(
    protected readonly transportDashboardService: TransportDashboardService,
    protected readonly utilityService: UtilityService,
  ) {

  }


  orderInfo: any[] = [
    {
      month: 'Ocak',
      total: 1342,
      amount: 880,
    },
    {
      month: 'Şubat',
      total: 1458,
      amount: 1085,
    },
    {
      month: 'Mart',
      total: 1404,
      amount: 960,
    },
    {
      month: 'Nisan',
      total: 1620,
      amount: 1500,
    },
    {
      month: 'Mayıs',
      total: 1800,
      amount: 1520,
    },
    {
      month: 'Haziran',
      total: 1625,
      amount: 1450,
    },
    {
      month: 'Temmuz',
      total: 1404,
      amount: 1290,
    },
    {
      month: 'Ağustos',
      total: 1992,
      amount: 1842,
    },
    {
      month: 'Eylül',
      total: 2025,
      amount: 1805,
    },
    {
      month: 'Ekim',
      total: 1985,
      amount: 1740,
    },
    {
      month: 'Kaım',
      total: 2431,
      amount: 2385,
    },
    {
      month: 'Aralık',
      total: 2541,
      amount: 2504,
    }
  ];
  lastOrders: any[] = [
    {
      userName: 'Ali Yılmaz',
      from: 'Çin',
      to: 'Türkiye',
      amount: 80,
      date: '12/12/2023'
    },
    {
      userName: 'Fatih Halıcı',
      from: 'Çin',
      to: 'Türkiye',
      amount: 143,
      date: '12/12/2023'
    },
    {
      userName: 'Kerem Genç',
      from: 'Çin',
      to: 'Türkiye',
      amount: 99,
      date: '12/12/2023'
    },
    {
      userName: 'Alexander Kopowitch',
      from: 'Çin',
      to: 'Türkiye',
      amount: 45,
      date: '12/12/2023'
    },
    {
      userName: 'Canan Odabaşı',
      from: 'Çin',
      to: 'Türkiye',
      amount: 750,
      date: '12/12/2023'
    },
    {
      userName: 'Bahri Yıldız',
      from: 'Çin',
      to: 'Türkiye',
      amount: 80,
      date: '12/12/2023'
    },
    {
      userName: 'Metin Kaya',
      from: 'Çin',
      to: 'Türkiye',
      amount: 805,
      date: '12/12/2023'
    },
    {
      userName: 'Ali Tekin',
      from: 'Çin',
      to: 'Türkiye',
      amount: 149,
      date: '12/12/2023'
    },
    {
      userName: 'Bahar Sarı',
      from: 'Çin',
      to: 'Türkiye',
      amount: 855,
      date: '12/12/2023'
    },
    {
      userName: 'Mehmet Güçlü',
      from: 'Çin',
      to: 'Türkiye',
      amount: 188,
      date: '12/12/2023'
    },

  ]

  stats: any = {};

  async ngAfterViewInit(): Promise<any> {
    this.utilityService.loadingPanelVisible = true;
    this.stats = await this.transportDashboardService.store.load();
    this.utilityService.loadingPanelVisible = false;
  }
}
