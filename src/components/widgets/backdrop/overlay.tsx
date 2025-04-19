import { useId, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { motion } from 'motion/react';

import { isIOS } from '@/utils';

import type { IOverlayProps } from './models';

import * as styles from './overlay.scss';

const iLocks = new Set<string>();

const iScrollbarX = () => {
  const { documentElement } = document;
  const { scrollLeft } = documentElement;
  const { left } = documentElement.getBoundingClientRect();
  return Math.round(left + scrollLeft);
};

const iScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

export const IOverlay: React.FC<IOverlayProps> = (props) => {
  const { ref, open, scroll = false, className, ...rest } = props;

  const id = useId();

  useLayoutEffect(() => {
    if (!open) return;
    if (scroll) return;

    iLocks.add(id);

    const { style } = document.body;

    // RTL <body> scrollbar
    const scrollbarX = iScrollbarX();

    const scrollbarWidth = iScrollbarWidth();

    const name = scrollbarX ? 'paddingLeft' : 'paddingRight';

    const scrollY = style.top ? parseFloat(style.top) : window.scrollY;
    const scrollX = style.left ? parseFloat(style.left) : window.scrollX;

    style.overflow = 'hidden';

    if (scrollbarWidth) {
      style[name] = `${scrollbarWidth}px`;
    }

    // Only iOS doesn't respect `overflow: hidden` on document.body, and this
    // technique has fewer side effects.
    if (isIOS()) {
      // iOS 12 does not support `visualViewport`.
      const { offsetTop = 0, offsetLeft = 0 } = window.visualViewport ?? {};

      Object.assign(style, {
        position: 'fixed',
        top: `${-(scrollY - Math.floor(offsetTop))}px`,
        left: `${-(scrollX - Math.floor(offsetLeft))}px`,
        right: '0',
      });
    }

    return () => {
      iLocks.delete(id);
      if (iLocks.size === 0) {
        Object.assign(style, {
          [name]: '',
          overflow: '',
        });

        if (isIOS()) {
          Object.assign(style, {
            top: '',
            left: '',
            right: '',
            position: '',
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [id, scroll, open]);

  return (
    <motion.div
      ref={ref}
      animate={open ? 'on' : 'off'}
      className={classNames(styles.wrap, className)}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      variants={{
        on: {
          opacity: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
        },
        off: {
          opacity: 0,
          filter: 'blur(2px)',
          pointerEvents: 'none',
        },
      }}
      {...rest}
    />
  );
};
