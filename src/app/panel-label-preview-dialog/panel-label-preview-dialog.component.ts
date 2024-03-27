import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageScrollViews } from 'ngx-page-scroll-core';

import { BaseDialogComponent } from '../helpers/base-dialog.component';
import { IProjectSettings } from '../../types/settings';
import { ISwitcherRow } from '../../types/row';
import { ScrollService } from '../services/scroll.service';
import { TourStepAnchorEnum } from '../enums/tour-steps.enum';

@Component({
  selector: 'panel-label-preview-dialog',
  templateUrl: './panel-label-preview-dialog.component.html',
  host: { class: 'fullscreen-dialog' },
})
export class PanelLabelPreviewDialogComponent extends BaseDialogComponent<void> implements AfterViewInit {
  public readonly TOUR_ANCHOR_CLOSE: TourStepAnchorEnum = TourStepAnchorEnum.PREVIEW_DIALOG_CLOSE;

  @ViewChild('topScrollPositionRequest', { static: true })
  public topScrollPosition!: ElementRef<HTMLElement>;

  private _scrollContainer!: PageScrollViews;

  public constructor(
    public dialogRef: MatDialogRef<PanelLabelPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      settings: IProjectSettings,
      rows: ISwitcherRow[],
    },
    private _cdRef: ChangeDetectorRef,
    private _scrollService: ScrollService,
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this._scrollContainer = this._scrollService.getContainer();
    this._scrollService.setContainer(this.topScrollPosition.nativeElement);

    this._cdRef.detectChanges();
  }

  public closeDialog(): void {
    this._scrollService.setContainer(this._scrollContainer);
    this.dialogRef.close();
  }
}
