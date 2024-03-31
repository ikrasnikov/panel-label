import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { coerceCssPixelValue } from '@angular/cdk/coercion';

import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Color } from '../helpers/color';
import { colors } from './colors.constant';
import { ColorService } from '../services/color.service';

// Avatar Entity options
export interface AvatarEntity {
  id: number;
  avatar?: string | File | null;
  image?: string;
  initials?: string;
  email?: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

export interface AvatarIcon {
  icon: string;
  view: 'error' | 'limpid';
}

/** Avatar size */
export type AvatarSize = 's' | 'm' | 'l';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'avatar',
    role: 'img',
    '[class.avatar--interactive]': 'clickable',
    '[attr.tabindex]': 'clickable ? 0 : null',
    '[class.avatar--circle]': 'isCircle',
    '[class.avatar--square]': '!isCircle',
    '[class.avatar--muted]': 'isMuted',
  },
})
export class AvatarComponent {
  /**
   * Avatar entity
   */
  @Input()
  public set entity(entity: AvatarEntity) {
    this._entity = entity;
    this.initials = this._getInitials(entity);
    if (this.initials) {
      this.background = this._getBackgroundColor(entity);
    }
  }

  public get entity(): AvatarEntity {
    return this._entity;
  }

  /**
   * Avatar size
   */
  @Input()
  public size: AvatarSize = 'm';

  /**
   * If the avatar should be in a circle shape.
   */
  @Input()
  public isCircle: boolean = true;

  /**
   * If the avatar should have muted state
   */
  @Input()
  public isMuted: boolean = false;

  /**
   * If avatar should behave as a clickable element
   */
  @Input()
  public set clickable(clickable: boolean) {
    this._clickable = clickable;
    this._onClickableChange();
  }
  public get clickable(): boolean {
    return this._clickable;
  }

  /**
   * If the avatar should has custom width
   */
  @Input()
  public set width(width: number) {
    this._elementRef.nativeElement.style.width = width ? coerceCssPixelValue(width) : '';
  }

  /**
   * If the avatar should has custom height
   */
  @Input()
  public set height(height: number) {
    this._elementRef.nativeElement.style.height = height ? coerceCssPixelValue(height) : '';
  }

  /**
   * If the avatar should has different view the icon accepts config object
   */
  @Input('icon')
  public set currentIcon(value: string | AvatarIcon) {
    if (!value) {
      return;
    }

    if (typeof value === 'string') {
      this.icon = value;

      return;
    }

    this.icon = value.icon;
    this.iconViewClass = `avatar__mat-icon--${value.view}`;
  }

  private _clickable: boolean = false;
  /** @hidden */
  public background: string = 'transparent';

  /** @hidden */
  public initials: string = '';

  /** @hidden */
  public iconViewClass: string = '';

  /** @hidden */
  public icon: string = '';

  /** @hidden */
  @HostBinding('class')
  public get avatarSizeClass(): string {
    return `avatar--${this.size || 'm'}`;
  }

  /** @hidden */
  private _entity!: AvatarEntity;

  /** @hidden */
  private _keydownSubscription: Subscription = new Subscription();

  /** @hidden */
  public constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _color: ColorService,
  ) {}

  /** @hidden */
  private _getBackgroundColor(entity: AvatarEntity): string {
    if (!entity) {
      return '';
    }
    const color: Color = this._color.generate(entity.id, colors);
    return color.toRgba();
  }

  /** @hidden */
  private _getInitials(entity: AvatarEntity): string {
    if (!entity) {
      return '';
    }

    const { initials, firstName, lastName, fullName, name, email }: AvatarEntity = entity;

    const shortOrLongName: string =
      initials ||
      fullName ||
      [firstName, lastName].join(' ').trim() ||
      name ||
      (email || '').slice(0, 2);

    const [start, second]: string[] = shortOrLongName.split(/\s+/);

    return (second ? start[0] + second[0] : start.slice(0, 2)).toUpperCase();
  }

  private _onClickableChange(): void {
    this._keydownSubscription?.unsubscribe();

    if (this._clickable) {
      this._keydownSubscription = fromEvent<KeyboardEvent>(
        this._elementRef.nativeElement,
        'keydown',
      )
        .pipe(filter((event: KeyboardEvent) => event.keyCode === ENTER || event.keyCode === SPACE))
        .subscribe((event: KeyboardEvent) => {
          event.preventDefault();
          // Trigger click event
          this._elementRef.nativeElement.dispatchEvent(new MouseEvent('click'));
        });
    }
  }
}
