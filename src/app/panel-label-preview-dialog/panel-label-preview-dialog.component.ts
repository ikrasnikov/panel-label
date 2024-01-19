import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageScrollViews } from 'ngx-page-scroll-core';

import { BaseDialogComponent } from '../helpers/base-dialog.component';
import { IProjectSettings } from '../../types/settings';
import { ISwitcherRow } from '../../types/row';
import { ScrollService } from '../services/scroll.service';
@Component({
  selector: 'panel-label-preview-dialog',
  templateUrl: './panel-label-preview-dialog.component.html',
  host: { class: 'fullscreen-dialog' },
})
export class PanelLabelPreviewDialogComponent extends BaseDialogComponent<void> implements AfterViewInit {
  @ViewChild('topScrollPositionRequest', { static: true })
  public topScrollPosition!: ElementRef;

  @ViewChild('previewContent', { static: true })
  public previewContent!: ElementRef;

  public labelHeight: string = '';

  // rail width is 210mm (A4 width) - 2*10mm (side margin) - 2*2mm (rail side margin)
  private readonly _RAIL_WIDTH_MM: number = 186;
  private readonly _CONTENT_MAX_WIDTH: number = 1190.55;
  private readonly _PX_TO_MM_COEFFICIENT: number = 0.26458333333333;

  private _scrollContainer!: PageScrollViews;
  private _singleLabelWidth: number = 0;

  public constructor(
    public dialogRef: MatDialogRef<PanelLabelPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      settings: IProjectSettings,
      rows: ISwitcherRow[],
    },
    private _scrollService: ScrollService,
    private readonly _cdRef: ChangeDetectorRef,
  ) {
    super();

    this._singleLabelWidth = this.data.settings.isItemSize
      ? this.data.settings.width
      : this.data.settings.width / this.data.settings.breakerCount;
  }

  public ngAfterViewInit(): void {
    this._scrollContainer = this._scrollService.getContainer();
    this._scrollService.setContainer(this.topScrollPosition.nativeElement);

    this.labelHeight = ((this.data.settings.labelHeight / this._PX_TO_MM_COEFFICIENT)
      * this.previewContent.nativeElement.offsetWidth / this._CONTENT_MAX_WIDTH) * 1.5 + 'px';

    this._cdRef.detectChanges();
  }

  public closeDialog(): void {
    this._scrollService.setContainer(this._scrollContainer);
    this.dialogRef.close();
  }

  public getLabelPercentageWidth(breakerSize: number): string {
    return (((this._singleLabelWidth * breakerSize)
      / this._RAIL_WIDTH_MM) * 100) + '%';
  }

  public getFontSize(fontSize: number): string {
    return (this.previewContent.nativeElement.offsetWidth / this._CONTENT_MAX_WIDTH * fontSize) + 'px'
  }
}
