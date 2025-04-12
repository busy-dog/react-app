import { memo } from 'react';
import { unique } from 'remeda';

import { useMemoFunc } from '@/hooks';
import { iPropsAreEqual, isTrue } from '@/utils';

import { useControlState } from '../control';
import { IFlex } from '../flex';
import { IPanel } from '../panel';
import { ISignLine } from '../sign';
import type {
  ICollapseGroupProps,
  ICollapsibleKey,
  ICollapsibleProps,
} from './models';

import * as styles from './index.scss';

const Collapsible: React.FC<ICollapsibleProps> = ({
  open,
  name,
  title,
  extra,
  children,
  onArrowClick,
}) => {
  const onChange = useMemoFunc((open?: boolean) => {
    onArrowClick?.(name, open);
  });

  const [iOpen, iChange] = useControlState({ value: open, onChange });

  return (
    <div className={styles.wrap}>
      <IFlex align="center" className={styles.header} justify="space-between">
        <IFlex align="center" className={styles.title} gap={'var(--gap-02)'}>
          {title}
        </IFlex>
        <div>
          {extra ?? (
            <IFlex
              align="center"
              className={styles.trigger}
              justify="center"
              onClick={() => {
                iChange?.(!iOpen);
              }}
            >
              <ISignLine type={iOpen ? 'arrowTop' : 'arrowBottom'} />
            </IFlex>
          )}
        </div>
      </IFlex>
      <IPanel open={iOpen}>
        <div className={styles.content}>{children}</div>
      </IPanel>
    </div>
  );
};

export const ICollapsible = memo(Collapsible, iPropsAreEqual);

export const ICollapseGroup: React.FC<ICollapseGroupProps> = (props) => {
  const { items } = props;

  const [value, onChange] = useControlState(props);

  const onArrowClick = useMemoFunc((name: ICollapsibleKey, val?: boolean) => {
    const prev = value ?? [];
    onChange?.(
      unique(
        isTrue(val) ? prev.concat(name) : prev.filter((key) => key !== name)
      )
    );
  });

  return (
    <IFlex vertical className={styles.group}>
      {items?.map((item) => (
        <ICollapsible
          key={item.name}
          open={(value ?? []).includes(item.name)}
          onArrowClick={onArrowClick}
          {...item}
        />
      ))}
    </IFlex>
  );
};

export * from './models';
