import { LabelFont, LabelPosition, SwitcherType } from '../app/enums/settings.enum';

export interface IProjectSettings {
  breakerCount: number;
  font: LabelFont;
  height: number;
  id: number;
  isItemSize: boolean;
  labelHeight: number;
  position: LabelPosition;
  title: string;
  type: SwitcherType;
  width: number;
  userId: number;
}
