import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { combineLatest, takeUntil } from 'rxjs';

import { BaseComponent } from '../helpers/base-component';
import { ConstructorService } from '../services/constructor-service';
import { ISwitcherRow } from '../../types/row';
import { IProjectSettings } from '../../types/settings';
import { SnackBarService } from '../services/snackbar.service';

@Component({
  selector: 'panel-label-content',
  templateUrl: './panel-label-content.component.html',
  host: { class: 'constructor' },
})
export class PanelLabelContentComponent extends BaseComponent {
  @ViewChild('drawer') public matDrawer!: MatDrawer;

  public rows: ISwitcherRow[] = [];
  public settings!: IProjectSettings
  public horizontalSize: number = 0;
  public verticalSize: number = 0;

  public constructor(
    private _constructorService: ConstructorService,
    private _snackBarService: SnackBarService,
  ) {
    super();
    combineLatest(
      this._constructorService.getRows(),
      this._constructorService.getSettings()
    )
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(([rows, settings]: [ISwitcherRow[], IProjectSettings]) => {
        this.rows = rows;
        this.settings = settings;

        this.horizontalSize = settings.isItemSize
          ? this._getRowSize(this.settings.width, this.settings.moduleCount)
          : this.settings.width;

        this.verticalSize = settings.isItemSize
          ? this._getRowSize(this.settings.height, this.rows.length)
          : this.settings.height;
      });
  }

  public toggleSettings(): void {
    this.matDrawer.toggle();
  }

  public saveSettings(settings: IProjectSettings): void {
    this._constructorService.updateSettings(settings)
      .pipe(
        takeUntil(this._destroy$$)
      )
      .subscribe(() => {
        this._snackBarService.showMessage({ message: `${settings.title} settings successfully updated` });
        this.matDrawer.close();
      });
  }

  private _getRowSize(size: number, moduleCount: number): number {
    return size * moduleCount;
  }
}
