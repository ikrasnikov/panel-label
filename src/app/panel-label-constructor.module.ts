import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { panelLabelConstructorRouter } from './panel-label-constructor.routes';

// import { AvatarComponent } from './avatar/avatar.component';
import { BaseDialogComponent } from './helpers/base-dialog.component';
import { BreakerDialogComponent } from './breaker-dialog/breaker-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConstructorPageService } from './services/constructor-page-service';
import { ConstructorService } from './services/constructor-service';
// import { ColorService } from './services/color.service';
import {
  CustomConfirmationDialogComponent
} from './helpers/custom-confirmation-dialog/custom-confirmation-dialog.component';
import { DialogOverlayComponent } from './helpers/dialog-overlay/dialog-overlay.component';
import { HtmlToImageService } from './services/html-to-image-service';
import { LanguageService } from './services/language.service';
import { PanelEmptyItemComponent } from './panel-empty-item/panel-empty-item.component';
import { PanelLabelConstructorComponent } from './panel-label-constructor/panel-label-constructor.component';
import { PanelLabelContentComponent } from './panel-label-content/panel-label-content.component';
import { PanelLabelHeaderComponent } from './panel-label-header/panel-label-header.component';
import { PanelLabelItemComponent } from './panel-label-item/panel-label-item.component';
import { PanelLabelPreviewDialogComponent } from './panel-label-preview-dialog/panel-label-preview-dialog.component';
import { PanelLabelRowComponent } from './panel-label-row/panel-label-row.component';
import { PanelLabelSettingsComponent } from './panel-label-settings/panel-label-settings.component';
import { PanelLabelSizeComponent } from './panel-label-size/panel-label-size.component';
import { PrintContentComponent } from './print-content/print-content.component';
import { ScrollService } from './services/scroll.service';
import { SettingsService } from './services/settings-service';
import { SnackBarContentComponent } from './snackbar/snackbar-content.component';
import { SnackBarService } from './services/snackbar.service';
import { WindowService } from './services/window.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CdkScrollableModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTooltipModule,
    panelLabelConstructorRouter,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    // AvatarComponent,
    BaseDialogComponent,
    BreakerDialogComponent,
    ConfirmationDialogComponent,
    CustomConfirmationDialogComponent,
    DialogOverlayComponent,
    PanelEmptyItemComponent,
    PanelLabelConstructorComponent,
    PanelLabelContentComponent,
    PanelLabelHeaderComponent,
    PanelLabelItemComponent,
    PanelLabelPreviewDialogComponent,
    PanelLabelRowComponent,
    PanelLabelSettingsComponent,
    PanelLabelSizeComponent,
    PrintContentComponent,
    SnackBarContentComponent,
  ],
  providers: [
    ConstructorPageService,
    ConstructorService,
    // ColorService,
    HtmlToImageService,
    LanguageService,
    ScrollService,
    SettingsService,
    SnackBarService,
    TranslateService,
    WindowService,
  ],
  bootstrap: [PanelLabelConstructorComponent],
})
export class PanelLabelConstructorModule {}
