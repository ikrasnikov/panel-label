import { Injectable } from '@angular/core';

import { Color } from '../helpers/color';

@Injectable()
export class ColorService {
  private _colors: string[] = [
    '#f44336',
    '#e91e63',
    '#9c27b0',

    '#673ab7',
    '#3f51b5',
    '#2196f3',

    '#03a9f4',
    '#00bcd4',
    '#009688',

    '#4caf50',
    '#8bc34a',
    '#cddc39',

    '#ffeb3b',
    '#ffc107',
    '#ff9800',

    '#ff5722',
    '#795548',
    '#9e9e9e',

    '#607d8b',
  ];

  public generate(id: number, customColors: string[] = []): Color {
    return customColors.length
      ? new Color(customColors[id % customColors.length])
      : new Color(this._colors[id % this._colors.length]);
  }
}
