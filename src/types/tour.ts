import { MdMenuPlacement } from 'ngx-ui-tour-md-menu';

import { TourStepAnchorEnum } from '../app/enums/tour-steps.enum';

export interface ITourStep {
  anchorId: TourStepAnchorEnum,
  content: string,
  title: string,
  placement?: MdMenuPlacement,
  stepDimensions: { 'maxWidth': string },
  nextOnAnchorClick?: boolean;
  delayBeforeStepShow?: number;
  isAsync?: boolean;
  disableScrollToAnchor?: boolean
}