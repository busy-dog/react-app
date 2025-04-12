import { useEffect, useRef } from 'react';
import { funnel } from 'remeda';

import type { ConstrainedFunc } from '@/utils';

export function useDebounceFunc<T extends ConstrainedFunc<T>>(
  func?: T,
  wait = 300
) {
  const ref = useRef<T | undefined>(func);

  useEffect(() => {
    ref.current = func;
  });

  const memo = useRef(
    funnel<Parameters<T>>(
      function (this: unknown, ...args) {
        return ref.current?.call(this, ...args);
      } as T,
      { minQuietPeriodMs: wait }
    )
  );

  useEffect(() => {
    memo.current?.cancel();
    memo.current = funnel<Parameters<T>>(
      function (this: unknown, ...args) {
        return ref.current?.call(this, ...args);
      } as T,
      { minQuietPeriodMs: wait }
    );
  }, [wait]);

  return memo.current;
}
