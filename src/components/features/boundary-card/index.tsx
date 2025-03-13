import { useTranslation } from 'react-i18next';

import { isArray } from '@busymango/is-esm';

import {
  type BoundaryProps,
  IButton,
  IDirective,
  IFlex,
  ISignLine,
  ITypography,
} from '@/components/widgets';
import { Boundary } from '@/components/widgets/boundary';
import { useBoundary } from '@/components/widgets/boundary/hooks';
import type { ReactCFC } from '@/models';
import { isFetchError } from '@/services';
import { catchMsg } from '@/utils';

import NoSearchResultSVG from '@/icons/business/no.search.result.svg?react';

import * as styles from './index.scss';

export interface BoundaryCardProps extends BoundaryProps {}

/** 找不到数据 */
const NoData: ReactCFC<{ title?: string }> = ({ children, title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <NoSearchResultSVG className={styles.img} />
    <ITypography className={styles.title} variant="h4">
      {title}
    </ITypography>
    {children}
  </IFlex>
);

const Fallback: React.FC = () => {
  const { t } = useTranslation();

  const { error, reset } = useBoundary();

  if (isFetchError(error)) {
    const { api } = error.context ?? {};
    const { body } = error.context?.response ?? {};
    if (api?.includes('search') && body && 'data' in body) {
      const { data } = body ?? {};
      if (isArray(data) && data.length === 0) {
        return <NoData title={error?.message ?? t('common:No data')} />;
      }
    }
  }

  return (
    <IDirective
      className={styles.card}
      extra={
        <IButton danger size="mini" variant="text" onClick={reset}>
          {t('common:Reset')}
        </IButton>
      }
      icon={<ISignLine trigon type="informer" />}
      status="danger"
      title={catchMsg(error)}
    />
  );
};

export const BoundaryCard: React.FC<BoundaryCardProps> = (props) => (
  <Boundary fallback={<Fallback />} {...props} />
);
