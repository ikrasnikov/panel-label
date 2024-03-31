import { LanguageKey } from '../enums/settings.enum';
import { TStrictMap } from '../../types/map';

export const LANGUAGE_TRANSLATIONS_MAP: { [key: string]: TStrictMap<LanguageKey> } = {
  languageTranslations: {
    [LanguageKey.BG]: '__LANGUAGE_BG',
    [LanguageKey.EN]: '__LANGUAGE_EN',
    [LanguageKey.RU]: '__LANGUAGE_RU',
    [LanguageKey.UA]: '__LANGUAGE_UA',
  },
  languageInitialsTranslations: {
    [LanguageKey.BG]: '__LANGUAGE_INITIALS_BG',
    [LanguageKey.EN]: '__LANGUAGE_INITIALS_EN',
    [LanguageKey.RU]: '__LANGUAGE_INITIALS_RU',
    [LanguageKey.UA]: '__LANGUAGE_INITIALS_UA',
  },
  nativeLanguageTitles: {
    [LanguageKey.BG]: 'Български',
    [LanguageKey.EN]: 'English',
    [LanguageKey.RU]: 'Русский',
    [LanguageKey.UA]: 'Українська',
  },
};
