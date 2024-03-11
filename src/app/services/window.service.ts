import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {
  public get window(): Window {
    return window;
  }
}