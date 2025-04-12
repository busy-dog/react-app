/**
 * @description 监听鼠标点击元素区域外的事件
 */

import { useEffect } from 'react';
import { isArray, isNullish } from 'remeda';

import type { ReactTargetType } from '@/models';
import { compact, iFindElement, isHTMLElement, isTrue } from '@/utils';

import { useMemoFunc } from './memo.func';

export type ClickAwayParams = {
  enabled?: boolean;
  container?: HTMLElement;
};

export function useClickAway(
  event: (e: Event) => void,
  target: ReactTargetType | ReactTargetType[],
  params: ClickAwayParams = {}
) {
  const { enabled = true, container = document.body } = params;

  const listener = useMemoFunc<EventListener>((e) => {
    const current = e.target;
    if (isHTMLElement(current)) {
      const targets = isArray(target) ? target : [target];
      const elements = compact(targets.map(iFindElement));
      const parent = elements.find((item) => item.contains?.(current));
      isNullish(parent) && event?.(e);
    }
  });

  useEffect(() => {
    if (isTrue(enabled)) {
      container.addEventListener('click', listener);
      return () => {
        container.removeEventListener('click', listener);
      };
    }
  }, [container, enabled, listener]);
}
