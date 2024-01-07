import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { ISnackBarContentData, SnackBarContentComponent } from '../snackbar/snackbar-content.component';

export interface ISnackBarMessageOptions {
  // Snackbar message text or html
  message: string;
  // Action button label
  action?: string;
  // Show close button if "action" is not specified
  showCloseBtn?: boolean;
  // Show inprogress state
  inProgress?: boolean;
  // Message popup duration
  duration?: number;
  // Snackbar color theme
  type: 'info' | 'warn';

  translateParams?: { [key: string]: string | number };
}

@Injectable()
export class SnackBarService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly _duration: number = 10000;

  public constructor(private _snackBar: MatSnackBar, private _tranlsateService: TranslateService) {}

  public showMessage(
    options: Omit<ISnackBarMessageOptions, 'type'>,
  ): MatSnackBarRef<SnackBarContentComponent> {
    return this._show({ ...options, type: 'info' });
  }

  public showError(
    options: Omit<ISnackBarMessageOptions, 'type'> = {
      message: 'Something went wrong. Please try again',
    },
  ): MatSnackBarRef<SnackBarContentComponent> {
    return this._show({ ...options, type: 'warn' });
  }

  private _show(options: ISnackBarMessageOptions): MatSnackBarRef<SnackBarContentComponent> {
    const data: ISnackBarContentData = {
      message$: this._tranlsateService.stream(options.message, options.translateParams),
      action: options.action,
      inProgress: options.inProgress,
      showCloseBtn: options.showCloseBtn ?? true,
      type: options.type,
    };
    return this._snackBar.openFromComponent(SnackBarContentComponent, {
      panelClass: ['snackbar-container', `snackbar-container--${data.type}`],
      data,
      duration: options.duration ?? this._duration,
    });
  }
}
