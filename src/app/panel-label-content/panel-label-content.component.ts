import {
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';

import { combineLatest, switchMap, takeUntil } from 'rxjs';

import { BaseComponent } from '../helpers/base-component';
import { BreakerDialogComponent } from '../breaker-dialog/breaker-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConstructorPageService } from '../services/constructor-page-service';
import { ConstructorService } from '../services/constructor-service';
import { IProjectSettings } from '../../types/settings';
import { ISwitcherItem } from '../../types/item';
import { ISwitcherRow } from '../../types/row';
import { PanelLabelPreviewDialogComponent } from '../panel-label-preview-dialog/panel-label-preview-dialog.component';
import { SnackBarService } from '../services/snackbar.service';
import { TourStepAnchorEnum } from '../enums/tour-steps.enum';
import { UserTourService } from '../services/user-tour.service';

@Component({
  selector: 'panel-label-content',
  templateUrl: './panel-label-content.component.html',
  host: { class: 'constructor' },
})
export class PanelLabelContentComponent extends BaseComponent {
  public readonly TOUR_ANCHOR_RAIL: TourStepAnchorEnum = TourStepAnchorEnum.CONSTRUCTOR_RAIL;
  public readonly TOUR_ANCHOR_ADD_RAIL: TourStepAnchorEnum = TourStepAnchorEnum.CONSTRUCTOR_ADD_RAIL;

  @ViewChild('drawer') public matDrawer!: MatDrawer;

  public rows: ISwitcherRow[] = [];
  public settings!: IProjectSettings
  public horizontalSize: number = 0;
  public verticalSize: number = 0;
  public isLoading: boolean = true;
  public isPrintShown: boolean = false;
  public isAddBreakerDisabled: boolean = false;

  public constructor(
    private _cdr: ChangeDetectorRef,
    private _constructorPageService: ConstructorPageService,
    private _constructorService: ConstructorService,
    private _dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _userTourService: UserTourService,
  ) {
    super();
    combineLatest(
      this._constructorService.getRows$(),
      this._constructorService.getSettings$()
    )
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(([rows, settings]: [ISwitcherRow[], IProjectSettings]) => {
        this.rows = rows;
        this.settings = settings;

        this.horizontalSize = settings.isItemSize
          ? this._getRowSize(this.settings.width, this.settings.breakerCount)
          : this.settings.width;

        this.verticalSize = settings.isItemSize
          ? this._getRowSize(this.settings.height, this.rows.length)
          : this.settings.height;

        this.isLoading = false;
      });

    this._constructorPageService.getToggleSettings$()
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(() => {
        this.matDrawer.toggle();
      });

    this._constructorPageService.getOpenPreview$()
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(() => {
        this._dialog.open(
          PanelLabelPreviewDialogComponent,
          {
            data: {
              settings: this.settings,
              rows: this.rows,
            },
          },
        );
      });

    this._constructorPageService.getDownloadLabels$()
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(() => {
        this.isPrintShown = true;
        this._cdr.detectChanges();
        window.print();
        this.isPrintShown = false;
      });

    this._userTourService.getIsStarted$()
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(() => {
        this.isAddBreakerDisabled = true;
      });

    this._userTourService.getIsEnded$()
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(() => {
        this.isAddBreakerDisabled = false;
      });
  }

  public saveSettings(settings: IProjectSettings): void {
    this._constructorService.updateSettings$(settings)
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(() => {
        this._snackBarService.showMessage({
          message: 'CONTENT__SUCCESSFULLY_UPDATED_SETTINGS',
          translateParams: { title: settings.title },
        });
        this.matDrawer.close();
      });
  }

  public addRow(): void {
    this._constructorService.addRow$(
      this.rows.length + 1,
      this.settings.id,
    );
  }

  // I think it is a bad decision to add default breaker after click, that is why I leave logic in openBreakerDialog()
  public addDefaultBreaker(row: ISwitcherRow): void {
    this._constructorService.addBreaker$(row.id)
      .pipe(takeUntil(this._destroy$$))
      .subscribe();
  }

  public openBreakerDialog(row: ISwitcherRow, breaker?: ISwitcherItem): void {
    const freeSlots: number = this._constructorPageService.getFreeSlots(row.items, this.settings.breakerCount, breaker);

    const dialogRef: MatDialogRef<BreakerDialogComponent> = this._dialog.open(BreakerDialogComponent, {
      data: {
        action$: breaker
          ? (item: ISwitcherItem) => this._constructorService.updateBreaker$(row.id, item)
          : () => this._constructorService.addBreaker$(row.id),
        item: breaker,
        fontFamily: this.settings.font,
        freeSlots,
      },
      autoFocus: false
    });

    dialogRef.componentInstance.success$.pipe(takeUntil(this._destroy$$))
      .subscribe(() => {
        this._snackBarService.showMessage({
          message: breaker ? 'CONTENT__SUCCESSFULLY_UPDATED_BREAKER' : 'CONTENT__SUCCESSFULLY_ADDED_BREAKER'
        });
        dialogRef.close();
      });

    dialogRef.componentInstance.error$.pipe(takeUntil(this._destroy$$))
      .subscribe(() => {
        this._snackBarService.showError();
      });
  }

  public deleteBreaker(itemId: number, rowId: number): void {
    const editingRow: ISwitcherRow = this.rows.find((row: ISwitcherRow) => row.id === rowId) as ISwitcherRow;

    if (editingRow && editingRow.items.length === 1) {
      const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this._dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'CONTENT__DELETE_ROW_TITLE',
          body: 'CONTENT__DELETE_ROW_BODY',
          submitButtonLabel: '__BUTTON_YES',
          cancelButtonLabel: '__BUTTON_NO',
          buttonType: 'danger',
          action$: this._constructorService.deleteRow$(rowId),
          tourAnchorMap: { container: TourStepAnchorEnum.CONSTRUCTOR_DELETE_ROW },
        },
        autoFocus: false
      });

      dialogRef.componentInstance.success$.pipe(takeUntil(this._destroy$$))
        .subscribe(() => {
          this._snackBarService.showMessage({ message: 'CONTENT__SUCCESSFULLY_DELETED_ROW' });
          dialogRef.close();
        });

      dialogRef.componentInstance.cancel$
        .pipe(
          switchMap(() => this._constructorService.deleteBreaker$(itemId, rowId)),
          takeUntil(this._destroy$$)
        )
        .subscribe();

      return;
    }

    this._constructorService.deleteBreaker$(itemId, rowId)
      .pipe(takeUntil(this._destroy$$))
      .subscribe();
  }

  private _getRowSize(size: number, breakerCount: number): number {
    return size * breakerCount;
  }
}
