import { Injectable } from '@angular/core';

import { LabelFont, LabelPosition, SwitcherType } from '../enums/settings.enum';

@Injectable()
export class SettingsService {
  public readonly SWITCHER_TYPES: SwitcherType[] = [
    SwitcherType.EU,
    SwitcherType.US
  ];

  public readonly LABEL_FONTS: LabelFont[] = [
    LabelFont.ALEGREYA,
    LabelFont.ALEGREYA_SANS,
    LabelFont.ARCHIVO_NARROW,
    LabelFont.BIO_RHYME,
    LabelFont.CARDO,
    LabelFont.CHIVO,
    LabelFont.CORMORANT,
    LabelFont.DM_SANS,
    LabelFont.ECZAR,
    LabelFont.FIRA_SANS,
    LabelFont.IBM_PLEX_SANS,
    LabelFont.INCONSOLATA,
    LabelFont.INKNUT_ANTIQUA,
    LabelFont.INTER,
    LabelFont.KARLA,
    LabelFont.LATO,
    LabelFont.LIBRE_BAKSERVILLE,
    LabelFont.LIBRE_FRANKLIN,
    LabelFont.LORA,
    LabelFont.MANROPE,
    LabelFont.MERRIWEATHER,
    LabelFont.MONTSERRAT,
    LabelFont.NEUTON,
    LabelFont.OPEN_SANS,
    LabelFont.PLAYFAIR_DISPLAY,
    LabelFont.POPPINS,
    LabelFont.PROZA_LIBRE,
    LabelFont.PT_SANS,
    LabelFont.PT_SERIF,
    LabelFont.RALEAY,
    LabelFont.ROBOTO,
    LabelFont.ROBOTO_SLAB,
    LabelFont.RUBIK,
    LabelFont.SOURCE_SANS_PRO,
    LabelFont.SOURCE_SERIF_PRO,
    LabelFont.SPACE_GROTESK,
    LabelFont.SPACE_MONO,
    LabelFont.SPECTRAL,
    LabelFont.SYNE,
    LabelFont.WORK_SANS,
  ];

  public readonly LABEL_POSITION: LabelPosition[] = [
    LabelPosition.ABOVE,
    LabelPosition.LEFT,
    LabelPosition.RIGHT,
    LabelPosition.UNDER,
  ];
}