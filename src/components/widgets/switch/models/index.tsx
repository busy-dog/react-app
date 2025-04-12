import type { HTMLMotionProps } from 'motion/react';

import type { ReactInputProps, ReactRender, ReactWrapProps } from '@/models';
import type { OmitOf } from '@/utils';

import type {
  ControlPattern,
  ControlUISize,
  ControlUIStatus,
  ControlValue,
} from '../../control';

interface ISwitchStatus {
  /**
   * 指定当前是否选中
   */
  checked: boolean;
  /**
   * 控制控件是否加载中。
   */
  isLoading: boolean;
  /**
   * 控制控件的交互方式。
   * @default 'success'
   */
  pattren: ControlPattern;
  /**
   * 控制控件的尺寸大小
   * @default 'medium'
   */
  size: ControlUISize;
  /**
   * 控制控件的校验状态。
   * @default 'success'
   */
  status: ControlUIStatus;
}

export interface ISwitchInputProps
  extends OmitOf<ReactInputProps, 'value' | 'size'> {
  /**
   * The `name` attribute of the input.
   */
  name?: string;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: ControlValue;
}

export type ISwitchRootRender = ReactRender<
  ReactWrapProps & {
    thumb?: React.ReactNode;
    input?: React.ReactNode;
    label?: React.ReactNode;
    ref: React.RefObject<HTMLDivElement | null>;
  },
  ISwitchStatus
>;

export type ISwitchIconRender = ReactRender<unknown, ISwitchStatus>;

export type ISwitchThumbRender = ReactRender<
  {
    icon?: React.ReactNode;
  } & HTMLMotionProps<'div'>,
  ISwitchStatus
>;

export type ISwitchInputRender = ReactRender<
  ISwitchInputProps & {
    ref: React.RefObject<HTMLInputElement | null>;
  },
  ISwitchStatus
>;

export type ISwitchLabelRender = ReactRender<ReactWrapProps, ISwitchStatus>;

type ISwitchRenders = {
  icon?: ISwitchIconRender;
  root?: ISwitchRootRender;
  input?: ISwitchInputRender;
  label?: ISwitchLabelRender;
  thumb?: ISwitchThumbRender;
};

export interface ISwitchRef {
  root?: HTMLDivElement;
  input?: HTMLInputElement;
}

export interface ISwitchProps
  extends ISwitchInputProps,
    Partial<ISwitchStatus> {
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  render?: ISwitchRenders;
}
