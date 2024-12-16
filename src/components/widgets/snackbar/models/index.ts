import type { HTMLMotionProps } from 'motion/react';

import type { OmitOf } from '@busymango/utils';

import type { ControlUISize } from '../../control';

export type ISnackbarAPI = {
  id: React.Key;
  reset: () => void;
  destory: () => void;
};

export type ISnackbarStatus = 'success' | 'info' | 'danger' | 'warn';

export interface ISnackbarProps extends OmitOf<HTMLMotionProps<'div'>, 'id'> {
  id: React.Key;
  /** 自动关闭的延时，单位秒。设为 0 时不自动关闭	number	3 */
  duration?: number;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 自定义关闭图标 */
  close?: React.ReactNode;
  /** 控件尺寸 */
  size?: ControlUISize;
  /** 变体 */
  variant?: 'filled' | 'bordered';
  /** 状态 */
  status?: ISnackbarStatus;
  /** 组件卸载时的回调 */
  onExit?: (api: ISnackbarAPI) => void;
}

export type ISnackbarStore = {
  max?: number;
  snackbars: ISnackbarProps[];
};

export type ISnackbarActions = {
  destory: (key: React.Key) => void;
  emit: (config: OmitOf<ISnackbarProps, 'onExit'>) => Promise<void>;
  setMaxCount: (recipe: (previous?: number) => number) => void;
};
