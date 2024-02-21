import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styles: [
  ]
})
export class StatusViewComponent {

  @Input('status')
  status: any;
}
