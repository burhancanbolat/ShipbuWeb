import { Component, Input } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-loading-panel',
  templateUrl: './loading-panel.component.html',
  styles: [
  ]
})
export class LoadingPanelComponent {

  constructor(protected readonly utilityService : UtilityService){}
}
