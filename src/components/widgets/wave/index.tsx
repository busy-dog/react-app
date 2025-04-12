import { Fragment, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { motion, useAnimate } from 'motion/react';
import { isString } from 'remeda';

import {
  useAppTheme,
  useEventState,
  useMemoFunc,
  useResizeObserver,
} from '@/hooks';
import type { ReactCFC } from '@/models';
import { compact, FRAME2MS, iThemeVariable } from '@/utils';

import type { IWaveProps, IWaveWrapProps } from './models';

import * as styles from './index.scss';

export const IWave: React.FC<IWaveProps> = (props) => {
  const { className, target, measure, placeholder, ...others } = props;

  const memo = useRef(false);

  const theme = useAppTheme();

  const [scope, animate] = useAnimate<HTMLDivElement>();

  const animation = useMemoFunc(async () => {
    memo.current = true;

    const boxShadow = compact(
      (['1', '2', '3'] as const).map((gradation) =>
        iThemeVariable(`--wave-color-${gradation}`)
      )
    ).map((color, index) => `0 0 0 ${index * 3}px ${color}`);

    await animate(
      scope.current,
      { boxShadow },
      {
        duration: 0.4,
        velocity: 100,
        repeatType: 'reverse',
      }
    );

    memo.current = false;
  });

  const isClick = useEventState({
    target,
    end: 'mouseup',
    start: 'mousedown',
  });

  const isTouch = useEventState({
    target,
    end: 'touchend',
    start: 'touchstart',
  });

  useResizeObserver(
    measure,
    ({ target: { clientWidth, clientHeight } }) => {
      scope.current.style.width = `${clientWidth}px`;
      scope.current.style.height = `${clientHeight}px`;
    },
    { debounce: 10 * FRAME2MS }
  );

  useEffect(() => {
    if ((isClick || isTouch) && isString(theme)) {
      !memo.current && animation();
    }
  }, [animation, isClick, isTouch, theme]);

  return (
    <Fragment>
      <div
        ref={scope}
        className={classNames(styles.wave, className)}
        {...others}
      />
      {placeholder && (
        <motion.div
          className={styles.wave}
          initial={{
            boxShadow: `0 0 0 4px ${iThemeVariable(`--wave-color-1`)}`,
          }}
        />
      )}
    </Fragment>
  );
};

export const IWaveWrap: ReactCFC<IWaveWrapProps> = ({
  children,
  enabled,
  target,
  className,
  placeholder,
  ...others
}) => (
  <span className={classNames(styles.wrap, className)} {...others}>
    {enabled && <IWave placeholder={placeholder} target={target} />}
    {children}
  </span>
);

export const IWaveShell: React.FC<{
  children: (ref: React.MutableRefObject<null>) => React.ReactNode;
}> = ({ children }) => {
  const ref = useRef(null);
  return (
    <Fragment>
      <IWave target={ref} />
      {children(ref)}
    </Fragment>
  );
};
