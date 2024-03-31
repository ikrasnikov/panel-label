/**
 *  get direct keys for enum
 *  or 'keyof' keys for object
 */
type ExtractKeys<T> = T extends string | number ? T : keyof T;

export interface IMap<TValue = string> {
  [key: string | number]: TValue;
}

export type TStrictMap<TKeys, TValue = string> = {
  [key in ExtractKeys<TKeys>]: TValue;
};

export type TExcludingMap<TKeys, TOmitKeys, TValue = string> = {
  [key in Exclude<ExtractKeys<TKeys>, TOmitKeys>]: TValue;
};

export type TPartialMap<TKeys, TValue = string> = Partial<TStrictMap<TKeys, TValue>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TImplicitMap = IMap<any>;
