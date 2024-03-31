export class Color {
  private _r!: number | string;
  private _g!: number;
  private _b!: number;
  private _a!: number;

  private _isLight!: boolean;

  public get r(): number | string {
    return this._r;
  }

  public get g(): number {
    return this._g;
  }

  public get b(): number {
    return this._b;
  }

  public get a(): number {
    return this._a;
  }

  public constructor(r: number | string = 0, g: number = 0, b: number = 0, a: number = 1) {
    if (typeof r === 'string' && /^#[0-9a-f]{6}$/i.test(r)) {
      this.fromHex(`${r }`);
    } else {
      [this._r, this._g, this._b, this._a] = [r, g, b, a];
    }
  }

  public makeLight(): void {
    this._isLight = true;
  }

  public makeDark(): void {
    this._isLight = false;
  }

  public toHex(includeAlpha: boolean = false): string {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    return (
      `#${
      this._componentToHex(this._r)
      }${this._componentToHex(this._g)
      }${this._componentToHex(this._b)
      }${includeAlpha ? this._componentToHex(Math.round(this._a * 255)) : ''}`
    );
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  }

  public fromHex(hex: string): Color {
    const result: string[] | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
      hex,
    );
    if (result) {
      [this._r, this._g, this._b] = [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ];
      if (result[4]) {
        this._a = parseInt(result[4], 16);
      }
    }

    return this;
  }

  public toRgb(): string {
    return `${this._r },${ this._g },${ this._b}`;
  }

  public toRgba(opacity: number = 1): string {
    return `rgba(${this.toRgb()},${opacity})`;
  }

  public isLight(): boolean {
    return this._isLight;
  }

  private _componentToHex(c: number | string): string {
    if (typeof c !== 'number') {
      return '';
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const hex: string = c.toString(16);

    return hex.length === 1 ? `0${ hex}` : hex;
  }
}
