import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ISwitcherItem } from '../../types/item';

@Injectable()
export class ConstructorPageService {
  private _toggleSettings$$: Subject<void> = new Subject();
  private _openPreview$$: Subject<void> = new Subject();
  private _downloadLabels$$: Subject<void> = new Subject();

  public getFreeSlots(
    items: ISwitcherItem[],
    settingsBreakerCount: number,
    breaker?: ISwitcherItem
  ): number {
    return settingsBreakerCount - items.reduce(
      (sum: number, item:ISwitcherItem) => sum + item.breakerSize, 0
    ) + (breaker ? breaker?.breakerSize : 0);
  }

  public getToggleSettings$(): Observable<void> {
    return this._toggleSettings$$.asObservable();
  }

  public getOpenPreview$(): Observable<void> {
    return this._openPreview$$.asObservable();
  }

  public getDownloadLabels$(): Observable<void> {
    return this._downloadLabels$$.asObservable();
  }

  public toggleSettings(): void {
    this._toggleSettings$$.next();
  }

  public openPreview(): void {
    this._openPreview$$.next();
  }

  public downloadLabels(): void {
    this._downloadLabels$$.next();
  }
}