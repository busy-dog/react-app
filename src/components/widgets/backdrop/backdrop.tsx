import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { FloatingPortal } from '@floating-ui/react';

import { container } from '@/init';
import type { ReactCFC } from '@/models';
import { iFindElement, isFalse, isTrue } from '@/utils';

import type { IBackdropProps } from './models';
import { IOverlay } from './overlay';

import * as styles from './backdrop.scss';

export const IBackdrop: ReactCFC<IBackdropProps> = ({
  ref,
  root,
  open,
  relative,
  children,
  className,
  ...others
}) => {
  const [mounted, setMount] = useState(false);

  useEffect(() => {
    if (isFalse(mounted)) {
      isTrue(open) && setMount(true);
    }
  }, [open, mounted]);

  if (isTrue(mounted)) {
    return (
      <FloatingPortal root={iFindElement(root) ?? container}>
        <IOverlay
          ref={ref}
          className={classNames(
            styles.wrap,
            relative && styles.relative,
            className
          )}
          open={open}
          {...others}
        >
          {children}
        </IOverlay>
      </FloatingPortal>
    );
  }
};
