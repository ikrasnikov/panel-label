import { BreakerSize, BreakerType } from '../app/enums/item.enum';

export interface ISwitcherItem {
  color: string;
  fontSize: string;
  icon: string;
  id: number;
  label: string;
  breakerSize: BreakerSize;
  position: number;
  type: BreakerType;
}