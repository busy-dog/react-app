import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { isBoolean } from 'remeda';

import { isInputElement } from '@/utils';

import { useMemoFunc } from './memo.func';

export function useToggle(initial = false) {
  const [open, setOpen] = useState(initial);

  const on = useMemoFunc(() => setOpen(true));

  const off = useMemoFunc(() => setOpen(false));

  const toggle = useMemoFunc((value?: unknown) => {
    setOpen((state) => (isBoolean(value) ? value : !state));
  });

  const iCheck = useMemoFunc((event?: ChangeEvent<HTMLInputElement>) => {
    if (isInputElement(event?.target)) {
      setOpen(event.target.checked);
    }
  });

  const actions = useMemo(
    () => ({ on, off, toggle, iCheck }),
    [on, off, toggle, iCheck]
  );

  return [open, actions] as const;
}
