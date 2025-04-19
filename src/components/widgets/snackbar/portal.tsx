import { useDeferredValue, useEffect } from 'react';
import classNames from 'classnames';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { isNumber } from 'remeda';

import { FloatingPortal } from '@floating-ui/react';

import { useEffectOnce } from '@/hooks';
import { container } from '@/init';
import type { ReactCFC } from '@/models';

import type { ControlUISize } from '../control';
import { useSnackbars } from './hooks';
import { ISnackbar } from './snackbar';

import * as styles from './index.scss';

const useOnce = (() => {
  const state = { count: 0 };
  return () => {
    useEffectOnce(() => {
      state.count++;
      if (state.count > 1) {
        console.warn('重复声明了 ISnackbarPortal');
      }
      return () => {
        state.count--;
      };
    });
  };
})();

export const ISnackbarPortal: ReactCFC<{
  max?: number;
  size?: ControlUISize;
}> = (props) => {
  const { size = 'medium', max } = props;
  const { snackbars, setMaxCount } = useSnackbars();

  useOnce();

  useEffect(() => {
    if (isNumber(max)) {
      setMaxCount(() => max);
    }
  }, [max, setMaxCount]);

  return (
    <FloatingPortal root={container}>
      <ul className={classNames(styles.container, styles[size])}>
        <MotionConfig reducedMotion="never">
          <AnimatePresence initial={false} mode="popLayout">
            {useDeferredValue(snackbars).map((rect, index) => (
              <ISnackbar
                {...rect}
                key={rect.id}
                style={{ zIndex: -1 * index }}
              />
            ))}
          </AnimatePresence>
        </MotionConfig>
      </ul>
    </FloatingPortal>
  );
};
