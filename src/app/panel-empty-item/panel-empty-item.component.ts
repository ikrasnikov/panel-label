import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'panel-empty-item',
  templateUrl: './panel-empty-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'empty-item' },
})
export class PanelEmptyItemComponent {}
