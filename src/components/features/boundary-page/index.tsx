import { Fragment } from 'react/jsx-runtime';
import type { TranslationProps } from 'react-i18next';
import { Translation, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { isTrue } from '@busymango/is-esm';

import { type BoundaryProps, IButton, IFlex } from '@/components/widgets';
import { Boundary } from '@/components/widgets/boundary';
import { useBoundary } from '@/components/widgets/boundary/hooks';
import type { ReactCFC } from '@/models';
import { isFetchError } from '@/services';
import { catchMsg, isNotFoundError } from '@/utils';

import ErrorSVG from '@/icons/business/error.svg?react';
import NoConnectionSVG from '@/icons/business/no.connection.svg?react';
import NoDocumentsSVG from '@/icons/business/no.documents.svg?react';
import NoSearchResultSVG from '@/icons/business/no.search.result.svg?react';

import * as styles from './index.scss';

interface FeedbackProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export interface BoundaryPageProps extends BoundaryProps {}

const AnomalyShell: ReactCFC<{
  image: React.ReactNode;
  render: TranslationProps['children'];
}> = ({ image, render }) => (
  <IFlex centered vertical className={styles.wrap}>
    {isTrue(image) ? <ErrorSVG className={styles.img} /> : image}
    <Translation>{render}</Translation>
  </IFlex>
);

/** 找不到数据 */
const NoData: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <AnomalyShell
    image={<NoSearchResultSVG className={styles.img} />}
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>{title ?? t('common:No data')}</h1>
        {children}
      </Fragment>
    )}
  />
);

const Unknown: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <AnomalyShell
    image
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>
          {title ?? t('common:Under abnormality')}
        </h1>
        {children}
      </Fragment>
    )}
  />
);

/** 401、403 */
const NoAuth: ReactCFC<FeedbackProps> = ({ children, title }) => {
  return (
    <AnomalyShell
      image
      render={(t) => (
        <Fragment>
          <h1 className={styles.title}>{title ?? t('common:No authority')}</h1>
          {children}
        </Fragment>
      )}
    />
  );
};

const NotFound: ReactCFC<FeedbackProps> = ({ title, children }) => (
  <AnomalyShell
    image={<NoDocumentsSVG className={styles.img} />}
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>{title ?? t('common:Page not found')}</h1>
        {children}
      </Fragment>
    )}
  />
);

/** 服务端维护中 */
const Maintained: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <AnomalyShell
    image={<NoConnectionSVG className={styles.img} />}
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>
          {title ?? t('common:Under maintenance')}
        </h1>
        {children}
      </Fragment>
    )}
  />
);

const Fallback: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { error, info, reset } = useBoundary();

  if (isFetchError(error)) {
    const { context } = error;
    const { status } = context?.response ?? {};

    if (status === 404) {
      return <NotFound title={error?.message} />;
    }

    if (status === 401) {
      return <NoAuth title={error?.message} />;
    }

    if (status === 500) {
      return <Maintained title={error?.message} />;
    }
  }

  if (isNotFoundError(error)) {
    return (
      <NotFound
        title={
          <Fragment>
            {t('common:Page not found')}
            <span
              style={{
                marginLeft: 'var(--gap-03)',
                fontSize: 'var(--font-size-4)',
              }}
            >
              <IButton
                variant="text"
                onClick={() => {
                  navigate('/', { replace: true });
                  reset?.();
                }}
              >
                {t('common:Home')}
              </IButton>
            </span>
          </Fragment>
        }
      />
    );
  }

  return <Unknown description={info?.componentStack} title={catchMsg(error)} />;
};

export const BoundaryPage: React.FC<BoundaryPageProps> = (props) => (
  <Boundary fallback={<Fallback />} {...props} />
);
