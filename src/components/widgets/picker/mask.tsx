import { nanoid } from 'nanoid';

import { IFlex } from '../flex';

import * as styles from './mask.scss';

const iLinearGradientTop = nanoid();

const iLinearGradientBottom = nanoid();

export const IPickerMask: React.FC = () => {
  const stopColor = 'var(--bg-color-widgets)';

  return (
    <IFlex vertical className={styles.mask} justify="space-between">
      <svg className={styles.top}>
        <defs>
          <linearGradient
            id={iLinearGradientTop}
            x1="0%"
            x2="0%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor, stopOpacity: 0.96 }} />
            <stop offset="100%" style={{ stopColor, stopOpacity: 0.4 }} />
          </linearGradient>
        </defs>
        <rect
          fill={`url(#${iLinearGradientTop})`}
          height="100%"
          width="100%"
          x="0"
          y="0"
        />
      </svg>
      <div className={styles.view} />
      <svg className={styles.top}>
        <defs>
          <linearGradient
            id={iLinearGradientBottom}
            x1="0%"
            x2="0%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor, stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor, stopOpacity: 0.96 }} />
          </linearGradient>
        </defs>
        <rect
          fill={`url(#${iLinearGradientBottom})`}
          height="100%"
          width="100%"
          x="0"
          y="0"
        />
      </svg>
    </IFlex>
  );
};
