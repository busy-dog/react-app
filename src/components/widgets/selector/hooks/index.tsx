import { useMemo } from 'react';
import { flushSync } from 'react-dom';
import { isNumber, isObjectType } from 'remeda';

import type { FloatingContext, MiddlewareState } from '@floating-ui/react';
import {
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { useDebounceFunc, useMemoFunc } from '@/hooks';
import type { ReactAction } from '@/models';
import { compact, iArray, isEmptyValue, isTrue, size2px } from '@/utils';

import type { ControlOption, ControlValues } from '../../control';
import { iPredicate } from '../helpers';
import type {
  ISelectorChangeHandle,
  ISelectorPredicate,
  ISelectorProps,
} from '../models';

export const useIFloating = (params: {
  open?: boolean;
  onOpenChange?: (next?: boolean | undefined) => void;
}) => {
  const { open, onOpenChange } = params;

  const sync = useDebounceFunc(
    ({ rect, floating }: { floating: HTMLElement; rect: DOMRect }) => {
      flushSync(() => {
        floating.style.width = `${rect.width}px`;
      });
    }
  );

  const apply = useMemoFunc(
    ({
      elements: { floating, reference },
    }: MiddlewareState & {
      availableWidth: number;
      availableHeight: number;
    }) => {
      const rect = reference.getBoundingClientRect();
      sync.call({ floating, rect: rect as DOMRect });
      if (floating.getAttribute('data-resize') !== 'true') {
        floating.setAttribute('data-resize', 'true');
        sync.flush();
      }
    }
  );

  const padding = size2px(2);

  return useFloating<HTMLDivElement>({
    open,
    transform: false,
    placement: 'bottom',
    middleware: [
      offset(size2px(2)),
      flip({ padding }),
      size({ apply, padding }),
    ],
    onOpenChange,
    whileElementsMounted: autoUpdate,
  });
};

export const useIInteractions = (context: FloatingContext) => {
  const click = useClick(context, { toggle: false });

  const dismiss = useDismiss(context, {
    referencePressEvent: 'click',
    referencePress: false,
  });

  return useInteractions([click, dismiss]);
};

export const useFilterOptions = (
  options?: ControlOption[],
  params: {
    filter?: ISelectorProps['filter'];
    keyword?: string;
  } = {}
) => {
  const { filter, keyword } = params;

  const predicate = useMemo<ISelectorPredicate | undefined>(() => {
    if (isTrue(filter)) return iPredicate;
    if (isObjectType(filter)) return filter?.predicate;
  }, [filter]);

  return useMemo(() => {
    if (!predicate) return options;
    return options?.filter((option) => {
      return predicate(option, keyword);
    });
  }, [predicate, keyword, options]);
};

export const useArrowKeyDown = ({
  active,
  values,
  options,
  multiple,
  onChange,
  setActive,
}: {
  setActive: ReactAction<number | undefined>;
  onChange: ISelectorChangeHandle;
  values?: ControlValues;
  options?: ControlOption[];
  multiple?: boolean;
  active?: number;
}) =>
  useMemoFunc((event: React.KeyboardEvent<HTMLInputElement>) => {
    const { code } = event;
    event.stopPropagation();
    if (!isEmptyValue(options)) {
      switch (code) {
        case 'Backspace':
          if (multiple) {
            onChange((cur) => {
              const curs = compact(iArray(cur));
              return curs.slice(0, -1);
            });
          }
          break;
        case 'Enter':
          if (isNumber(active)) {
            const current = options[active];
            if (current) {
              onChange((cur) => {
                if (multiple) {
                  const curs = compact(iArray(cur));
                  return values?.includes(current.value)
                    ? curs.filter((val) => val !== current.value)
                    : curs.concat([current.value]);
                }
                return current.value;
              });
            }
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          setActive((cur) => (cur ?? -1) + 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActive?.((cur) => (cur ?? options.length) - 1);
          break;
        default:
          break;
      }
    }
  });
