import { Injectable } from '@angular/core';

import { ISwitcherItem } from '../../types/item';

@Injectable()
export class ConstructorPageService {
  public getFreeSlots(items: ISwitcherItem[], settingsBreakerCount: number): number {
    return settingsBreakerCount - items.reduce(
      (sum: number, item:ISwitcherItem) => sum + item.breakerSize, 0
    );
  }
}