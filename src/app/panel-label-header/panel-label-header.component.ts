import { ChangeDetectionStrategy, Component } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../helpers/base-component';
import { ConstructorPageService } from '../services/constructor-page-service';
import { ConstructorService } from '../services/constructor-service';
import { LanguageKey } from '../enums/settings.enum';
import { LanguageService } from '../services/language.service';
import { IProjectSettings } from '../../types/settings';

@Component({
  selector: 'panel-label-header',
  templateUrl: './panel-label-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'header-container' },
})
export class PanelLabelHeaderComponent extends BaseComponent {
  public readonly LANGUAGE_KEY_TRANSLATIONS: Record<LanguageKey, string> = this._languageService.LANGUAGE_KEY_TRANSLATIONS;
  public readonly SUPPORTED_LANGUAGES: LanguageKey[] = this._languageService.SUPPORTED_LANGUAGES;

  public language!: string;

  private _settings!: IProjectSettings;

  public constructor(
    private _constructorPageService: ConstructorPageService,
    private _constructorService: ConstructorService,
    private _languageService: LanguageService,
  ) {
    super();

    this._constructorService.getSettings$()
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe((settings: IProjectSettings) => {
        this._settings = settings;
        this._languageService.setLanguage(settings.language);
        this.language = this._languageService.LANGUAGE_KEY_INITIALS_TRANSLATIONS[settings.language];
      })
  }

  public toggleSettings(): void {
    this._constructorPageService.toggleSettings()
  };

  public openPreview(): void {
    this._constructorPageService.openPreview()
  };

  public downloadLabels(): void {
    this._constructorPageService.downloadLabels()
  };

  public setLanguage(language: LanguageKey): void {
    this._constructorService.updateSettings$({ ...this._settings, language})
  };
}
