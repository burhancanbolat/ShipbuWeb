import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styles: [
  ]
})
export class TabViewComponent {

  @Input("items")
  items: any[] = [];

  @Input("selectedIndex")
  selectedIndex: number = 0;

  @Output("selectedIndex")
  selectedIndexChange: EventEmitter<number> = new EventEmitter();

  @Output('onItemClick')
  onItemClick: EventEmitter<any> = new EventEmitter();

  hoveredIndex?: number;

  protected click(item: any, index: number) {
    this.selectedIndex = index;
    this.onItemClick.emit(item);
  }
}
