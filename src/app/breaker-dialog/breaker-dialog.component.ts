import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject, defer, throwError } from 'rxjs';

import { BaseDialogComponent } from '../helpers/base-dialog.component';
import { BREAKER_COLORS, BREAKER_FONT_SIZES, BREAKER_ICONS, SWITCHER_SIZES_MAP } from '../maps/item';
import { BreakerColor, BreakerFontSizes, BreakerIcon, BreakerSize, BreakerType } from '../enums/item.enum';
import { ISwitcherItem } from '../../types/item';
import { SnackBarService } from '../services/snackbar.service';

@Component({
  templateUrl: './breaker-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'component-wrapper' },
})

export class BreakerDialogComponent extends BaseDialogComponent<void> {
  public readonly BREAKER_TYPES: BreakerType[] = [BreakerType.BREAKER];
  public readonly BREAKER_SIZES_MAP: { [key: string]: BreakerSize } = SWITCHER_SIZES_MAP;
  public readonly BREAKER_FONT_SIZES: BreakerFontSizes[] = BREAKER_FONT_SIZES;
  public readonly BREAKER_COLORS: BreakerColor[] = BREAKER_COLORS;
  public readonly BREAKER_ICONS: BreakerIcon[] = BREAKER_ICONS;

  public action$: Observable<null> = defer(() => this._saveBreaker());

  public form!: FormGroup;

  private readonly _DEFAULT_POSITION: string = '1';
  private readonly _DEFAULT_ICON: string = 'home';

  private _cancel$$: Subject<void> = new Subject<void>();

  public constructor(
    public dialogRef: MatDialogRef<BreakerDialogComponent>,
    private _fb: UntypedFormBuilder,
    private _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item?: ISwitcherItem,
      action$: (item: ISwitcherItem) => Observable<null>,
      fontFamily: string,
      freeSlots: number,
    },
  ) {
    super();

    this.form = this._fb.group({
      type: [{ value: this.data.item && this.data.item.type || BreakerType.BREAKER, disabled: true}, Validators.required],
      breakerSize: [this.data.item && this.data.item.breakerSize || BreakerSize.ONE, [Validators.required, Validators.max(this.data.freeSlots)]],
      label: [this.data.item && this.data.item.label || '', [Validators.required, Validators.maxLength(72), Validators.pattern(/\S+/)]],
      fontSize: [this.data.item && this.data.item.fontSize || BreakerFontSizes.SIXTEEN, Validators.required],
      position: [this.data.item && this.data.item.position || this._DEFAULT_POSITION, [Validators.required, Validators.maxLength(10), Validators.pattern(/\S+/)]],
      color: [this.data.item && this.data.item.color || BreakerColor.RED, Validators.required],
      icon: [this.data.item && this.data.item.icon || this._DEFAULT_ICON, Validators.required],
    });
  }

  public triggerSuccess(): void {
    this._success$$.next();
  }

  public triggerError(error: HttpErrorResponse): void {
    this._error$$.next(error);
  }

  public close(): void {
    this._cancel$$.next();
    this.dialogRef.close();
  }

  private _saveBreaker(): Observable<null> {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return throwError(null);
    }

    return this.data.action$(this.data.item
      ? { ...this.form.value, id: this.data.item.id}
      : this.form.value);
  }
}
