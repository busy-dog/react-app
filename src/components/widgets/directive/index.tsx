import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { HTMLMotionProps } from 'motion/react';
import { motion } from 'motion/react';

import type { ReactCFC } from '@/models';
import type { OmitOf } from '@/utils';
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
  footer?: React.ReactNode;
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
    footer,
    children,
    className,
    status = 'info',
    variant = 'filled',
  } = props;

  const target = useRef<HTMLDivElement>(null);

  useImperativeHandle(iForwardRef, () => target.current!);

  return (
    <motion.div
      ref={target}
      animate={animate}
      className={classNames(
        styles.wrap,
        styles[status],
        styles[variant],
        {
          [styles.withIcon]: icon && isReactNode(icon),
        },
        className
      )}
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
        {children && <p className={styles.content}>{children}</p>}
        {footer && <p className={styles.footer}>{footer}</p>}
      </div>
    </motion.div>
  );
});
