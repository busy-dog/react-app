import { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { isDeepEqual, isNullish } from 'remeda';

import { useDebounceFunc, useEffectOnce } from '@/hooks';
import type { ReactCFC } from '@/models';
import { FRAME2MS, isCentered, isHTMLElement, isNonEmptyArray } from '@/utils';

import { useControlState } from '../control';
import {
  identified,
  iScrollIntoView,
  isSupportSnape,
  iTarget,
  WHEEL_ITEM_ID_NAME,
} from './helpers';
import type { IWheelOptionProps, IWheelProps } from './models';

import * as styles from './index.scss';

const IWheelOption: ReactCFC<IWheelOptionProps> = (props) => {
  const { children, isFocus, ...others } = props;

  const target = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={target}
      className={classNames(styles.option, isFocus && styles.focus)}
      onClick={() => {
        iScrollIntoView(target);
      }}
      {...others}
    >
      {children}
    </div>
  );
};

const Wheel: React.FC<IWheelProps> = (props) => {
  const { options, isScrollSnape = isSupportSnape() } = props;

  const view = useRef<string>('');

  const [focus, setFocus] = useState<string>();

  const container = useRef<HTMLDivElement>(null);

  const [value, onChange] = useControlState(props);

  const iEventListener = useDebounceFunc(() => {
    if (!isNullish(focus)) {
      const { current } = container;
      const element = iTarget({ id: focus, current, options });
      if (isHTMLElement(element) && view.current !== focus) {
        view.current = focus;
        iScrollIntoView(element);
      }
    }
  }, 0);

  useEffect(() => {
    const { current } = container;
    if (current && !isScrollSnape) {
      const { call, cancel } = iEventListener;
      current?.addEventListener('scrollend', call);
      return () => {
        cancel();
        current?.removeEventListener('scrollend', call);
      };
    }
  }, [container, iEventListener, isScrollSnape]);

  const iScroll = useDebounceFunc(() => {
    const index = options?.findIndex((option, index) => {
      const id = identified(option?.value, index);
      const selector = `[${WHEEL_ITEM_ID_NAME}="${id}"]`;
      const element = container.current?.querySelector(selector);
      return isCentered(element, container.current);
    });

    if (!isNullish(index) && options?.[index]) {
      onChange(options[index].value);
      setFocus(identified(options[index]?.value, index));
    }
  }, 1 * FRAME2MS);

  useEffect(() => {
    isNonEmptyArray(options) && iScroll.call();
  }, [iScroll, options]);

  useEffectOnce(
    () => {
      const { current } = container;
      const index = options?.findIndex((e) => e.value === value);
      const element = iTarget({ index, current, options });
      isHTMLElement(element) && iScrollIntoView(element);
    },
    !isNullish(value) && isNonEmptyArray(options)
  );

  return (
    <div
      ref={container}
      className={classNames(styles.wheel, {
        [styles.isScrollSnap]: isScrollSnape,
      })}
      onScroll={iScroll.call}
    >
      <IWheelOption key={-3} container={container} />
      <IWheelOption key={-2} container={container} />
      <IWheelOption key={-1} container={container} />
      {options?.map((option, index) => {
        const id = identified(option?.value, index);
        return (
          <IWheelOption
            key={id}
            container={container}
            isFocus={focus === id}
            {...{ [WHEEL_ITEM_ID_NAME]: id }}
          >
            {option.label}
          </IWheelOption>
        );
      })}
      <IWheelOption key={1} container={container} />
      <IWheelOption key={2} container={container} />
      <IWheelOption key={3} container={container} />
    </div>
  );
};

export const IWheel = memo(Wheel, isDeepEqual);
