import { useMemo } from 'react';

import { catchMsg } from '@/utils';

import { useFallbackContext } from '../boundary/hooks';
import { useErrorContent } from './hooks';
import type { ErrorBoundaryProps } from './models';
import { QueryBoundary } from './query.boundary';

import styles from './index.scss';

/** Boundary HOC */
export function boundary<P extends object>(
  Component: React.ComponentType<P>,
  boundaryProps: ErrorBoundaryProps = {}
): React.FC<P> {
  const BoundaryComponent: React.FC<P> = (props) => {
    return (
      <QueryBoundary {...boundaryProps}>
        <Component {...props} />
      </QueryBoundary>
    );
  };
  return BoundaryComponent;
}

export const FallbackWidget: React.FC = () => {
  const { error } = useFallbackContext();

  const msg = useMemo(() => catchMsg(error), [error]);

  return msg;
};

export const FallbackCard: React.FC = () => {
  const { error } = useFallbackContext();

  const msg = useMemo(() => catchMsg(error), [error]);

  return <div className={styles.card}>{msg}</div>;
};

export const FallbackPage: React.FC = () => (
  <div className={styles.wrapper}>{useErrorContent()}</div>
);

export * from './error.boundary';
export * from './query.boundary';
