import { Component, OnInit, isDevMode } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TransportStaticPagesService } from 'src/app/services/transport-static-pages.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {
  constructor(
    protected readonly accountService: AccountService,
    protected readonly transportStaticPagesService: TransportStaticPagesService,
    protected readonly utilityService : UtilityService
  ) { }
  isDevMode = isDevMode();

  async ngOnInit() {
   
  }

}
