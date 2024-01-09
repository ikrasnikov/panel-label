import { Component } from '@angular/core';

@Component({
  selector: 'panel-label-constructor',
  templateUrl: './panel-label-constructor.component.html',
})
export class PanelLabelConstructorComponent {
  public test: number[] = Array.from(
    { length: 80},
    (_, i: number) => i + 1
  );
}
