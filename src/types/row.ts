import { ISwitcherItem } from './item';

export interface ISwitcherRow {
  id: number;
  position: number;
  items: ISwitcherItem[];
}
