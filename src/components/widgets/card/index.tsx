import { IButton } from '../button';
import { useControlState } from '../control';
import { IFlex } from '../flex';
import { IPanel } from '../panel';
import { ISignLine } from '../sign';
import type { ICardProps } from './models';

import * as styles from './index.scss';

export const ICard: React.FC<ICardProps> = (props) => {
  const { ref, title, extra, children, footer, render, open, ...others } =
    props;

  const [innerOpen, onOpenChange] = useControlState({
    value: open,
    defaultValue: true,
    onChange: props.onOpenChange,
  });

  return (
    <IPanel
      ref={ref}
      className={styles.wrap}
      open={innerOpen}
      renders={{
        header: () => (
          <IFlex align="center" justify="space-between">
            {title}
            <i>
              {extra ?? (
                <IButton capsule size="mini" variant="filled">
                  <ISignLine
                    type={innerOpen ? 'arrowTop' : 'arrowBottom'}
                    onClick={() => {
                      console.log('click', !innerOpen);
                      onOpenChange(!innerOpen);
                    }}
                  />
                </IButton>
              )}
            </i>
          </IFlex>
        ),
      }}
      {...others}
    >
      {children}
      {footer}
    </IPanel>
  );
};
