import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs';

import { BaseComponent } from '../helpers/base-component';
import { IProjectSettings } from '../../types/settings';
import { LabelFont, LabelPosition, SwitcherType } from '../enums/settings.enum';
import { SettingsService } from '../services/settings-service';
import { SnackBarService } from '../services/snackbar.service';
import { TourStepAnchorEnum } from '../enums/tour-steps.enum';

@Component({
  selector: 'panel-label-settings',
  templateUrl: './panel-label-settings.component.html',
  host: { class: 'settings' },
})
export class PanelLabelSettingsComponent extends BaseComponent implements OnInit {
  // public readonly TOUR_ANCHOR_TYPE: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_TYPE;
  public readonly TOUR_ANCHOR_SIZE_TYPE: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_SIZE_TYPE;
  public readonly TOUR_ANCHOR_SIZE: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_SIZE;
  public readonly TOUR_ANCHOR_BREAKER_QUANTITY: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_BREAKER_QUANTITY;
  public readonly TOUR_ANCHOR_PRINT_ORIENTATION: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_PRINT_ORIENTATION;
  public readonly TOUR_ANCHOR_SEPERATED_UNITED: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_SEPERATED_UNITED;
  public readonly TOUR_ANCHOR_LABEL_SIZE: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_LABEL_SIZE;
  public readonly TOUR_ANCHOR_FONT: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_FONT;
  public readonly TOUR_ANCHOR_SAVE: TourStepAnchorEnum = TourStepAnchorEnum.SETTINGS_SAVE;
  public readonly SWITCHER_TYPES: SwitcherType[] = this._settingsService.SWITCHER_TYPES;
  public readonly LABEL_FONTS: LabelFont[] = this._settingsService.LABEL_FONTS;
  public readonly RAIL_SIZES: number[] = Array.from({ length: 32 }, (_, i: number) => i + 1);

  @Output() public saveSettings: EventEmitter<IProjectSettings> = new EventEmitter();
  @Input() public settings!: IProjectSettings;

  public form!: FormGroup;

  private readonly _DEFAULT_RAIL_SIZE: number = 7;
  private readonly _DEFAULT_LABEL_HEIGHT: number = 25;

  public constructor(
    private _fb: UntypedFormBuilder,
    private _settingsService: SettingsService,
    private _snackBarService: SnackBarService,
  ) {super()}

  public ngOnInit(): void {
    this.form = this._fb.group({
      title: [this.settings.title || '', [Validators.required, Validators.maxLength(72), Validators.pattern(/\S+/)]],
      // type: [this.settings.type || SwitcherType.EU, Validators.required],
      isItemSize: this.settings.isItemSize || true,
      isBookOrientation: this.settings.isBookOrientation || true,
      width: [
        this.settings.width || 0,
        [
          Validators.required,
          Validators.min(10),
          this.settings.isItemSize ? Validators.max(100) : Validators.max(9999),
        ]],
      height: [this.settings.height || 0, [Validators.required, Validators.min(20), Validators.max(100)]],
      position: [this.settings.position || LabelPosition.UNDER, Validators.required],
      breakerCount: [this.settings.breakerCount || this._DEFAULT_RAIL_SIZE, Validators.required],
      font: [this.settings.font || LabelFont.MONTSERRAT, Validators.required],
      labelHeight: [this.settings.labelHeight || this._DEFAULT_LABEL_HEIGHT, [Validators.required, Validators.min(10), Validators.max(100)]],
      areLabelsSeperated: this.settings.isItemSize || true,
    });

    this.form.controls['isItemSize'].valueChanges
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe((isItemSize: boolean) => {
        this.form.controls['width'].setValidators([]);
        this.form.controls['width'].patchValue(this.getWidth(isItemSize));
        this.form.controls['width'].addValidators(Validators.min(10));
        this.form.controls['width'].addValidators(Validators.max(isItemSize ? 100 : 9999));
        this.form.controls['width'].updateValueAndValidity();
      });
  }

  public saveForm(): void {
    if (this.form.invalid) {
      this._snackBarService.showError({ message: 'Please fill all required fields' });

      return;
    }

    this.saveSettings.emit(this.form.value);
  }

  public getFonts(query: string): LabelFont[] {
    return this.LABEL_FONTS.filter((font: LabelFont) => font.toLowerCase().includes(query.toLowerCase()));
  }

  public getWidth(isItemSize: boolean): number {
    const countOperation: () => number = isItemSize
    ? () => this.form.controls['width'].value / this.form.controls['breakerCount'].value
    : () => this.form.controls['width'].value * this.form.controls['breakerCount'].value;

    return Math.round(countOperation() * 100) / 100;
  }
}
