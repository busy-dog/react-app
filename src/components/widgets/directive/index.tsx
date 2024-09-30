import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

import type { ReactCFC } from '@/models';
import { isReactNode } from '@/utils';

import { ISVGWrap } from '../svg-wrap';
import { animate, initial, transition } from './helpers';

import * as styles from './index.scss';

export interface IDirectiveProps
  extends React.PropsWithChildren,
    OmitOf<HTMLMotionProps<'div'>, 'title' | 'children'> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  variant?: 'filled' | 'borderered';
  status?: 'success' | 'danger' | 'warn' | 'info';
}

export const IDirective: ReactCFC<IDirectiveProps> = forwardRef<
  HTMLDivElement,
  IDirectiveProps
>(function IDirective(props, iForwardRef) {
  const {
    icon,
    title,
    extra,
    status = 'info',
    variant = 'filled',
    children,
  } = props;

  const target = useRef<HTMLDivElement>(null);

  useImperativeHandle(iForwardRef, () => target.current!);

  return (
    <motion.div
      ref={target}
      animate={animate}
      className={classNames(styles.wrap, styles[status], styles[variant], {
        [styles.withIcon]: icon && isReactNode(icon),
      })}
      exit={initial}
      initial={initial}
      transition={transition}
    >
      <div className={styles.icon}>{icon && <ISVGWrap>{icon}</ISVGWrap>}</div>
      <div className={styles.article}>
        <div className={styles.header}>
          {title}
          {extra}
        </div>
        <p className={styles.content}>{children}</p>
      </div>
    </motion.div>
  );
});
