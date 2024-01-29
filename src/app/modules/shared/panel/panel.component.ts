import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: [
  ]
})
export class PanelComponent {
  @Input('class')
  className?: string;
}
