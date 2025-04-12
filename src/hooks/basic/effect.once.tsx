import { useEffect, useRef } from 'react';

import { isTrue } from '@/utils';

export function useEffectOnce(callback: React.EffectCallback, enabled = true) {
  const once = useRef(true);

  useEffect(() => {
    if ([once.current, enabled].every(isTrue)) {
      once.current = false;
      return callback();
    }
  }, [callback, enabled]);
}
