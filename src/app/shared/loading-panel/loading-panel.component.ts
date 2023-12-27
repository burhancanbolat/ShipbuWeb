import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-panel',
  templateUrl: './loading-panel.component.html',
  styles: [
  ]
})
export class LoadingPanelComponent {
  @Input()
  public visible: boolean = false;
}
