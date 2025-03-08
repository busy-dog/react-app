import classNames from 'classnames';
import type { HTMLMotionProps } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';

import type { ReactCFC } from '@/models';

import { ISpinner } from '../spin-loading';

import * as styles from './index.scss';

export interface ISafeAreaProps extends HTMLMotionProps<'article'> {
  isLoading?: boolean;
  background?: React.ReactNode;
}

export const ISafeArea: ReactCFC<ISafeAreaProps> = ({
  ref,
  children,
  className,
  background,
  isLoading,
  ...others
}) => (
  <motion.article
    ref={ref}
    data-page
    animate={{ opacity: 1 }}
    className={styles.page}
    exit={{ opacity: 0 }}
    initial={{ opacity: 0.36 }}
    transition={{ duration: 0.3 }}
  >
    <AnimatePresence>
      {background && (
        <motion.div className={styles.background}>{background}</motion.div>
      )}
      {isLoading ? (
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.spin}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.36 }}
        >
          <ISpinner />
        </motion.div>
      ) : (
        <motion.div
          data-safe-area
          animate={{ opacity: 1 }}
          className={classNames(styles.area, className)}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.36 }}
          transition={{ duration: 0.3 }}
          {...others}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.article>
);
