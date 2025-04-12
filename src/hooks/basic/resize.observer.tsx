import { useEffect } from 'react';
import { funnel, isFunction, last } from 'remeda';

import type { ReactTargetType } from '@/models';
import { iFindElement, isHTMLElement } from '@/utils';

export type ResizeObserverOpts = {
  enabled?: boolean;
  debounce?: number;
};

export interface ResizeObserverFunc {
  (entry: ResizeObserverEntry): void;
}

export function useResizeObserver(
  target?: ReactTargetType,
  func?: ResizeObserverFunc,
  params: ResizeObserverOpts = {}
) {
  const { enabled = true, debounce: wait } = params;
  useEffect(() => {
    const element = iFindElement(target);

    if (enabled && isFunction(func) && isHTMLElement(element)) {
      const callback = wait
        ? funnel(func, { minQuietPeriodMs: wait }).call
        : func;

      const observer = new ResizeObserver((entries) => {
        callback(last(entries)!);
      });

      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    }
  }, [target, enabled, wait, func]);
}
