import type { Target, Transition } from 'motion/react';
import { isString, merge, pipe } from 'remeda';

import { size2px } from '@/utils';

import type { IChipProps } from '../models';

export const transition: Transition = { duration: 0.1 };

export const initial: Target = { opacity: 0, x: -size2px(4) };

export const iAnimate = ({
  color,
  variant,
  disabled,
}: Pick<IChipProps, 'color' | 'variant' | 'disabled'>) => {
  return pipe(
    {
      x: 0,
      opacity: 1,
    } as Target,
    merge(
      !disabled &&
        isString(color) &&
        variant === 'bordered' && {
          borderColor: `currentColor`,
          color: `rgb(var(--${color}-color-600) / 1)`,
        }
    ),
    merge(
      !disabled &&
        isString(color) &&
        variant === 'filled' && {
          borderColor: 'transparent',
          color: 'var(--font-color-b8)',
          backgroundColor: `rgb(var(--${color}-color-300) / 1)`,
        }
    )
  );
};
