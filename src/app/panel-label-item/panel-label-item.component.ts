import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { BreakerFontSizes, BreakerIconFontSizes } from '../enums/item.enum';
import { BREAKER_FONT_SIZES_MAP, BREAKER_ICON_FONT_SIZES_MAP } from '../maps/item';
import { ISwitcherItem } from '../../types/item';

@Component({
  selector: 'panel-label-item',
  templateUrl: './panel-label-item.component.html',
})
export class PanelLabelItemComponent implements OnInit, OnChanges {
  public readonly BREAKER_FONT_SIZES_MAP: { [key: number]: BreakerFontSizes } = BREAKER_FONT_SIZES_MAP;
  public readonly BREAKER_ICON_FONT_SIZES_MAP: { [key: number]: BreakerIconFontSizes } = BREAKER_ICON_FONT_SIZES_MAP;

  @Output() public deleteItem: EventEmitter<void> = new EventEmitter<void>();
  @Output() public editItem: EventEmitter<void> = new EventEmitter<void>();

  @Input() public switcherItem!: ISwitcherItem;
  @Input() public fontFamily!: string;
  @Input() public isInteractive: boolean = true;

  public switcherImagePath: string = 'assets/switcher_{size}.png';
  public switcherPosition: string = '';

  public ngOnInit(): void {
    this.switcherImagePath = this.switcherImagePath.replace(
      '{size}',
      this.isInteractive ? this.switcherItem.breakerSize.toString() : 'example'
    );
  }

  public ngOnChanges(): void {
    this.switcherPosition = this.switcherItem.position < 10
      ? `0${this.switcherItem.position}`
      : this.switcherItem.position.toString();
  }
}
