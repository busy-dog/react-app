/**
 * @description 保持函数引用不变
 */

import { useEffect, useRef } from 'react';

import type { ConstrainedFunc } from '@/utils';

export function useMemoFunc<T extends ConstrainedFunc<T>>(func?: T) {
  const ref = useRef<T | undefined>(func);

  useEffect(() => {
    ref.current = func;
  });

  const { current } = useRef(function (this: unknown, ...args) {
    return ref.current?.call(this, ...args);
  } as T);

  return current;
}
