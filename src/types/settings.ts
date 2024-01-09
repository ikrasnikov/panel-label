import { LabelFont, LabelPosition, SwitcherType } from '../app/enums/settings.enum';

export interface IProjectSettings {
  font: LabelFont;
  height: number;
  id: number;
  isItemSize: boolean;
  position: LabelPosition;
  breakerCount: number;
  title: string;
  type: SwitcherType;
  width: number;
  userId: number;
}
