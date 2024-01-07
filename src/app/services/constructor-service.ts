import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { IProjectSettings } from '../../types/settings';
import { ISwitcherRow } from '../../types/row';
import { LabelFont, LabelPosition, SwitcherType } from '../enums/settings.enum';

@Injectable()
export class ConstructorService {
  private _rows: ISwitcherRow[] = [
    {
      id: 1,
      position: 1,
      items: [
        {
          id: 1,
          position: 1,
          moduleSize: 3,
          color: 'red',
          icon: 'home',
          label: 'Main',
        },
        {
          id: 2,
          position: 2,
          moduleSize: 1,
          color: 'blue',
          icon: 'lightbulb',
          label: 'Kitchen uysdyuh isdyicdyuv',
        },
        {
          id: 3,
          position: 3,
          moduleSize: 2,
          color: 'green',
          icon: 'electrical_services',
          label: 'Sockets Kitchen',
        },
      ],
    },
    {
      id: 2,
      position: 2,
      items: [
        {
          id: 4,
          position: 1,
          moduleSize: 2,
          color: 'grey',
          icon: 'home',
          label: 'Main',
        },
        {
          id: 5,
          position: 2,
          moduleSize: 3,
          color: 'purpul',
          icon: 'lightbulb',
          label: 'Kitchen uysdyuh isdyicdyuv',
        },
        {
          id: 6,
          position: 3,
          moduleSize: 1,
          color: 'aqua',
          icon: 'electrical_services',
          label: 'Sockets Kitchen',
        },
      ],
    },
  ];

  // 45.5*18
  private _settings: BehaviorSubject<IProjectSettings> = new BehaviorSubject<IProjectSettings>(
    {
      font: LabelFont.MONTSERRAT,
      height: 45.5,
      id: 1,
      isItemSize: true,
      position: LabelPosition.UNDER,
      moduleCount: 9,
      title: 'My test project',
      type: SwitcherType.EU,
      width: 18,
      userId: 1
    }
  );

  // TODO: this request should use userId as a param
  public getRows(): Observable<ISwitcherRow[]> {
    return of(this._rows);
  }

  // TODO: this request should use userId as a param
  public getSettings(): Observable<IProjectSettings> {
    return this._settings.asObservable();
  }

  public updateSettings(settings: IProjectSettings): Observable<IProjectSettings> {
    this._settings.next(settings);
    return this._settings.asObservable();
  }
}