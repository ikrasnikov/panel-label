import { Observable } from 'rxjs';

import { IMap } from './map';

export interface IDialogData {
  title: string;
  body: string;
  buttonType: string;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action$: Observable<any>;
  submitIsHidden: boolean;
  image: string;
  large: boolean;
  medium: boolean;
  tourAnchorMap: IMap;
}
