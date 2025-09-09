import type { HTMLMotionProps, TargetAndTransition } from 'motion/react';

export interface ISVGWrapProps extends HTMLMotionProps<'i'> {
  x?: string | number;
  y?: string | number;
  animate?: TargetAndTransition;
}
