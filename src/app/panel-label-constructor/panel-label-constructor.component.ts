import { Component } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../helpers/base-component';
import { LanguageService } from '../services/language.service';
import { UserTourService } from '../services/user-tour.service';

@Component({
  selector: 'panel-label-constructor',
  templateUrl: './panel-label-constructor.component.html',
  host: { class: 'app' },
})
export class PanelLabelConstructorComponent extends BaseComponent {

  public constructor(
    private _languageService: LanguageService,
    private _userTourService: UserTourService,
  ) {
    super();

    this._languageService.initLanguage();
    this._userTourService.init()
      .pipe(takeUntil(this._destroy$$))
      .subscribe();
  }
}
