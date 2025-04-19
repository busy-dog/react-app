import { useMemo } from 'react';
import { produce } from 'immer';
import { useAnimate } from 'motion/react';
import { nanoid } from 'nanoid';
import { isNumber, merge } from 'remeda';
import { create } from 'zustand';

import { useMemoFunc } from '@/hooks';
import type { OmitOf } from '@/utils';
import { contains, crdnl, isReactNode } from '@/utils';

import type {
  ISnackbarActions,
  ISnackbarAPI,
  ISnackbarProps,
  ISnackbarStatus,
  ISnackbarStore,
} from '../models';

interface ISnackbarCall {
  (config: OmitOf<Partial<ISnackbarProps>, 'status'>): Promise<void>;
  (
    children: React.ReactNode,
    config?: OmitOf<Partial<ISnackbarProps>, 'status' | 'children'>
  ): Promise<void>;
}

export const iSnackbar = {
  apis: new Map<React.Key, ISnackbarAPI>(),
  emit: async (config: Partial<ISnackbarProps>) => {
    const initial: ISnackbarProps = { id: nanoid(), duration: 3000 };
    const options = merge(initial, config as ISnackbarProps);
    return await useSnackbars.getState().emit(options);
  },
  ...(() =>
    (['info', 'danger', 'warn', 'success'] satisfies ISnackbarStatus[]).reduce(
      (accom, status) => ({
        ...accom,
        [status]: ((
          init: React.ReactNode | OmitOf<Partial<ISnackbarProps>, 'status'>,
          opts?: OmitOf<Partial<ISnackbarProps>, 'status' | 'children'>
        ) =>
          useSnackbars.getState().emit({
            status,
            id: nanoid(),
            duration: 3000,
            ...(isReactNode(init) ? { children: init } : init),
            ...opts,
          })) as ISnackbarCall,
      }),
      {} as Record<ISnackbarStatus, ISnackbarCall>
    ))(),
};

export const useSnackbars = create<ISnackbarStore & ISnackbarActions>(
  (set, get) => ({
    max: Infinity,
    snackbars: [],
    setMaxCount: (recipe) => {
      set(
        produce((ref: ISnackbarStore) => {
          ref.max = recipe(ref.max);
        })
      );
    },
    destory: (key) => {
      set(
        produce(({ snackbars }: ISnackbarStore) => {
          const index = snackbars.findIndex(({ id }) => id === key);
          snackbars.splice(index, 1);
        })
      );
    },
    emit: async (config: ISnackbarProps) => {
      const { snackbars: previous, max } = get();
      const assert = ({ id }: ISnackbarProps) => id === config.id;
      if (contains(previous, assert)) {
        set(
          produce(({ snackbars }: ISnackbarStore) => {
            const i = snackbars.findIndex(assert);
            const current = snackbars[i];
            snackbars[i] = merge(current, config);
            iSnackbar.apis.get(current.id)?.reset();
          })
        );
      } else {
        await new Promise((onExit) => {
          set(
            produce(({ snackbars }: ISnackbarStore) => {
              snackbars.push({ ...config, onExit });
              const count = crdnl(snackbars);
              if (isNumber(max) && count > max) {
                snackbars.splice(0, count - max);
              }
            })
          );
        });
      }
    },
  })
);

export const useShakeAnimate = <T extends Element = HTMLElement>() => {
  const [scope, animate] = useAnimate<T>();

  const iShakeAnimate = useMemoFunc(async () => {
    await animate(
      scope.current,
      {
        rotate: [
          -10.24, 10.24, -2.56, 2.56, -0.64, 0.64, -0.16, 0.16, 0.04, -0.04, 0,
        ],
      },
      { duration: 1, velocity: 20, repeatType: 'reverse' }
    );
  });

  return useMemo(() => [scope, iShakeAnimate] as const, [scope, iShakeAnimate]);
};
