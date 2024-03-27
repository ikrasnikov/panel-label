import { ChangeDetectionStrategy, Component } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../helpers/base-component';
import { ConstructorPageService } from '../services/constructor-page-service';
import { LanguageKey } from '../enums/settings.enum';
import { LanguageService } from '../services/language.service';
import { TourStepAnchorEnum } from '../enums/tour-steps.enum';
import { UserTourService } from '../services/user-tour.service';

@Component({
  selector: 'panel-label-header',
  templateUrl: './panel-label-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'header-container' },
})
export class PanelLabelHeaderComponent extends BaseComponent {
  public readonly TOUR_ANCHOR_LANGUAGE: TourStepAnchorEnum = TourStepAnchorEnum.HEADER_LANGUAGE;
  public readonly TOUR_ANCHOR_SETTINGS: TourStepAnchorEnum = TourStepAnchorEnum.HEADER_SETTINGS;
  public readonly TOUR_ANCHOR_PREVIEW: TourStepAnchorEnum = TourStepAnchorEnum.HEADER_PREVIEW;
  public readonly TOUR_ANCHOR_DOWNLOAD: TourStepAnchorEnum = TourStepAnchorEnum.HEADER_DOWNLOAD;
  public readonly LANGUAGE_KEY_TRANSLATIONS: Record<LanguageKey, string> = this._languageService.LANGUAGE_KEY_TRANSLATIONS;
  public readonly SUPPORTED_LANGUAGES: LanguageKey[] = this._languageService.SUPPORTED_LANGUAGES;

  public language: string = '';

  public constructor(
    private _constructorPageService: ConstructorPageService,
    private _languageService: LanguageService,
    private _userTourService: UserTourService,
  ) {
    super();

    this._languageService.getLanguage$()
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe((language: LanguageKey) => {
        this.language = this._languageService.LANGUAGE_KEY_INITIALS_TRANSLATIONS[language];
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
    this._languageService.setLanguage(language);
    this._userTourService.nextStep();
  };
}
