import type { SVGMotionProps, Target } from 'motion/react';

import type { OmitOf } from '@/utils';

export type ISignType =
  | 'ban'
  | 'tick'
  | 'plus'
  | 'minus'
  | 'clock'
  | 'cross'
  | 'dollar'
  | 'helper'
  // | 'refresh'
  | 'informer'
  | 'magnifier'
  | 'arrowTop'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowBottom'
  | 'arrowDoubleTop'
  | 'arrowDoubleLeft'
  | 'arrowDoubleRight'
  | 'arrowDoubleBottom';

export interface ISignLineProps
  extends OmitOf<SVGMotionProps<SVGSVGElement>, 'animate'> {
  ring?: boolean;
  type?: ISignType;
  inline?: boolean;
  trigon?: boolean;
  animate?: Target;
}
