import { useEffect, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type {
  AnimationDefinition,
  AnimationProps,
  Target,
  Transition,
} from 'motion/react';
import { motion } from 'motion/react';
import { isDeepEqual, isObjectType, isString } from 'remeda';

import type { EventStateParams } from '@/hooks';
import { useEventState, useMemoFunc, useTimeout } from '@/hooks';
import type { ReactTargetType } from '@/models';
import { isFinite, isTrue } from '@/utils';

import { ISignLine, type ISignType } from '../sign';
import { ISVGWrap } from '../svg-wrap';
import { iSnackbar, useShakeAnimate, useSnackbars } from './hooks';
import type { ISnackbarProps } from './models';

import * as styles from './index.scss';

const iAnimate = (): Target => ({
  y: 0,
  scale: 1,
  opacity: 1,
  originY: 0,
});

const exit: AnimationProps['exit'] = {
  scale: 0.36,
  height: 0,
  opacity: 0,
  y: -50,
};

const initial: AnimationProps['initial'] = { opacity: 0, y: 50, scale: 0.36 };

const transition: Transition = {
  type: 'spring',
  duration: 0.5,
};

const isFinitePositive = (source: unknown): source is number => {
  return isFinite(source) && source > 0;
};

const iHoverParams = (target: ReactTargetType): EventStateParams => ({
  target,
  end: 'mouseleave',
  start: 'mouseenter',
});

const iSnackbarSign = (status?: ISnackbarProps['status']): ISignType | void => {
  switch (status) {
    case 'info':
      return 'info';
    case 'success':
      return 'tick';
    case 'warn':
      return 'interj';
    case 'danger':
      return 'cross';
  }
};

export const ISnackbar: React.FC<ISnackbarProps> = (props) => {
  const {
    id,
    ref,
    close,
    children,
    className,
    icon = true,
    duration = 3,
    status = 'info',
    onExit,
    ...rest
  } = props;

  const [scope, iShakeAnimate] = useShakeAnimate<HTMLLIElement>();

  const isHover = useEventState(iHoverParams(scope));

  const iDestory = useSnackbars(({ destory }) => destory);

  useImperativeHandle(ref, () => scope.current);

  const destory = useMemoFunc(() => iDestory(id));

  const iResetTimeout = useTimeout(destory, {
    wait: duration,
    enabled: !isHover && isFinitePositive(duration),
  });

  const reset = useMemoFunc(() => {
    iShakeAnimate();
    iResetTimeout();
  });

  const api = useRef({ id, reset, destory });

  useEffect(() => {
    iSnackbar.apis.set(id, api.current);
  }, [id]);

  const onAnimationComplete = useMemoFunc((animation: AnimationDefinition) => {
    if (isObjectType(animation) && isDeepEqual(animation, exit)) {
      onExit?.(api.current);
    }
  });

  const type = iSnackbarSign(status);

  return (
    <motion.li
      key={id}
      ref={scope}
      layout
      animate={iAnimate()}
      className={classNames(styles.snackbar, className)}
      exit={exit}
      initial={initial}
      transition={transition}
      onAnimationComplete={onAnimationComplete}
      {...rest}
    >
      <ISVGWrap className={styles.icon} x={'-0.35em'}>
        {isTrue(icon)
          ? isString(type) && (
              <ISignLine
                ring={type !== 'interj'}
                trigon={type === 'interj'}
                type={type}
              />
            )
          : icon}
      </ISVGWrap>
      {children}
      {close && <ISVGWrap onClick={destory}>{close}</ISVGWrap>}
    </motion.li>
  );
};
