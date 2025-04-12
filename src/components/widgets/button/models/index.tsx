import type { HTMLMotionProps } from 'motion/react';

import type { OmitOf } from '@/utils';

import type { ControlUISize } from '../../control';

type MotionButtonProps = React.PropsWithChildren &
  OmitOf<HTMLMotionProps<'button'>, 'children'>;

export interface IButtonProps extends MotionButtonProps {
  capsule?: boolean;
  danger?: boolean;
  debounce?: boolean | number;
  icon?: React.ReactNode;
  isFullWidth?: boolean;
  isLoading?: boolean;
  size?: ControlUISize;
  variant?: 'filled' | 'bordered' | 'text';
  wave?: boolean;
}
