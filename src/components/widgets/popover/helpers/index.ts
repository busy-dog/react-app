import { capitalize } from 'remeda';

import type { Placement } from '@floating-ui/react';
import { arrow, flip, hide, offset, shift, size } from '@floating-ui/react';

import { compact, iFindElement } from '@/utils';

import type {
  ApplyFloatingStyle,
  IPopoverProps,
  MiddlewareOpts,
} from '../models';

const GAP = 2;

export const ARROW_HEIGHT = 8;

export const ARROW_RADIUS = 2;

const isVertical = (placement: Placement) => {
  switch (placement) {
    case 'top':
    case 'top-end':
    case 'top-start':
    case 'bottom':
    case 'bottom-end':
    case 'bottom-start':
      return true;
    case 'left':
    case 'left-end':
    case 'left-start':
    case 'right':
    case 'right-end':
    case 'right-start':
      return false;
    default:
      return false;
  }
};

export const iFill = (variant?: IPopoverProps['variant']) => {
  switch (variant) {
    case 'tooltip':
      return 'var(--bg-color-tip)';
    case 'confirm':
      return 'var(--bg-color-tip)';
    default:
      return 'var(--bg-color-warp)';
  }
};

export const iFloatingMaxSize = (
  params: Parameters<ApplyFloatingStyle>[0],
  root?: HTMLElement | null,
  mode: 'width' | 'height' = 'width'
) => {
  const name = capitalize(mode);
  const { rects, placement } = params;
  const { floating } = params.elements;

  const referenceSize = rects.reference[mode];
  const availableSize = params[`available${name}`];
  const rootSize = root?.[`client${name}`] ?? Infinity;
  const effectiveSize = Math.max(availableSize, referenceSize);

  const isMainAxis = isVertical(placement)
    ? mode === 'height'
    : mode === 'width';

  if (effectiveSize > 0) {
    if (!isMainAxis) {
      return Math.min(rootSize, effectiveSize);
    }
    if (isMainAxis) {
      const scrollSize = floating[`scroll${name}`];
      if (effectiveSize < scrollSize) {
        return effectiveSize;
      }
    }
  }
  return Math.max(rootSize, effectiveSize);
};

export const middlewares = ({
  root,
  iArrow,
  variant,
  onApplyFloatingStyle,
}: MiddlewareOpts) => {
  return [
    offset({
      mainAxis: compact([variant !== 'card' && ARROW_HEIGHT, GAP]).reduce(
        (acc, cur) => acc + cur,
        0
      ),
    }),
    shift({ elementContext: 'reference' }),
    flip({
      crossAxis: true,
      elementContext: 'reference',
    }),
    size({
      elementContext: 'reference',
      apply(params) {
        const element = iFindElement(root);
        Object.assign(
          params.elements.floating.style,
          onApplyFloatingStyle?.(params) ?? {
            minWidth: params.rects.reference.width + 'px',
            maxWidth: iFloatingMaxSize(params, element, 'width') + 'px',
            maxHeight: iFloatingMaxSize(params, element, 'height') + 'px',
          }
        );
      },
    }),
    arrow({ element: iArrow }),
    hide({ strategy: 'escaped', elementContext: 'reference' }),
  ];
};
