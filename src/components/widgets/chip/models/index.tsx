import type { HTMLMotionProps } from 'motion/react';

import type { COLOR_DISC } from '@/constants';
import type { ReactRender } from '@/models';

import type { ControlUIDensity } from '../../control';
import type { ISVGWrapProps } from '../../svg-wrap';

export interface IChipState {
  /**
   * 控制是否呈现关闭按钮。
   */
  closeable?: boolean;
  /**
   * 控制是否呈现可点击样式。
   */
  clickable?: boolean;
  /**
   * 控制是否呈现禁用样式。
   * @default false
   */
  disabled?: boolean;
  /**
   * 控制控件的尺寸大小
   *  @default 'md'
   */
  density?: ControlUIDensity;
  /**
   * 控制控件的呈现方式
   * @default 'bordered'
   */
  variant?: 'filled' | 'bordered';
  /**
   * 控制是否呈现加载中样式。
   */
  isLoading?: boolean;
}

export type IChipCloseFunc = (event: React.UIEvent<HTMLElement>) => void;

export type IChipPrefixRender = ReactRender<
  ISVGWrapProps & {
    icon?: React.ReactNode;
    onClose: IChipCloseFunc;
  },
  IChipState
>;

export type IChipSuffixRender = ReactRender<
  ISVGWrapProps & {
    icon?: React.ReactNode;
    onClose: IChipCloseFunc;
  },
  IChipState
>;

export interface IChipRenders {
  prefix?: IChipPrefixRender;
  suffix?: IChipSuffixRender;
}

export interface IChipProps extends IChipState, HTMLMotionProps<'span'> {
  color?: (typeof COLOR_DISC)[number];
  /**
   * 控制组件前缀图标。
   */
  icon?: React.ReactNode;
  /**
   * 自定义控件UI样式。
   */
  render?: IChipRenders;
  /**
   * 点击关闭按钮的回调事件。
   */
  onClose?: IChipCloseFunc;
}
