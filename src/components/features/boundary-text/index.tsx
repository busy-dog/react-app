/**
 * @description boundary error widgets
 */

import { useMemo } from 'react';
import classNames from 'classnames';

import { Boundary, type BoundaryProps } from '@/components/widgets';
import { useBoundary } from '@/components/widgets/boundary/hooks';
import { catchMsg } from '@/utils';

import RefreshSVG from '@/icons/actions/refresh.svg?react';

import * as styles from './index.scss';

export interface BoundaryTextProps extends BoundaryProps {}

const Fallback: React.FC<{
  autoSize?: boolean;
}> = (props) => {
  const { autoSize } = props;

  const { error, reset } = useBoundary();

  const msg = useMemo(() => catchMsg(error), [error]);

  return (
    <span className={classNames(styles.widget, autoSize && styles.autoSize)}>
      <input readOnly title={msg} value={msg} />
      <RefreshSVG onClick={reset} />
    </span>
  );
};

export const BoundaryText: React.FC<BoundaryTextProps> = (props) => (
  <Boundary fallback={<Fallback />} {...props} />
);
