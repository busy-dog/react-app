import { isNumber, isString } from '@busymango/is-esm';
import { and, compact } from '@busymango/utils';

import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

import type { ControlOption } from '../../control';

export const WHEEL_ITEM_ID_NAME = 'data-ui-wheel-option';

export const identified = (value: ControlOption['value'], index: number) => {
  return compact([index.toString(), value]).join('.');
};

export const iTarget = ({
  id,
  index,
  options,
  current,
}: {
  id?: string;
  index?: number;
  options?: ControlOption[];
  current?: HTMLDivElement | null;
}) => {
  if (options) {
    const selector = (() => {
      const target = (() => {
        if (isString(id)) return id;
        if (isNumber(index) && options[index]) {
          const option = options[index];
          return identified(option.value, index);
        }
      })();

      if (isString(target)) {
        return `[${WHEEL_ITEM_ID_NAME}="${target}"]`;
      }
    })();
    if (isString(selector)) return current?.querySelector(selector);
  }
};

export const iScrollIntoView = (target?: ReactTargetType) => {
  iFindElement(target)?.scrollIntoView({
    block: 'center',
    inline: 'center',
  });
};

export const isSupportSnape = () =>
  and(
    [
      ['scroll-snap-type', 'y mandatory'],
      ['scroll-snap-stop', 'normal'],
      ['scroll-snap-align', 'center'],
    ] satisfies [string, string][],
    (args) => CSS.supports(...args)
  );
