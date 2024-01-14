import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styles: [
  ]
})
export class SectionHeaderComponent {
  @Input()
  title?: string;
}
