import classNames from 'classnames';
import { motion } from 'motion/react';

import type { ReactCFC, ReactWrapProps } from '@/models';
import type { OmitOf } from '@/utils';
import { iPressEvent } from '@/utils';

import type { IFlexProps } from '../flex';
import { IFlex } from '../flex';

import * as styles from './index.scss';

export interface IFormWrapProps extends ReactWrapProps<HTMLFormElement> {}

export const IFormWrap: ReactCFC<IFormWrapProps> = ({
  children,
  onKeyDown,
  onSubmit,
  ...others
}) => (
  <motion.form
    onKeyDown={iPressEvent(onSubmit, onKeyDown)}
    onSubmit={onSubmit}
    {...others}
  >
    {children}
  </motion.form>
);

export interface IFormCardProps
  extends OmitOf<IFlexProps, 'title' | 'children'> {
  extra?: React.ReactNode;
  title?: React.ReactNode;
}

export const IFormCard: ReactCFC<IFormCardProps> = ({
  extra,
  title,
  children,
  className,
  ...others
}) => {
  return (
    <IFlex vertical className={classNames(styles.card, className)} {...others}>
      {title && (
        <IFlex align="center" className={styles.header} justify="space-between">
          <div>{title}</div>
          <div>{extra}</div>
        </IFlex>
      )}
      {children}
    </IFlex>
  );
};
