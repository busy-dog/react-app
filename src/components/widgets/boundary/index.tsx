/**
 * @description 支持react-query的异常边界
 */

import { Component, useMemo } from 'react';
import { t } from 'i18next';

import {
  QueryErrorResetBoundary,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';

import type { ReactCFC } from '@/models';
import { catchMsg } from '@/utils';

import { BoundaryContext } from './hooks';
import type {
  BoundaryContextVal,
  BoundaryProps,
  BoundaryState,
} from './models';

const initial = {
  error: null,
  isCaught: false,
} satisfies BoundaryState;

export const BoundaryProvider: ReactCFC<BoundaryContextVal> = ({
  reset,
  error,
  isCaught,
  children,
}) => (
  <BoundaryContext.Provider
    value={useMemo(
      () => ({
        reset,
        error,
        isCaught,
      }),
      [error, reset, isCaught]
    )}
  >
    {children}
  </BoundaryContext.Provider>
);

class BoundaryCore extends Component<
  React.PropsWithChildren<BoundaryProps>,
  BoundaryState
> {
  state: BoundaryState = initial;

  static getDerivedStateFromError = (error: Error): BoundaryState => ({
    isCaught: true,
    error,
  });

  componentDidCatch = (error: Error, info: React.ErrorInfo) => {
    this.props.onError?.(error, info);
    this.setState({ error, info, isCaught: true });
  };

  reset: BoundaryProps['onReset'] = (...args: unknown[]) => {
    const { onReset } = this.props;
    const { isCaught } = this.state;

    if (isCaught) {
      onReset?.(args);
      this.setState(initial);
    }
  };

  render = () => {
    const { reset } = this;
    const { children, fallback } = this.props;
    const { error, info, isCaught } = this.state;
    const message = catchMsg(error) ?? t('common:Oops');

    if (isCaught) {
      return (
        <BoundaryProvider
          error={error}
          info={info}
          isCaught={isCaught}
          reset={reset}
        >
          {fallback ?? <p>{message}</p>}
        </BoundaryProvider>
      );
    }

    return children;
  };
}

const QueryBoundary: React.FC<BoundaryProps> = (props) => {
  const { reset } = useQueryErrorResetBoundary();
  return <BoundaryCore onReset={reset} {...props} />;
};

export const Boundary: React.FC<BoundaryProps> = (props) => (
  <QueryErrorResetBoundary>
    <QueryBoundary {...props} />
  </QueryErrorResetBoundary>
);

/** Boundary HOC */
export function boundary<P extends object>(
  Component: React.ComponentType<P>,
  boundaryProps: BoundaryProps = {}
): React.FC<P> {
  const BoundaryComponent: React.FC<P> = (props) => (
    <Boundary {...boundaryProps}>
      <Component {...props} />
    </Boundary>
  );
  return BoundaryComponent;
}

export type { BoundaryProps, BoundaryState } from './models';
