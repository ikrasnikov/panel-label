import { Injectable } from '@angular/core';

import { map, merge, Observable, of, Subject, switchMap, take, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TourService } from 'ngx-ui-tour-md-menu';

import { IMap } from '../../types/map';
import { ITourStep } from '../../types/tour';
import { LanguageService } from './language.service';
import { LocalStorageService } from './local-storage.service';
import { TOUR_STEPS } from '../maps/tour-steps-map';

@Injectable()
export class UserTourService {
  public _nextStep$$: Subject<void> = new Subject();

  private readonly _TOUR_SETTINGS: {
    centerAnchorOnScroll: boolean,
    disablePageScrolling: boolean,
    enableBackdrop: boolean,
    smoothScroll: boolean,
    endBtnTitle: string,
    prevBtnTitle: string,
    nextBtnTitle: string,
  } = {
    centerAnchorOnScroll: false,
    disablePageScrolling: true,
    enableBackdrop: true,
    smoothScroll: true,
    endBtnTitle: '__BUTTON_END',
    nextBtnTitle: '__BUTTON_NEXT',
    prevBtnTitle: '__BUTTON_PREVIOUS',
  };

  private readonly _TOUR_STEPS: ITourStep[] = TOUR_STEPS;

  public constructor(
    private _languageService: LanguageService,
    private _localStorageService: LocalStorageService,
    private _tourService: TourService,
  ) {
  }
  public init(): Observable<void | null> {
    if (this._localStorageService.getItem('panelLabelOnboardingFinished') === 'true') {
      return of();
    }

    let currentTranslationsMap: IMap;
    let isNextStep: boolean = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this._tourService as any)['subscribeToNavigationStartEvent'] = () => {};

    let close$: Observable<void> = this._tourService.end$
      .pipe(
        tap(() => {
          this._localStorageService.setItem('panelLabelOnboardingFinished', 'true')
        }),
        take(1)
      );

    let translationStream$: Observable<null> = this._languageService.getTranslatedStream$(this._getTranslationKeys())
      .pipe(
        tap((translationsMap: IMap) => {
          if (!currentTranslationsMap) {
            this._tourService.initialize(
              this._getTourSteps(translationsMap),
              {
                ...this._TOUR_SETTINGS,
                endBtnTitle: translationsMap[this._TOUR_SETTINGS.endBtnTitle],
                nextBtnTitle: translationsMap[this._TOUR_SETTINGS.nextBtnTitle],
                prevBtnTitle: translationsMap[this._TOUR_SETTINGS.prevBtnTitle],
              }
            );
            this._tourService.start();
          }

          if (currentTranslationsMap && this._isInitRequired(currentTranslationsMap, translationsMap)) {
            this._tourService.pause();
            this._tourService.initialize(
              this._getTourSteps(translationsMap),
              {
                ...this._TOUR_SETTINGS,
                endBtnTitle: translationsMap[this._TOUR_SETTINGS.endBtnTitle],
                nextBtnTitle: translationsMap[this._TOUR_SETTINGS.nextBtnTitle],
                prevBtnTitle: translationsMap[this._TOUR_SETTINGS.prevBtnTitle],
              }
            );
            this._tourService.start();
            isNextStep = true;
          }

          currentTranslationsMap = translationsMap;
        }),
        switchMap(() => this._nextStep$$),
        switchMap(() => this._tourService.stepShow$),
        tap(() => {
          if (isNextStep) {
            this._tourService.next();
            isNextStep = false;
          }
        }),
        map(() => null),
        takeUntil(this._tourService.end$)
      );

    return merge(close$, translationStream$);
  }

  public nextStep(): void {
    this._nextStep$$.next();
  }

  public getIsStarted$(): Observable<void> {
    return this._tourService.start$;
  }

  public getIsEnded$(): Observable<void> {
    return this._tourService.end$;
  }

  private _getTranslationKeys(): string[] {
    const translationKeys: string[] = [];

    this._TOUR_STEPS.forEach((step: ITourStep) => {
      translationKeys.push(step.content);
      translationKeys.push(step.title);
    });

    translationKeys.push(this._TOUR_SETTINGS.endBtnTitle);
    translationKeys.push(this._TOUR_SETTINGS.nextBtnTitle);
    translationKeys.push(this._TOUR_SETTINGS.prevBtnTitle);

    return translationKeys;
  }

  private _getTourSteps(translationsMap: IMap): ITourStep[] {
    return this._TOUR_STEPS.map((step: ITourStep) => ({
      ...step,
      content: translationsMap[step.content],
      title: translationsMap[step.title],
    }));
  }

  private _isInitRequired(currentTranslationsMap: IMap, translationsMap: IMap): boolean {
    return Object.keys(currentTranslationsMap).some((currentTranslationsMapKey: string) =>
      currentTranslationsMap[currentTranslationsMapKey] !== translationsMap[currentTranslationsMapKey]
    );
  }
}