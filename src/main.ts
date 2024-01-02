import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PanelLabelConstructorModule } from './app/panel-label-constructor.module';

platformBrowserDynamic()
  .bootstrapModule(PanelLabelConstructorModule)
  .catch((err) => console.error(err));
