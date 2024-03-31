import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

export interface ISnackBarContentData {
  message$: Observable<string>;
  inProgress?: boolean;
  action?: string;
  showCloseBtn?: boolean;
  type?: 'info' | 'warn';
}

@Component({
  selector: 'snack-bar-content',
  templateUrl: './snackbar-content.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'simple-snackbar',
  },
})
export class SnackBarContentComponent {
  public test
  public get showInProgress(): boolean {
    return !!this.data?.inProgress;
  }

  public get showActionBtn(): boolean {
    return !this.showInProgress && !!this.data?.action;
  }

  public get showCloseBtn(): boolean {
    return !this.showInProgress && !this.showActionBtn && !!this.data?.showCloseBtn;
  }

  public constructor(
    private _snackBarRef: MatSnackBarRef<SnackBarContentComponent>,
    @Inject(MAT_SNACK_BAR_DATA)
    public data: ISnackBarContentData,
  ) {}

  public dismiss(): void {
    this._snackBarRef.dismiss();
  }

  public dismissWithAction(): void {
    this._snackBarRef.dismissWithAction();
  }
}
