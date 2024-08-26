import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isFinite } from '@busymango/is-esm';

import type { ReactCFC, WrapperProps } from '@/models';

import styles from './index.scss';

export interface IMarkerProps extends WrapperProps {
  /** 序号标识 */
  no?: number;
  /** 章节标识 */
  part?: boolean;
  /** 必填标识 */
  required?: boolean;
}

export const IMarker: ReactCFC<IMarkerProps> = ({
  no,
  part,
  required,
  children,
  className,
  ...others
}) => (
  <div className={classNames(styles.wrap, className)} {...others}>
    <AnimatePresence>
      {required && (
        <motion.span
          animate={{ opacity: 1 }}
          className={classNames(styles.marker, styles.required)}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          *
        </motion.span>
      )}
      {part && (
        <motion.span
          animate={{ opacity: 1 }}
          className={classNames(styles.marker, styles.part)}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        />
      )}
      {isFinite(no) && (
        <motion.span
          animate={{ opacity: 1 }}
          className={classNames(styles.marker, styles.no)}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          {no}.
        </motion.span>
      )}
    </AnimatePresence>
    {children}
  </div>
);
