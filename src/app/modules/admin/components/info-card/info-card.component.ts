import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styles: [
  ]
})
export class InfoCardComponent {

  @Input()
  color?: string;
  @Input()
  title?: string;
  @Input()
  value?: string;
  @Input()
  icon?: string;
  @Input()
  url?: string;
  
}
