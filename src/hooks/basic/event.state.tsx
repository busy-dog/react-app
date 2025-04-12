import { useEffect } from 'react';

import type { ReactTargetType } from '@/models';
import { iFindElement, isHTMLElement } from '@/utils';

import { useToggle } from './toggle';

export type EventStateParams = {
  start: keyof HTMLElementEventMap;
  end: keyof HTMLElementEventMap;
  target?: ReactTargetType;
} & AddEventListenerOptions;

export const iHoverParams = (target: ReactTargetType): EventStateParams => ({
  target,
  end: 'mouseleave',
  start: 'mouseenter',
});

export const iFocusParams = (target: ReactTargetType): EventStateParams => ({
  target,
  end: 'focusout',
  start: 'focusin',
});

export const iComposingParams = (
  target: ReactTargetType
): EventStateParams => ({
  target,
  end: 'compositionend',
  start: 'compositionstart',
});

export function useEventState(params: EventStateParams) {
  const { end, start, target, passive = true, capture } = params ?? {};

  const [state, { on, off }] = useToggle(false);

  useEffect(() => {
    const element = iFindElement(target);

    if (isHTMLElement(element)) {
      const options = { passive, capture };
      element.addEventListener(end, off, options);
      element.addEventListener(start, on, options);

      return () => {
        element.removeEventListener(end, off);
        element.removeEventListener(start, on);
      };
    }
  }, [target, on, off, end, start, passive, capture]);

  return state;
}
