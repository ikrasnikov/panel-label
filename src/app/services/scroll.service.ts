import { Injectable } from '@angular/core';

import { PageScrollViews } from 'ngx-page-scroll-core';

@Injectable()
export class ScrollService {
  private _container!: PageScrollViews;

  public constructor() {}

  public setContainer(pageScrollingView: PageScrollViews): void {
    this._container = pageScrollingView;
  }

  public getContainer(): PageScrollViews {
    return this._container;
  }
}
