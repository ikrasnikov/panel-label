import {
  BreakerColor,
  BreakerFontSizes,
  BreakerIcon,
  BreakerIconFontSizes,
  BreakerSize,
  BreakerType
} from '../enums/item.enum';
import { TStrictMap } from '../../types/map';

export const SWITCHER_SIZES_MAP: { [key: string]: BreakerSize } = {
  x1 : BreakerSize.ONE,
  x2 : BreakerSize.TWO,
  x3 : BreakerSize.THREE,
};

export const BREAKER_FONT_SIZES_MAP: { [key: number]: BreakerFontSizes } = {
  6: BreakerFontSizes.SIX,
  8: BreakerFontSizes.EIGHT,
  10: BreakerFontSizes.TEN,
  12: BreakerFontSizes.TWELVE,
  14: BreakerFontSizes.FOURTEEN,
  16: BreakerFontSizes.SIXTEEN,
  18: BreakerFontSizes.EIGHTEEN,
  20: BreakerFontSizes.TWENTY,
  22: BreakerFontSizes.TWENTY_TWO,
  24: BreakerFontSizes.TWENTY_FOUR,
  32: BreakerFontSizes.THIRTY_TWO,
  48: BreakerFontSizes.FORTY_EIGHT,
};

export const BREAKER_ICON_FONT_SIZES_MAP: { [key: number]: BreakerIconFontSizes } = {
  22: BreakerIconFontSizes.TWENTY_TWO,
  24: BreakerIconFontSizes.TWENTY_FOUR,
  26: BreakerIconFontSizes.TWENTY_SIX,
  28: BreakerIconFontSizes.TWENTY_EIGHT,
  30: BreakerIconFontSizes.THIRTY,
  32: BreakerIconFontSizes.THIRTY_TWO,
  34: BreakerIconFontSizes.THIRTY_FOUR,
  36: BreakerIconFontSizes.THIRTY_SIX,
  38: BreakerIconFontSizes.THIRTY_EIGHT,
  40: BreakerIconFontSizes.FORTY,
  48: BreakerIconFontSizes.FORTY_EIGHT,
  64: BreakerIconFontSizes.SIXTY_FOUR,
};

export const BREAKER_COLORS: BreakerColor[] = [
  BreakerColor.RED,
  BreakerColor.LIGHT_RED,
  BreakerColor.PINK,
  BreakerColor.DARK_PINK,
  BreakerColor.GREY,
  BreakerColor.DARK_GREEN,
  BreakerColor.GREEN,
  BreakerColor.LIGHT_GREEN,
  BreakerColor.SAND,
  BreakerColor.BROWN,
  BreakerColor.LIGHT_BROWN,
  BreakerColor.DARK_BLUE,
  BreakerColor.BLUE,
  BreakerColor.LIGHT_BLUE,
  BreakerColor.PURPLE,
];

export const BREAKER_ICONS: BreakerIcon[] = [
  BreakerIcon.HOME,
  BreakerIcon.BATHROOM,
  BreakerIcon.WASHING_MACHINE,
  BreakerIcon.DISHWASHER,
  BreakerIcon.SOCKETS,
  BreakerIcon.LAMP,
  BreakerIcon.LAMP_CIRCLE,
  BreakerIcon.LIGHT,
  BreakerIcon.BOLT,
  BreakerIcon.OFFLINE_BOLT,
  BreakerIcon.POWER,
  BreakerIcon.EV_STATION,
  BreakerIcon.HOUSE,
  BreakerIcon.MICROWAVE,
  BreakerIcon.KETTLE,
  BreakerIcon.OVEN_GEN,
  BreakerIcon.OVEN,
  BreakerIcon.GARAGE_HOME,
  BreakerIcon.GARAGE,
  BreakerIcon.DINING,
  BreakerIcon.HEAT_PUMP,
  BreakerIcon.BEDROOM_BABY,
  BreakerIcon.BEDROOM_PARENT,
  BreakerIcon.MODE_OFF_ON,
  BreakerIcon.LIVING,
  BreakerIcon.WATER_HEATER,
  BreakerIcon.AIR_PURIFIER_GEN,
  BreakerIcon.AIR_PURIFIER,
  BreakerIcon.COOKING,
  BreakerIcon.KITCHEN,
  BreakerIcon.AIRWARE,
  BreakerIcon.SWITCH,
  BreakerIcon.AC_UNIT,
  BreakerIcon.SKILLET_COOKTOP,
  BreakerIcon.MODE_FAN,
  BreakerIcon.GATE,
  BreakerIcon.SETTING_ALERT,
  BreakerIcon.LIGHT_GROUP,
  BreakerIcon.WALL_LAMP,
  BreakerIcon.EMOJI_OBJECT,
  BreakerIcon.WB_SUNNY,
];

export const BREAKER_TYPE_TRANSLATIONS_MAP: TStrictMap<BreakerType> = {
  [BreakerType.BREAKER]: 'BREAKER_DIALOG__TYPE_BREAKER',
};
