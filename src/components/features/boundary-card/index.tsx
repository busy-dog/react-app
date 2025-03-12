import { useTranslation } from 'react-i18next';

import {
  type BoundaryProps,
  IButton,
  IDirective,
  ISignLine,
} from '@/components/widgets';
import { Boundary } from '@/components/widgets/boundary';
import { useBoundary } from '@/components/widgets/boundary/hooks';
import { catchMsg } from '@/utils';

import * as styles from './index.scss';

export interface BoundaryCardProps extends BoundaryProps {}

const Fallback: React.FC = () => {
  const { t } = useTranslation();

  const { error, reset } = useBoundary();

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
