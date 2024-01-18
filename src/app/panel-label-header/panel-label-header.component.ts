import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ConstructorPageService } from '../services/constructor-page-service';

@Component({
  selector: 'panel-label-header',
  templateUrl: './panel-label-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'header-container' },
})
export class PanelLabelHeaderComponent {
  public constructor(
    private _constructorPageService: ConstructorPageService,
  ) {}

  public toggleSettings(): void {
    this._constructorPageService.toggleSettings()
  };

  public openPreview(): void {
    this._constructorPageService.openPreview()
  };
}
