import { Component } from '@angular/core';

import { LanguageService } from '../services/language.service';

@Component({
  selector: 'panel-label-constructor',
  templateUrl: './panel-label-constructor.component.html',
  host: { class: 'app' },
})
export class PanelLabelConstructorComponent {
  public constructor(
    private _languageService: LanguageService,
  ) {
    this._languageService.initLanguage();
  }
}
