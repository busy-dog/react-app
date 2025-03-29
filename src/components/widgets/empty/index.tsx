import type { ReactCFC } from '@/models';

import EmptySVG from '@/icons/feedbacks/empty.svg?react';

import { IFlex } from '../flex';
import { ISuspense } from '../suspense';

import * as styles from './index.scss';

export interface IEmptyWrapProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  fallback?: React.ReactNode;
}

export const IEmptyWrap: ReactCFC<IEmptyWrapProps> = ({
  isLoading,
  children,
  isEmpty,
  fallback,
}) => (
  <ISuspense isLoading={isLoading}>
    {isEmpty
      ? (fallback ?? (
          <IFlex centered vertical className={styles.wrap}>
            <EmptySVG className={styles.icon} />
            <span className={styles.text}>暂无数据</span>
          </IFlex>
        ))
      : children}
  </ISuspense>
);
