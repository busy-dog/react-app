import type { SVGMotionProps } from 'motion/react';

import type { ReactInputProps, ReactWrapProps } from '@/models';
import type { OmitOf, PlainObject } from '@/utils';

import type {
  ControlPattern,
  ControlStatus,
  ControlUIDensity,
  ControlValue,
} from '../../control';

interface CheckboxStatus {
  label?: React.ReactNode;
  /**
   * 控制控件当前是否选中。
   */
  checked: boolean;
  /**
   * 如果为 true ，则组件显示为不确定。由于兼容性问题这里没有控制 input 的 indeterminate属性
   */
  indeterminate: boolean;
  /**
   * 设置控件的交互方式。
   */
  pattren: ControlPattern;
  /**
   * 设置控件尺寸。
   */
  density: ControlUIDensity;
  /**
   * 设置控件的校验状态。
   */
  status: ControlStatus;
}

interface IRender<P = PlainObject, E = unknown> {
  (props: P, state: CheckboxStatus & E): React.ReactNode;
}

export interface ICheckboxRef {
  root?: HTMLDivElement;
  input?: HTMLInputElement;
}

export interface ICheckboxInputProps extends OmitOf<ReactInputProps, 'value'> {
  /**
   * 控制控件 input 元素的值。
   */
  value?: ControlValue;
}

export type ICheckRootRender = IRender<
  {
    label: React.ReactNode;
    checkbox: React.ReactNode;
    ref: React.RefObject<HTMLDivElement | null>;
  } & ReactWrapProps
>;

export type ICheckBoxRender = IRender<
  {
    wave?: boolean;
    icon?: React.ReactNode;
    input?: React.ReactNode;
    inputRef: React.RefObject<HTMLInputElement | null>;
  } & ReactWrapProps
>;

export type ICheckInputRender = IRender<
  ICheckboxInputProps & {
    ref: React.RefObject<HTMLInputElement | null>;
  }
>;

export type ICheckIconRender = IRender<
  Pick<SVGMotionProps<SVGSVGElement>, 'className'>
>;

export interface ICheckboxRenders {
  icon?: ICheckIconRender;
  root?: ICheckRootRender;
  input?: ICheckInputRender;
  checkbox?: ICheckBoxRender;
}

export interface ICheckboxProps
  extends ICheckboxInputProps,
    Partial<CheckboxStatus> {
  /**
   * 控件是否默认选中。
   */
  defaultChecked?: boolean;
  /**
   * 是否呈现波纹反馈。
   */
  wave?: boolean;
  /**
   * 自定义控件UI。
   */
  render?: ICheckboxRenders;
}
