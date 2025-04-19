import type { PropsWithChildren } from 'react';
import type { HTMLMotionProps } from 'motion/react';

import type { OmitOf } from '@/utils';

import type { IPanelRenders, IPanelState } from '../../panel';

export interface ICardState extends IPanelState {}

export interface ICardProps
  extends Partial<ICardState>,
    PropsWithChildren,
    OmitOf<HTMLMotionProps<'div'>, 'children' | 'title'> {
  ref?: React.RefObject<HTMLDivElement | null>;
  maxTilt?: number;
  tiltTrigger?: 'mouse' | 'touch' | 'pointer';
  collapsible?: boolean;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  variant?: 'filled' | 'bordered';
  renders?: IPanelRenders;
  onOpenChange?: (open: boolean) => void;
}
