import type { ReactButtonProps, ReactRender } from '@/models';
import type { OmitOf } from '@/utils';

import type {
  ControlOption,
  ControlUIDensity,
  ControlValue,
} from '../../control';
import type { IFlexProps } from '../../flex';

export interface ISegmentState {
  /**
   * 控制控件是否禁用状态。
   */
  disabled?: boolean;
  /**
   * 控制控件是否只读状态。
   */
  readOnly?: boolean;
  /**
   * 将宽度调整为父元素宽度的选项
   */
  isFullWidth?: boolean;
  /**
   * 控件尺寸
   */
  density?: ControlUIDensity;
  /**
   * 控件的值
   */
  value?: ControlValue;
}

export interface ISegmentChangeFunc {
  (value: ControlValue): void;
}

export type ISegmentThumbRender = ReactRender<
  ControlOption & {
    isActive: boolean;
    layoutId: string;
  },
  ISegmentState
>;

export type ISegmentItemRender = ReactRender<
  OmitOf<ReactButtonProps, 'title'> & {
    thumb: React.ReactNode;
    onChange: ISegmentChangeFunc;
  } & ControlOption,
  ISegmentState
>;

export type ISegmentRootRender = ReactRender<
  OmitOf<IFlexProps, 'children'> & {
    segments: React.ReactNode;
  },
  ISegmentState
>;

type ISegmentRenders = {
  root?: ISegmentRootRender;
  item?: ISegmentItemRender;
  thumb?: ISegmentThumbRender;
};

export interface ISegmentProps
  extends ISegmentState,
    OmitOf<IFlexProps, 'children'> {
  /**
   *
   */
  defaultValue?: ControlOption['value'];
  /**
   * 数据化配置选项内容
   */
  options?: ControlOption[];
  render?: ISegmentRenders;
  /**
   * 选项变化时的回调函数
   */
  onChange?: ISegmentChangeFunc;
}
