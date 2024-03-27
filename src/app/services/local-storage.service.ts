import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  public setItem(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  public getItem(name: string): string | null {
    return localStorage.getItem(name);
  }
}