import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { useEventState } from '@/hooks';

import { useIFieldGridContext } from '../form-field/hooks';
import { ISpinner } from '../spinners';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import { usePatternAssert } from './hooks';
import type { IControlWrapProps } from './models';

import * as styles from './index.scss';

export const IControlWrap = forwardRef<HTMLDivElement, IControlWrapProps>(
  function IControlWrap(props, ref) {
    const ctx = useIFieldGridContext();

    const {
      prefix,
      suffix,
      children,
      className,
      isLoading,
      suffixClickable,
      status = 'success',
      variant = 'standard',
      pattern = 'editable',
      size = ctx?.size ?? 'medium',
      onSuffixClick,
      onPrefixClick,
      ...others
    } = props;

    const target = useRef<HTMLDivElement>(null);

    const { isEditable } = usePatternAssert(pattern);

    useImperativeHandle(ref, () => target.current!, [target]);

    const isFocus = useEventState({
      target,
      end: 'focusout',
      start: 'focusin',
    });

    return (
      <motion.div
        ref={target}
        data-ui-control-wrap
        className={classNames(
          styles.wrap,
          styles[size],
          styles[status],
          styles[pattern],
          styles[variant],
          className
        )}
        {...others}
      >
        {isEditable && variant === 'bordered' && (
          <IWave
            placeholder={variant === 'bordered' && isFocus}
            target={target}
          />
        )}
        <AnimatePresence>
          {prefix ? (
            <ISVGWrap className={styles.iconWrap} onClick={onPrefixClick}>
              {prefix}
            </ISVGWrap>
          ) : (
            <span />
          )}
        </AnimatePresence>
        {children}
        <AnimatePresence>
          {isLoading || suffix ? (
            <ISVGWrap
              className={classNames(styles.iconWrap, {
                [styles.clickable]: suffixClickable,
              })}
              onClick={onSuffixClick}
            >
              {isLoading ? <ISpinner /> : suffix}
            </ISVGWrap>
          ) : (
            <span />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
