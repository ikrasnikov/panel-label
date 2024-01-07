export interface ISwitcherItem {
  id: number;
  position: number;
  moduleSize: TModuleSize;
  color: string;
  icon: string;
  label: string;
}

export type TModuleSize = 1 | 2 | 3;