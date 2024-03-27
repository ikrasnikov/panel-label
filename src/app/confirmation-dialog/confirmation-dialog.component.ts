import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseDialogComponent } from '../helpers/base-dialog.component';
import { IDialogData } from '../../types/dialog-data';
import { IMap } from '../../types/map';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'component-wrapper' },
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ConfirmationDialogComponent extends BaseDialogComponent<any> {
  public get submitButtonLabel(): string {
    return this.data.submitButtonLabel || '';
  }

  public get cancelButtonLabel(): string {
    return this.data.cancelButtonLabel || '';
  }

  public get submitIsHidden(): boolean {
    return Boolean(this.data.submitIsHidden);
  }

  public get action$(): Observable<void> {
    return this.data.action$ || of(null);
  }

  public get buttonType(): string {
    return this.data.buttonType || 'primary';
  }

  public get image(): string {
    return this.data.image || '';
  }

  public get tourAnchorMap(): IMap {
    return {
      container: '',
      title: '',
      body: '',
      actions: '',
      ...this.data.tourAnchorMap
    };
  }

  public get large(): boolean {
    return Boolean(this.data.large);
  }

  public get medium(): boolean {
    return Boolean(this.data.medium);
  }

  public get cancel$(): Observable<void> {
    return this._cancel$$.asObservable().pipe(takeUntil(this._destroy$$));
  }

  private _cancel$$: Subject<void> = new Subject<void>();

  public constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: IDialogData,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public triggerSuccess(data: any): void {
    this._success$$.next(data);
  }

  public triggerError(error: HttpErrorResponse): void {
    this._error$$.next(error);
  }

  public close(): void {
    this._cancel$$.next();
    this.dialogRef.close();
  }
}
