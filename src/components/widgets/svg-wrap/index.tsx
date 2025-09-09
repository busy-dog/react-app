import type { Target, TargetAndTransition, Transition } from 'motion/react';
import { motion } from 'motion/react';

import type { ReactCFC } from '@/models';

import type { ISVGWrapProps } from './models';

const transition: Transition = { ease: 'easeOut' };

const iAnimate = ({ x = 0, y = 0 }: Partial<Target>): TargetAndTransition => ({
  opacity: 1,
  scale: 1,
  x,
  y,
});

const iInitial = ({ x = 0, y = 0 }: Partial<Target>): Target => ({
  opacity: 0.36,
  scale: 0.64,
  x,
  y,
});

export const ISVGWrap: ReactCFC<ISVGWrapProps> = ({
  x = 0,
  y = '0.05em',
  children,
  className,
  animate,
  style,
  ...others
}) => (
  <motion.i
    animate={{ ...iAnimate({ x, y }), ...animate }}
    className={className}
    exit={iInitial({ x, y })}
    initial={iInitial({ x, y })}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
      ...style,
    }}
    transition={transition}
    {...others}
  >
    {/* ZWSP(zero-width space) */}
    {'\u200b'}
    {children}
  </motion.i>
);

export type { ISVGWrapProps } from './models';
