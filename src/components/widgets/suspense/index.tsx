import type { SuspenseProps } from 'react';
import { Suspense } from 'react';

import type { ReactCFC } from '@/models';

import { ISpinner } from '../spin-loading';

/** Suspense HOC */
export function suspense<P extends object>(
  Component: React.ComponentType<P>,
  suspenseProps: SuspenseProps = {}
) {
  const SuspenseComponent: React.FC<P> = (props) => (
    <Suspense {...suspenseProps}>
      <Component {...props} />
    </Suspense>
  );
  return SuspenseComponent;
}

export const ISuspense: ReactCFC<{
  isLoading?: boolean;
}> = suspense(
  ({ children, isLoading }) => (isLoading ? <ISpinner /> : children),
  { fallback: <ISpinner /> }
);
