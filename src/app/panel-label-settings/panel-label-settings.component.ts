import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs';

import { BaseComponent } from '../helpers/base-component';
import { IProjectSettings } from '../../types/settings';
import { LabelFont, LabelPosition, SwitcherType } from '../enums/settings.enum';
import { SettingsService } from '../services/settings-service';

@Component({
  selector: 'panel-label-settings',
  templateUrl: './panel-label-settings.component.html',
  host: { class: 'settings' },
})
export class PanelLabelSettingsComponent extends BaseComponent implements OnInit {
  public readonly SWITCHER_TYPES: SwitcherType[] = this._settingsService.SWITCHER_TYPES;
  public readonly LABEL_FONTS: LabelFont[] = this._settingsService.LABEL_FONTS;
  public readonly LABEL_POSITION: LabelPosition[] = this._settingsService.LABEL_POSITION;
  public readonly RAIL_SIZES: number[] = Array.from({ length: 14 }, (_, i: number) => i + 1);

  @Output() public saveSettings: EventEmitter<IProjectSettings> = new EventEmitter();
  @Input() public settings!: IProjectSettings;

  public form!: FormGroup

  private readonly _DEFAULT_RAIL_SIZE: number = 7;

  public constructor(
    private _fb: UntypedFormBuilder,
    private _settingsService: SettingsService,
  ) {super()}

  public ngOnInit(): void {
    this.form = this._fb.group({
      title: [this.settings.title || SwitcherType.EU, [Validators.required, Validators.maxLength(72), Validators.pattern(/\S+/)]],
      type: [this.settings.type || SwitcherType.EU, Validators.required],
      isItemSize: this.settings.isItemSize || true,
      width: [this.settings.width || 0, [Validators.required, Validators.min(10), Validators.max(9999)]],
      height: [this.settings.height || 0, [Validators.required, Validators.min(20), Validators.max(9999)]],
      font: [this.settings.font || LabelFont.MONTSERRAT, Validators.required],
      position: [this.settings.position || LabelPosition.UNDER, Validators.required],
      moduleCount: [this.settings.moduleCount || this._DEFAULT_RAIL_SIZE, Validators.required],
    });

    this.form.controls['isItemSize'].valueChanges
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe((isItemSize: boolean) => {
        if (isItemSize) {
          this.form.controls['width'].patchValue(
            this.form.controls['width'].value / this.form.controls['size'].value
          );
          this.form.controls['height'].patchValue(
            this.form.controls['height'].value / this.form.controls['size'].value
          );
          this.form.controls['width'].addValidators(Validators.max(100));
          this.form.controls['height'].addValidators(Validators.max(100));

          return;
        }

        this.form.controls['width'].patchValue(
          this.form.controls['width'].value * this.form.controls['size'].value
        );
        this.form.controls['height'].patchValue(
          this.form.controls['height'].value * this.form.controls['size'].value
        );
        this.form.controls['width'].removeValidators(Validators.max(100));
        this.form.controls['width'].addValidators(Validators.max(9999));
        this.form.controls['height'].removeValidators(Validators.max(100));
        this.form.controls['height'].addValidators(Validators.max(9999));
      });
  }
}
