import { useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { isNumber } from 'remeda';

import { useDebounceFunc, useMemoFunc } from '@/hooks';
import {
  ensure,
  FRAME2MS,
  iPropagation,
  isReactChildren,
  isTrue,
} from '@/utils';

import { ISpinner } from '../spin-loading';
import { IWave } from '../wave';
import { iAnimate, whileHover, whileTap } from './helpers';
import type { IButtonProps } from './models';

import * as styles from './index.scss';

export const IButton: React.FC<IButtonProps> = (props) => {
  const {
    ref,
    icon,
    capsule,
    children,
    debounce,
    className,
    isLoading,
    isFullWidth,
    wave: iWave,
    danger = false,
    type = 'button',
    size = 'medium',
    disabled = false,
    variant = 'bordered',
    onPointerDownCapture,
    onClick,
    ...others
  } = props;

  const clickable = !isLoading && !disabled;

  const button = useRef<HTMLButtonElement>(null);

  const wave = iWave ?? (variant === 'filled' && !danger);

  const wait = isNumber(debounce) ? debounce : 5 * FRAME2MS;

  const { call: starer } = useDebounceFunc(onClick, wait);

  useImperativeHandle(ref, () => button.current!, [button]);

  const onTap = useMemoFunc<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const debounceable = isTrue(debounce) || isNumber(debounce);
      clickable && (debounceable ? starer(event) : onClick?.(event));
    }
  );

  const isNonEmptyChild = isReactChildren(children);

  return (
    <MotionConfig transition={{ ease: 'easeOut' }}>
      <motion.button
        ref={button}
        animate={iAnimate({ variant, danger, disabled })}
        className={classNames(
          styles.wrap,
          styles[size],
          styles[variant],
          {
            [styles.danger]: danger,
            [styles.capsule]: capsule,
            [styles.disabled]: disabled,
            [styles.padding]: !!children,
            [styles.fullWidth]: isFullWidth,
          },
          className
        )}
        disabled={disabled}
        type={type}
        whileHover={whileHover({ variant, danger, disabled })}
        whileTap={whileTap({ variant, danger, disabled })}
        onClick={onTap}
        onPointerDownCapture={(event) => {
          if (!clickable) iPropagation(event);
          onPointerDownCapture?.(event);
        }}
        {...others}
      >
        {wave && <IWave target={button} />}
        <motion.i
          animate={isLoading ? 'visible' : 'hidden'}
          className={styles.spin}
          variants={{
            hidden: { scale: 0.64, x: '-1em', opacity: 0 },
            visible: { scale: 1, x: 0, opacity: 1 },
          }}
        >
          <ISpinner />
        </motion.i>
        <AnimatePresence>
          {icon && (
            <motion.i
              animate={
                isLoading
                  ? { scale: 0.64, x: '1em', opacity: 0 }
                  : { scale: 1, x: 0, opacity: 1 }
              }
              className={ensure(isNonEmptyChild && styles.gap)}
              exit={{ scale: 0.64, x: '1em', opacity: 0 }}
              initial={false}
            >
              {icon}
            </motion.i>
          )}
        </AnimatePresence>
        {isNonEmptyChild && (
          <motion.span
            animate={isLoading ? 'hidden' : 'visible'}
            variants={{
              hidden: { scale: 0.64, x: '1em', opacity: 0 },
              visible: { scale: 1, x: 0, opacity: 1 },
            }}
          >
            {children}
          </motion.span>
        )}
      </motion.button>
    </MotionConfig>
  );
};

export type { IButtonProps } from './models';
