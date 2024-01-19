import { BreakerColor, BreakerSize, BreakerType } from '../app/enums/item.enum';

export interface ISwitcherItem {
  color: BreakerColor;
  fontSize: number;
  icon: string;
  iconFontSize: number;
  id: number;
  label: string;
  breakerSize: BreakerSize;
  position: number;
  type: BreakerType;
}