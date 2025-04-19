import type { TargetAndTransition } from 'motion/dist/react';

import { type RequiredPick } from '@/utils';

import type { IButtonProps, IButtonVariant } from '../models';

export const whileHover = (
  props: RequiredPick<IButtonProps, 'variant' | 'danger' | 'disabled'>
): TargetAndTransition | undefined => {
  const { variant, danger, disabled } = props;
  type VariantColor = Record<IButtonVariant, string>;
  if (!disabled) {
    return {
      backgroundColor: (
        {
          text: 'var(--fill-color-hover)',
          filled: danger
            ? 'var(--danger-color-hover)'
            : 'var(--primary-color-hover)',
          bordered: 'var(--fill-color-hover)',
        } as VariantColor
      )[variant],
    };
  }
};

export const whileTap = (
  props: RequiredPick<IButtonProps, 'variant' | 'danger' | 'disabled'>
): TargetAndTransition | undefined => {
  const { danger, variant, disabled } = props;
  type VariantColor = Record<IButtonVariant, string>;
  if (!disabled) {
    return {
      scale: 0.96,
      backgroundColor: (
        {
          text: 'var(--fill-color-active)',
          bordered: 'var(--fill-color-active)',
          filled: danger
            ? 'var(--danger-color-active)'
            : 'var(--primary-color-active)',
        } as VariantColor
      )[variant],
    };
  }
};

export const iAnimate = (
  props: RequiredPick<IButtonProps, 'variant' | 'danger' | 'disabled'>
): TargetAndTransition | undefined => {
  const { danger, disabled, variant } = props;
  switch (variant) {
    case 'text':
      if (danger) {
        if (disabled) {
          return {
            color: 'var(--danger-color-disabled)',
          };
        } else {
          return {
            color: 'var(--font-color-danger)',
          };
        }
      } else {
        if (disabled) {
          return {
            color: 'var(--font-color-disabled)',
          };
        }
      }
      break;
    case 'bordered': {
      if (danger) {
        if (disabled) {
          return {
            color: 'var(--danger-color-disabled)',
          };
        } else {
          return {
            color: 'var(--font-color-danger)',
          };
        }
      } else {
        if (disabled) {
          return {
            color: 'var(--font-color-disabled)',
          };
        } else {
          return {
            color: 'var(--font-size-06)',
            backgroundColor: 'var(--bg-color-warp)',
          };
        }
      }
    }
    case 'filled': {
      if (danger) {
        if (disabled) {
          return {
            color: 'var(--font-color-disabled)',
            backgroundColor: 'var(--danger-color-disabled)',
          };
        } else {
          return {
            color: 'var(--font-color-b8)',
            backgroundColor: 'var(--danger-color)',
          };
        }
      } else {
        if (disabled) {
          return {
            color: 'var(--font-color-disabled)',
            backgroundColor: 'var(--primary-color-disabled)',
          };
        } else {
          return {
            color: 'var(--font-color-b8)',
            backgroundColor: 'var(--primary-color)',
          };
        }
      }
    }
  }
  return undefined;
};
