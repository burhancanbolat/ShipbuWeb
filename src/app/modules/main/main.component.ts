import { Component, OnInit, isDevMode } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TransportStaticPagesService } from 'src/app/services/transport-static-pages.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {
  constructor(
    protected readonly accountService: AccountService,
    protected readonly transportStaticPagesService: TransportStaticPagesService
  ) { }
  isDevMode = isDevMode();
  staticPages: any[] = [];


  async ngOnInit() {
   await this.transportStaticPagesService.store.load({ 'filter': ['enabled', '=', true] }).then((result:any)=>{
      this.staticPages = result.data;
    })
  }

}
