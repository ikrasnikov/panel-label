import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'panel-label-header',
  templateUrl: './panel-label-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'header' },
})
export class PanelLabelHeaderComponent {
  @Output() public toggleSettings: EventEmitter<void> = new EventEmitter();
}
