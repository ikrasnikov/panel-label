import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { ConstructorPageService } from '../services/constructor-page-service';
import { ISwitcherItem } from '../../types/item';
import { ISwitcherRow } from '../../types/row';
import { TourStepAnchorEnum } from '../enums/tour-steps.enum';

@Component({
  selector: 'panel-label-row',
  templateUrl: './panel-label-row.component.html',
})
export class PanelLabelRowComponent implements OnChanges {
  public readonly TOUR_ANCHOR_EDIT_BREAKER: TourStepAnchorEnum = TourStepAnchorEnum.ROW_EDIT_BREAKER;
  public readonly TOUR_ANCHOR_DELETE_BREAKER: TourStepAnchorEnum = TourStepAnchorEnum.ROW_DELETE_BREAKER;

  @Output() public addBreaker: EventEmitter<void> = new EventEmitter<void>();
  @Output() public deleteBreaker: EventEmitter<number> = new EventEmitter<number>();
  @Output() public editBreaker: EventEmitter<ISwitcherItem> = new EventEmitter<ISwitcherItem>();
  @Input() public breakerCount: number = 1;
  @Input() public switcherRow!: ISwitcherRow;
  @Input() public fontFamily!: string;
  @Input() public orderNumber: number = 0;
  @Input() public isAddBreakerDisabled: boolean = false;

  public emptySlots: number[] = [];
  public freeSlotsCount: number = 0;

  public constructor(
    private _constructorPageService: ConstructorPageService,
  ) {}

  public ngOnChanges(): void {
    this.freeSlotsCount = this._constructorPageService.getFreeSlots(this.switcherRow.items, this.breakerCount);

    this.emptySlots = Array.from(
      { length: this.freeSlotsCount - 1 },
      (_, i: number) => i + 1
    );
  }
}
