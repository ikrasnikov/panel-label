import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../base-component';

@Component({
  selector: 'custom-confirmation-dialog',
  templateUrl: './custom-confirmation-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'component-wrapper' },
})
export class CustomConfirmationDialogComponent extends BaseComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public action$: Observable<any> = of(null);
  @Input() public large: boolean = false;
  @Input() public medium: boolean = false;
  @Input() public buttonType: string = 'primary';
  @Input() public submitButtonLabel: string = '';
  @Input() public cancelButtonLabel: string = '';
  @Input() public submitId: string = '';
  @Input() public submitIsHidden: boolean = false;
  @Input() public isSubmitDisabled: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() public success: EventEmitter<any> = new EventEmitter();
  @Output() public error: EventEmitter<HttpErrorResponse> = new EventEmitter();
  @Output() public cancelled: EventEmitter<void> = new EventEmitter();

  public imageUrl: string | null = null;
  public imageTheme: string | null = null;
  public imagePosition: string | null = null;
  // need to append a timestamp to the .gif to force it to re-play on
  // consequent dialog openings
  public timestamp: number | null = null;
  @Input() public set image(image: string) {
    if (!image) {
      return;
    }

    this.imageUrl = image;
  }

  public isProcessing: boolean = false;

  public constructor() {
    super();
    this.timestamp = Date.now();
  }

  @HostListener('window:keydown.control.enter', ['$event'])
  public onKeyboardSendPressed(event: KeyboardEvent): void {
    event.preventDefault();
    this.confirm(event);
  }

  public confirm(event: Event): void {
    // For some reason dialog confirmation triggered form submission in the Admin course editing
    // So I had to prevent propagation this event further
    event.stopPropagation();

    if (this.isSubmitDisabled || this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    this.action$.pipe(takeUntil(this._destroy$$)).subscribe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data: any) => {
        this.isProcessing = false;
        this.success.emit(data);
      },
      (error: HttpErrorResponse) => {
        this.isProcessing = false;
        this.error.emit(error);
      },
    );
  }

  public cancel(): void {
    this.cancelled.emit();
  }
}
