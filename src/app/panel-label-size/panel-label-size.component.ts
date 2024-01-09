import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'panel-label-size',
  templateUrl: './panel-label-size.component.html',
  host: { class: 'label-size' },
})
export class PanelLabelSizeComponent {
  @HostBinding('class.label-size--horizontal') @Input() public isHorizontal: boolean = false;
  @Input() public horizontalSize: number = 0;
  @Input() public verticalSize: number = 0;
}
