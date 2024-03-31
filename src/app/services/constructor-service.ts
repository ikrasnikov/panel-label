import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, tap } from 'rxjs';

import { BreakerColor, BreakerSize, BreakerType } from '../enums/item.enum';
import { IProjectSettings } from '../../types/settings';
import { ISwitcherItem } from '../../types/item';
import { ISwitcherRow } from '../../types/row';
import { LabelFont, LabelPosition, LanguageKey, SwitcherType } from '../enums/settings.enum';

@Injectable()
export class ConstructorService {
  private readonly _DEFAULT_NEW_BREAKER: ISwitcherItem = {
    id: 0,
    position: 1,
    breakerSize: BreakerSize.ONE,
    color: BreakerColor.RED,
    icon: 'home',
    iconFontSize: 32,
    label: 'New breaker',
    fontSize: 16,
    type: BreakerType.BREAKER,
  };

  private readonly _EMPTY_ROW: ISwitcherRow = {
    id: 0,
    items: [],
    position: 0,
    projectId: 0,
  };

  private _rows: ISwitcherRow[] = [
    {
      id: 1,
      position: 1,
      projectId: 1,
      items: [
        {
          id: 1,
          position: 1,
          breakerSize: BreakerSize.THREE,
          color: BreakerColor.RED,
          icon: 'home',
          iconFontSize: 32,
          label: 'Main',
          fontSize: 16,
          type: BreakerType.BREAKER,
        },
        {
          id: 2,
          position: 2,
          breakerSize: BreakerSize.ONE,
          color: BreakerColor.BLUE,
          icon: 'lightbulb',
          iconFontSize: 32,
          label: 'Kitchen uysdyuh isdyicdyuv',
          fontSize: 16,
          type: BreakerType.BREAKER,
        },
        {
          id: 3,
          position: 3,
          breakerSize: BreakerSize.TWO,
          color: BreakerColor.GREEN,
          icon: 'electrical_services',
          iconFontSize: 32,
          label: 'Sockets Kitchen',
          fontSize: 16,
          type: BreakerType.BREAKER,
        },
      ],
    },
    {
      id: 2,
      position: 2,
      projectId: 1,
      items: [
        {
          id: 4,
          position: 1,
          breakerSize: BreakerSize.TWO,
          color: BreakerColor.GREY,
          icon: 'home',
          iconFontSize: 32,
          label: 'Main',
          fontSize: 16,
          type: BreakerType.BREAKER,
        },
        {
          id: 5,
          position: 2,
          breakerSize: BreakerSize.THREE,
          color: BreakerColor.PURPLE,
          icon: 'lightbulb',
          iconFontSize: 32,
          label: 'Kitchen uysdyuh isdyicdyuv',
          fontSize: 16,
          type: BreakerType.BREAKER,
        },
        {
          id: 6,
          position: 3,
          breakerSize: BreakerSize.ONE,
          color: BreakerColor.SAND,
          icon: 'electrical_services',
          iconFontSize: 32,
          label: 'Sockets Kitchen',
          fontSize: 16,
          type: BreakerType.BREAKER,
        },
      ],
    },
  ];

  private _rows$$: BehaviorSubject<ISwitcherRow[]> = new BehaviorSubject<ISwitcherRow[]> (this._rows);

  // 45.5*18
  private _settings$$: BehaviorSubject<IProjectSettings> = new BehaviorSubject<IProjectSettings>(
    {
      areLabelsSeperated: true,
      breakerCount: 9,
      font: LabelFont.MONTSERRAT,
      height: 45.5,
      id: 1,
      isItemSize: true,
      labelHeight: 25,
      language: LanguageKey.EN,
      position: LabelPosition.UNDER,
      title: 'My test project',
      type: SwitcherType.EU,
      width: 18,
      userId: 1
    }
  );

  // TODO: this request should use userId as a param
  public getRows$(/*projectId: number*/): Observable<ISwitcherRow[]> {
    return this._rows$$.asObservable()
  }

  // TODO: this request should use userId as a param
  public getSettings$(/*projectId: number*/): Observable<IProjectSettings> {
    return this._settings$$.asObservable();
  }

  public updateSettings$(settings: IProjectSettings): Observable<IProjectSettings> {
    this._settings$$.next(settings);
    return this._settings$$.asObservable();
  }

  public addRow$(position: number, projectId: number): void {
    this._rows.push({ ...this._EMPTY_ROW, position, id: Number(new Date()), projectId });
    this._rows$$.next(this._rows);
  }

  public addBreaker$(rowId: number/*, item: ISwitcherItem, projectId: number*/): Observable<null> {
    return of(null)
      .pipe(
        tap(() => {
          this._rows = this._getUpdatedBreakerRows(
            rowId,
            this._rows,
            (items: ISwitcherItem[]) => [ ...items, { ...this._DEFAULT_NEW_BREAKER, id: Number(new Date()) } ],
          );

          this._rows$$.next(this._rows);
        })
      );
  }

  // TODO: this request should use userId as a param
  public updateBreaker$(rowId: number, updatedItem: ISwitcherItem/*, projectId: number*/): Observable<null> {
    return of(null)
      .pipe(
        tap(() => {
          this._rows = this._getUpdatedBreakerRows(
            rowId,
            this._rows,
            (items: ISwitcherItem[]) => {
              return items.map((item: ISwitcherItem) => {
                if (item.id === updatedItem.id) {
                  return updatedItem;
                }

                return item;
              })
            }
          );

          this._rows$$.next(this._rows);
        })
      );
  }

  // TODO: this request should use userId as a param
  public deleteBreaker$(breakerId: number, rowId: number/*, projectId: number*/): Observable<null> {
    return of(null)
      .pipe(
        tap(() => {
          this._rows = this._getUpdatedBreakerRows(
            rowId,
            this._rows,
            (items: ISwitcherItem[]) => items.filter((item: ISwitcherItem) => item.id !== breakerId)
          );

          this._rows$$.next(this._rows);
        })
      );
  }

  // TODO: this request should use userId as a param
  public deleteRow$(rowId: number/*, projectId: number*/): Observable<null> {
    return of(null)
      .pipe(
        tap(() => {
          this._rows = this._rows.filter((row: ISwitcherRow) => row.id !== rowId)
          this._rows$$.next(this._rows);
        })
      );
  }

  private _getUpdatedBreakerRows(
    rowId: number,
    rows: ISwitcherRow[],
    updateCallBack: (items: ISwitcherItem[]) => ISwitcherItem[],
  ): ISwitcherRow[] {
    return rows.map((row: ISwitcherRow) => {
      let updatedRow: ISwitcherRow = row;

      if (row.id === rowId) {
        updatedRow = { ...row, items: updateCallBack(row.items) };
      }

      return updatedRow;
    });
  }
}