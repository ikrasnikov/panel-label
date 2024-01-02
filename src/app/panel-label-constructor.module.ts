import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { PanelLabelConstructorComponent } from './panel-label-constructor/panel-label-constructor.component';
import {
  PanelLabelConstructorHeaderComponent
} from './panel-label-constructor-header/panel-label-constructor-header.component';

@NgModule({
  declarations: [
    PanelLabelConstructorComponent,
    PanelLabelConstructorHeaderComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
  ],
  bootstrap: [PanelLabelConstructorComponent],
})
export class PanelLabelConstructorModule {}
