import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ConstructorService } from './services/constructor-service';
import { PanelEmptyItemComponent } from './panel-empty-item/panel-empty-item.component';
import { PanelLabelConstructorComponent } from './panel-label-constructor/panel-label-constructor.component';
import { PanelLabelContentComponent } from './panel-label-content/panel-label-content.component';
import { PanelLabelHeaderComponent } from './panel-label-header/panel-label-header.component';
import { PanelLabelItemComponent } from './panel-label-item/panel-label-item.component';
import { PanelLabelRowComponent } from './panel-label-row/panel-label-row.component';
import { PanelLabelSettingsComponent } from './panel-label-settings/panel-label-settings.component';
import { PanelLabelSizeComponent } from './panel-label-size/panel-label-size.component';
import { SettingsService } from './services/settings-service';
import { SnackBarContentComponent } from './snackbar/snackbar-content.component';
import { SnackBarService } from './services/snackbar.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
  ],
  declarations: [
    PanelEmptyItemComponent,
    PanelLabelConstructorComponent,
    PanelLabelContentComponent,
    PanelLabelHeaderComponent,
    PanelLabelItemComponent,
    PanelLabelRowComponent,
    PanelLabelSettingsComponent,
    PanelLabelSizeComponent,
    SnackBarContentComponent,
  ],
  providers: [
    ConstructorService,
    SettingsService,
    SnackBarService,
    TranslateService,
  ],
  bootstrap: [PanelLabelConstructorComponent],
})
export class PanelLabelConstructorModule {}
