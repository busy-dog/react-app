import { useEffect, useMemo, useState } from 'react';
import { funnel } from 'remeda';

export function useDebounceState<T = unknown>(state?: T, wait = 300) {
  const [iState, setMemoState] = useState<T | undefined>(state);

  const func = useMemo(
    () =>
      funnel<Parameters<typeof setMemoState>>(setMemoState, {
        minQuietPeriodMs: wait,
      }),
    [wait]
  );

  useEffect(() => {
    func.call(state);
  }, [state, func]);

  return iState;
}
