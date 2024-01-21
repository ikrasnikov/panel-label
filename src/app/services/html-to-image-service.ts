import { Injectable } from '@angular/core';

import * as htmlToImage from 'html-to-image';
import { from, Observable } from 'rxjs';

@Injectable()
export class HtmlToImageService {
  public getPngFromHtml$(preview: HTMLElement): Observable<string> {
    return from(htmlToImage.toPng(preview));
  }
}