import { useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence } from 'motion/react';

import { ifnot } from '@busymango/utils';

import { useEventState } from '@/hooks';

import { ISpinner } from '../spin-loading';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import type {
  IControlWrapProps,
  IControlWrapRootRender,
  IControlWrapState,
} from './models';

import * as styles from './control.warp.scss';

const iRootRender: IControlWrapRootRender = (
  { ref, prefix, suffix, children, ...others },
  { variant, pattern, isFocus }
) => (
  <div ref={ref} data-ui-control-wrap {...others}>
    {pattern === 'editable' && variant === 'bordered' && (
      <IWave placeholder={variant === 'bordered' && isFocus} target={ref} />
    )}
    {prefix}
    {children}
    {suffix}
  </div>
);

export const IControlWrap: React.FC<IControlWrapProps> = (props) => {
  const {
    ref,
    prefix,
    suffix,
    children,
    className,
    isLoading,
    isFocusWithin,
    isPrefixClickable,
    isSuffixClickable,
    status = 'success',
    variant = 'standard',
    pattern = 'editable',
    size = 'medium',
    onSuffixClick,
    onPrefixClick,
    render,
    ...others
  } = props;

  const target = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => target.current!, [target]);

  const isFocus = useEventState({
    target,
    end: 'focusout',
    start: 'focusin',
  });

  const states: IControlWrapState = {
    size,
    status,
    pattern,
    isFocus,
    isLoading,
    isFocusWithin,
    isPrefixClickable,
    isSuffixClickable,
    variant,
  };

  return (render?.root ?? iRootRender)(
    {
      children,
      ref: target,
      className: classNames(
        styles.wrap,
        styles[size],
        styles[status],
        styles[pattern],
        styles[variant],
        {
          [styles.focus]: isFocusWithin,
        },
        className
      ),
      prefix: (
        <AnimatePresence>
          {prefix ? (
            <ISVGWrap
              className={classNames(styles.iconWrap, styles.prefix, {
                [styles.clickable]: isPrefixClickable,
              })}
              onClick={ifnot(isPrefixClickable && onPrefixClick)}
            >
              {prefix}
            </ISVGWrap>
          ) : (
            <span />
          )}
        </AnimatePresence>
      ),
      suffix: (
        <AnimatePresence>
          {(isLoading || suffix) && (
            <ISVGWrap
              className={classNames(styles.iconWrap, styles.suffix, {
                [styles.clickable]: isSuffixClickable,
              })}
              onClick={ifnot(isSuffixClickable && onSuffixClick)}
            >
              {isLoading ? <ISpinner /> : suffix}
            </ISVGWrap>
          )}
        </AnimatePresence>
      ),
      ...others,
    },
    states
  );
};
