import type { ReactInputProps, ReactRender, ReactWrapProps } from '@/models';
import type { OmitOf } from '@/utils';

import type { ControlOption, ControlUISize, ControlValue } from '../../control';

interface InputProps extends OmitOf<ReactInputProps, 'size' | 'value'> {}

export interface IRadioRef {
  input: HTMLInputElement;
}

export interface IRadioState {
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 默认是否选中
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 是否只读
   */
  readOnly: boolean;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: ControlUISize;
  /**
   * input标签的value
   */
  value?: ControlValue | ControlOption['value'];
}

export type IRadioRootRender = ReactRender<
  ReactWrapProps<HTMLSpanElement> & {
    radio: React.ReactNode;
    label: React.ReactNode;
  },
  IRadioState
>;

export type IRadioRadioRender = ReactRender<
  ReactWrapProps & {
    input: React.ReactNode;
    inputRef: React.RefObject<HTMLInputElement | null>;
  },
  IRadioState
>;

export type IRadioInputRender = ReactRender<
  InputProps & {
    ref: React.RefObject<HTMLInputElement | null>;
  },
  IRadioState
>;

type IRadioRenders = {
  root?: IRadioRootRender;
  radio?: IRadioRadioRender;
  input?: IRadioInputRender;
};

export interface IRadioProps extends Partial<IRadioState>, InputProps {
  /**
   * 控件的文本。
   */
  label?: React.ReactNode;
  /**
   * 自定义控件UI。
   */
  render?: IRadioRenders;
}
