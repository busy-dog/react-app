import { useEffect, useState } from 'react';

import type { ConstrainedFunc } from '@/utils';

import { useMemoFunc } from './memo.func';

export const useTimeout = <T extends ConstrainedFunc<T>>(
  func?: T,
  params?: {
    wait?: number;
    enabled?: boolean;
  }
) => {
  const [key, setKey] = useState(0);

  const { enabled, wait } = params ?? {};

  useEffect(() => {
    if (key >= 0 && enabled && func) {
      const timer = setTimeout(func, wait);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [key, enabled, wait, func]);

  return useMemoFunc(() => {
    setKey((num) => (num + 1) % 1_000);
  });
};
