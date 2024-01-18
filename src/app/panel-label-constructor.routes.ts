import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PanelLabelContentComponent } from './panel-label-content/panel-label-content.component';

export const panelLabelConstructorRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PanelLabelContentComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      },
    ]
  },
];

export const panelLabelConstructorRouter: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(panelLabelConstructorRoutes);
