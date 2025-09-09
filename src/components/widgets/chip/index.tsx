import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';

import { useMemoFunc } from '@/hooks';
import { ensure, iEscapeEvent, iPropagation } from '@/utils';

import { ISignLine } from '../sign';
import { ISpinner } from '../spin-loading';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import { iAnimate, initial, transition } from './helpers';
import type {
  IChipPrefixRender,
  IChipProps,
  IChipState,
  IChipSuffixRender,
} from './models';

import * as styles from './index.scss';

const iPrefixRender: IChipPrefixRender = (
  { icon, ...others },
  { isLoading }
) => (
  <ISVGWrap {...others}>
    <AnimatePresence>{isLoading ? <ISpinner /> : icon}</AnimatePresence>
  </ISVGWrap>
);

const iSuffixRender: IChipSuffixRender = (
  { icon, onClose, ...others },
  { closeable, disabled }
) => (
  <AnimatePresence>
    {closeable && !disabled && (
      <ISVGWrap whileHover={{ scale: 1.12 }} onClick={onClose} {...others}>
        <ISignLine type="cross" />
      </ISVGWrap>
    )}
  </AnimatePresence>
);

export const IChip = forwardRef<
  HTMLSpanElement,
  IChipProps & React.PropsWithChildren
>(function IChip(props, iForwardRef) {
  const {
    icon,
    style,
    color,
    children,
    clickable,
    className,
    isLoading,
    closeable,
    density = 'md',
    disabled = false,
    variant = 'filled',
    render,
    onKeyDown,
    onClick,
    onClose,
    ...others
  } = props;

  const target = useRef<HTMLSpanElement>(null);

  useImperativeHandle(iForwardRef, () => target.current!, [target]);

  const states: IChipState = {
    clickable,
    disabled,
    closeable,
    isLoading,
    variant,
    density,
  };

  const iClickable = !disabled && clickable;

  const iClose = useMemoFunc((event: React.UIEvent<HTMLElement>) => {
    iPropagation(event);
    onClose?.(event);
  });

  return (
    <motion.span
      ref={target}
      animate={iAnimate({ color, variant, disabled })}
      className={classNames(
        styles.chip,
        styles[density],
        styles[variant],
        {
          [styles.disabled]: disabled,
          [styles.clickable]: iClickable,
        },
        className
      )}
      exit={initial}
      initial={initial}
      style={style}
      transition={transition}
      onClick={ensure(iClickable && onClick)}
      onKeyDown={iEscapeEvent(onClose, onKeyDown)}
      {...others}
    >
      {iClickable && variant === 'filled' && <IWave target={target} />}
      {(render?.prefix ?? iPrefixRender)(
        { icon, onClose: iClose, className: styles.icon },
        states
      )}
      {children}
      {(render?.suffix ?? iSuffixRender)(
        { icon, onClose: iClose, className: styles.close },
        states
      )}
    </motion.span>
  );
});

export type { IChipCloseFunc, IChipProps } from './models';
