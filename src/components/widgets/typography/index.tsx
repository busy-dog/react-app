import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { ForwardRefComponent, HTMLMotionProps } from 'motion/react';
import { motion } from 'motion/react';

import { ensure } from '@/utils';

import type { ITypographyElement, ITypographyProps } from './models';

import * as styles from './index.scss';

export const ITypography = forwardRef<ITypographyElement, ITypographyProps>(
  function ITypography(props, iForwardRef) {
    const {
      mark,
      align,
      margin = true,
      maxRow = undefined,
      variant = 'body',
      className,
      style,
      ...others
    } = props;

    const layoutId = useId();

    const container = useRef<ITypographyElement>(null);

    useImperativeHandle(iForwardRef, () => container.current!);

    const attrs = {
      layoutId,
      className: classNames(
        styles[variant],
        margin && styles.margin,
        className
      ),
      style: {
        WebkitLineClamp: ensure(maxRow !== Infinity && maxRow),
        backgroundColor: ensure(mark && `rgb(var(--${mark}-color-500)}/ 1)`),
        textAlign: align,
        ...style,
      } satisfies React.CSSProperties,
    };

    const Component = motion[
      (() => {
        switch (variant) {
          case 'inherit':
            return 'span';
          case 'subtitle':
          case 'body':
            return 'p';
          default:
            return variant;
        }
      })()
    ] as ForwardRefComponent<
      HTMLDivElement,
      HTMLMotionProps<'p'> & HTMLMotionProps<'h1'> & HTMLMotionProps<'span'>
    >;

    return (
      <Component
        ref={container}
        transition={{ type: 'keyframes' }}
        {...attrs}
        {...others}
      />
    );
  }
);

export type { ITypographyProps } from './models';
