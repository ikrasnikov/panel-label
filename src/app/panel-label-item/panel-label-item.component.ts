import { Component, Input, OnInit } from '@angular/core';

import { ISwitcherItem } from '../../types/item';

@Component({
  selector: 'panel-label-item',
  templateUrl: './panel-label-item.component.html',
})
export class PanelLabelItemComponent implements OnInit {
  @Input() public switcherItem!: ISwitcherItem;

  public switcherImagePath: string = '../../assets/switcher_{size}.png';
  public switcherPosition: string = '';

  public ngOnInit(): void {
    this.switcherImagePath = this.switcherImagePath.replace('{size}', this.switcherItem.moduleSize.toString());
    this.switcherPosition = this.switcherItem.position < 10
      ? `0${this.switcherItem.position}`
      : this.switcherItem.position.toString();
  }
}
