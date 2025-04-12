import type { HTMLMotionProps } from 'motion/react';

import type { FloatingPortalProps } from '@floating-ui/react';

import type { ReactTargetType } from '@/models';
import type { OmitOf } from '@/utils';

export interface IOverlayProps extends HTMLMotionProps<'div'> {
  /**
   * overlay will lock scrolling on the document body if is false.
   * @default false
   */
  scroll?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export interface IBackdropProps
  extends IOverlayProps,
    OmitOf<FloatingPortalProps, 'children' | 'root'> {
  root?: ReactTargetType;
  relative?: boolean;
  open?: boolean;
}
