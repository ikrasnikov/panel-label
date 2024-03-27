import { Injectable } from '@angular/core';

import { distinctUntilChanged, Observable, of, ReplaySubject } from 'rxjs';

import { LANGUAGE_TRANSLATIONS_MAP } from '../maps/language-translations-map';
import { LanguageKey } from '../enums/settings.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
  public readonly DEFAULT_LANGUAGE: LanguageKey = LanguageKey.EN;
  public readonly SUPPORTED_LANGUAGES: LanguageKey[] = [
    LanguageKey.BG,
    LanguageKey.EN,
    LanguageKey.RU,
    LanguageKey.UA,
  ];
  public readonly LANGUAGE_KEY_INITIALS_TRANSLATIONS: Record<LanguageKey, string> =
    LANGUAGE_TRANSLATIONS_MAP['languageInitialsTranslations'];
  public readonly LANGUAGE_KEY_TRANSLATIONS: Record<LanguageKey, string> =
    LANGUAGE_TRANSLATIONS_MAP['languageTranslations'];

  protected _languageSubject$$: ReplaySubject<LanguageKey> = new ReplaySubject<LanguageKey>(1);

  public constructor(private _translateService: TranslateService) {}

  public getLanguage$(): Observable<LanguageKey> {
    return this._languageSubject$$.pipe(distinctUntilChanged());
  }

  public initLanguage(): void {
    this._translateService.addLangs(this.SUPPORTED_LANGUAGES);
    this._translateService.setDefaultLang(this.getFilteredLanguage(this._translateService.getBrowserLang() as LanguageKey));
    this.setLanguage(this._translateService.getBrowserLang() as LanguageKey);

    this.getLanguage$().subscribe((language: LanguageKey) => {
      this.translateUse(language);
    });
  }

  public setLanguage(language: LanguageKey): void {
    if (!this._isAllowedLanguage(language)) {
      return;
    }

    this._languageSubject$$.next(language);
  }

  public getFilteredLanguage(language: LanguageKey): LanguageKey {
    const hasTranslation: boolean = this.SUPPORTED_LANGUAGES.some(
      (lang: LanguageKey) => lang === language,
    );

    if (!hasTranslation) {
      return this.DEFAULT_LANGUAGE;
    }

    return language;
  }

  public getTranslatedText(
    textTranslateKey: string,
    translateParams: { [key: string]: string | number } = {},
  ): string {
    if (!textTranslateKey) {
      return '';
    }

    return this._translateService.instant(textTranslateKey, translateParams);
  }

  public getTranslatedText$(
    textTranslateKey: string,
    translateParams: { [key: string]: string | number } = {},
  ): Observable<string> {
    if (!textTranslateKey) {
      return of('');
    }

    return this._translateService.get(textTranslateKey, translateParams);
  }

  public getTranslatedStream$(
    textTranslateKey: string | string[],
    translateParams: { [key: string]: string | number } = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<string | any> {
    if (!textTranslateKey) {
      return of('');
    }

    return this._translateService.stream(textTranslateKey, translateParams);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public translateUse(lang: LanguageKey): Observable<any> {
    return this._translateService.use(lang);
  }

  private _isAllowedLanguage(language: LanguageKey): boolean {
    return this.SUPPORTED_LANGUAGES.indexOf(language) > -1;
  }
}
