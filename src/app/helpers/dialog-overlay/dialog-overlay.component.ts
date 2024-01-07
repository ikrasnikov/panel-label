import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dialog-overlay',
  templateUrl: './dialog-overlay.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'component-wrapper' },
})
export class DialogOverlayComponent {
  @Input() public isProcessing: boolean | null = false;

  @Output() public closed: EventEmitter<void> = new EventEmitter();

  public isClickedInside: boolean = false;

  public checkAndClose(): void {
    if (this.isProcessing) {
      return;
    }

    if (!this.isClickedInside) {
      this.closed.emit();
    }

    this.isClickedInside = false;
  }
}
