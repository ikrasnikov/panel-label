import { ISwitcherItem } from './item';

export interface ISwitcherRow {
  id: number;
  items: ISwitcherItem[];
  position: number;
  projectId: number,
}
