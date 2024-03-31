import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { takeUntil } from 'rxjs';

import { BaseComponent } from '../helpers/base-component';
import { HtmlToImageService } from '../services/html-to-image-service';
import { IProjectSettings } from '../../types/settings';
import { ISwitcherRow } from '../../types/row';

@Component({
  selector: 'print-content',
  templateUrl: './print-content.component.html',
})
export class PrintContentComponent extends BaseComponent implements AfterViewInit, OnInit {
  @Input() public rows: ISwitcherRow[] = [];
  @Input() public settings!: IProjectSettings;
  @Input() public isPreview: boolean = true;

  @ViewChild('printContentContainer', { static: true })
  public printContentContainer!: ElementRef;

  public labelHeight: string = '';
  public isHtmlShown: boolean = true;

  // rail width is 210mm (A4 width) - 2*10mm (side margin) - 2*2mm (rail side margin)
  private readonly _RAIL_WIDTH_MM: number = 186;
  private readonly _PX_TO_MM_COEFFICIENT: number = 0.26458333333333;

  private _singleLabelWidth: number = 0;

  public constructor(
    private _cdRef: ChangeDetectorRef,
    private _htmlToImageService: HtmlToImageService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this._singleLabelWidth = this.settings.isItemSize
      ? this.settings.width
      : this.settings.width / this.settings.breakerCount;
  }

  public ngAfterViewInit(): void {
    // need to correct labelHeight to preview dialog
    this.labelHeight = this.isPreview
      ? (this.settings.labelHeight / this._PX_TO_MM_COEFFICIENT) * 1.5 + 'px'
      : (this.settings.labelHeight / this._PX_TO_MM_COEFFICIENT) + 'px';

    this._cdRef.detectChanges();

    if (this.isPreview) {
      this._htmlToImageService.getPngFromHtml$(this.printContentContainer.nativeElement.firstChild)
        .pipe(takeUntil(this._destroy$$))
        .subscribe((previewImageSource: string) => {
          let image: HTMLImageElement = new Image();
          image.src = previewImageSource;
          this.printContentContainer.nativeElement.insertAdjacentElement('beforeend', image);
          this.isHtmlShown = false;
        });
    }
  }

  public getLabelPercentageWidth(breakerSize: number): string {
    return (((this._singleLabelWidth * breakerSize)
      / this._RAIL_WIDTH_MM) * 100) + '%';
  }

  public getFontSize(fontSize: number): string {
    return (this.isPreview
      ? fontSize * 1.5
      : fontSize)
      + 'px'
  }
}
