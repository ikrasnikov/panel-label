import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { ISwitcherItem } from '../../types/item';
import { ISwitcherRow } from '../../types/row';

@Component({
  selector: 'panel-label-row',
  templateUrl: './panel-label-row.component.html',
})
export class PanelLabelRowComponent implements OnChanges {
  @Output() public addBreaker: EventEmitter<void> = new EventEmitter<void>();
  @Input() public moduleCount: number = 1;
  @Input() public switcherRow!: ISwitcherRow;

  public emptySlots: number[] = [];
  public occupiedSlotsCount: number = 0;

  public ngOnChanges(): void {
    if (this.switcherRow && this.switcherRow.items.length) {
      this.occupiedSlotsCount = this.switcherRow.items.reduce(
        (sum: number, item: ISwitcherItem) => sum + item.moduleSize, 0
      )
    }

    this.emptySlots = Array.from(
      {
        length: this.occupiedSlotsCount
          ? this.moduleCount - this.occupiedSlotsCount - 1
          : this.moduleCount - 1
      },
      (_, i: number) => i + 1
    );
  }
}
