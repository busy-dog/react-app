import { useDeferredValue, useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { isNumber } from 'remeda';

import { FloatingPortal } from '@floating-ui/react';

import { container } from '@/init';
import type { ReactCFC } from '@/models';

import { IFlex } from '../flex';
import { useSnackbars } from './hooks';
import { ISnackbar } from './isnackbar';

import * as styles from './index.scss';

export { snackbar } from './hooks';

export const ISnackbarPortal: ReactCFC<{
  max?: number;
}> = ({ max }) => {
  const { snackbars, setMaxCount } = useSnackbars();

  useEffect(() => {
    if (isNumber(max)) {
      setMaxCount(() => max);
    }
  }, [max, setMaxCount]);

  return (
    <FloatingPortal root={container}>
      <IFlex vertical align="center" className={styles.container}>
        <MotionConfig reducedMotion="never">
          <AnimatePresence mode="popLayout">
            {useDeferredValue(snackbars).map((rect, index) => (
              <ISnackbar
                {...rect}
                key={rect.id}
                style={{ zIndex: -1 * index }}
              />
            ))}
          </AnimatePresence>
        </MotionConfig>
      </IFlex>
    </FloatingPortal>
  );
};
