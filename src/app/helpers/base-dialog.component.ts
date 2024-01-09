import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from './base-component';

@Component({ template: '' })
export class BaseDialogComponent<T> extends BaseComponent implements OnDestroy {
  public get success$(): Observable<T> {
    return this._success$$.asObservable().pipe(takeUntil(this._destroy$$));
  }

  public get error$(): Observable<HttpErrorResponse | void> {
    return this._error$$.asObservable().pipe(takeUntil(this._destroy$$));
  }

  protected _error$$: Subject<HttpErrorResponse | void> = new Subject<HttpErrorResponse | void>();
  protected _success$$: Subject<T> = new Subject<T>();

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this._error$$.complete();
    this._success$$.complete();
  }
}
