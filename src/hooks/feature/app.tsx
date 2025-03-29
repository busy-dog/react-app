import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { produce } from 'immer';
import type { StoreApi } from 'zustand';
import { create } from 'zustand';

import { isBoolean, isFalse, isString, isTrue } from '@busymango/is-esm';

import { iThemeDefault } from '@/utils';

import { useEffectOnce, useMemoFunc } from '../basic';

type DocumentState = {
  /** 页面标题 */
  title?: string;
  /** 是否正在请求页面 */
  isLoadable?: boolean;
};

export type AppState = {
  /** 主题样式 */
  theme: string;
  /** 边栏是否收起 */
  collapsed: boolean;
  /** 页面是否可见 */
  display: DocumentVisibilityState;
  /** 页面状态(和路由地址一一对应) */
  document: Record<string, DocumentState>;
};

export type AppSetStateAction = StoreApi<AppState>['setState'];

export type AppStoreAction = {
  set: AppSetStateAction;
};

export const useAppStore = create<AppState & AppStoreAction>((set) => ({
  display: document.visibilityState,
  theme: iThemeDefault(),
  collapsed: false,
  document: {},
  set,
}));

export const useAppAction = () => useAppStore(({ set }) => set);

/** 获取APP是否可见 */
export const useAppDisplay = () => useAppStore(({ display }) => display);

/** 获取APP当前主题样式名称 */
export const useAppTheme = (source?: string) => {
  const setState = useAppAction();

  const dispatch = useMemoFunc((theme: string) => setState({ theme }));

  useEffect(() => {
    isString(source) && dispatch(source);
  }, [source, dispatch]);

  return useAppStore(({ theme }) => theme);
};

export const useAppCollapsed = (
  /** 控制边栏是否收起 */
  state?: boolean,
  /** 是否仅执行一次 */
  once = false
) => {
  const set = useAppAction();

  const dispatch = useMemoFunc((collapsed: boolean) => {
    set({ collapsed });
  });

  useEffect(() => {
    isFalse(once) && isBoolean(state) && dispatch(state);
  }, [once, state, dispatch]);

  useEffectOnce(() => dispatch(false), isTrue(once) && isBoolean(state));

  return useAppStore(({ collapsed }) => collapsed);
};

/** 获取APP当前页面的标题 */
export const useDocumentTitle = (state?: string) => {
  const setState = useAppAction();

  const { pathname } = useLocation();

  const dispatch = useMemoFunc((title: string) => {
    document.title = title;
    setState(
      produce(({ document }: AppState) => {
        if (document[pathname]) {
          document[pathname].title = title;
        } else {
          document[pathname] = { title };
        }
      })
    );
  });

  useEffect(() => {
    isString(state) && dispatch(state);
  }, [state, dispatch]);

  return useAppStore(({ document }) => document[pathname]?.title);
};
