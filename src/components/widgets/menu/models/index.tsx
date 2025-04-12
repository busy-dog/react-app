import type { ReactRender, ReactWrapProps } from '@/models';
import type { OmitOf, RecipeModel } from '@/utils';

import type { ControlOption, ControlValue, ControlValues } from '../../control';
import type { IEmptyWrapProps } from '../../empty';

export interface IMenuRef {
  native: HTMLDivElement;
  scroll: (recipe: RecipeModel<number>) => void;
  select: (recipe?: RecipeModel<ControlValue | ControlValues>) => void;
}

export interface IMenuState {
  /**
   * 是否开启多选
   */
  multiple?: boolean;
  /**
   * 选中的值
   */
  values?: ControlValues;
}

export interface IMenuChangeFunc {
  (value?: ControlValue | ControlValues): void;
}

export interface IMenuSelectFunc {
  (value: ControlValues, index: number): void;
}

export type IMenuEmptyRender = ReactRender<IEmptyWrapProps, IMenuState>;

export type IMenuOptionRender = ReactRender<
  {
    index: number;
    option: ControlOption;
    onChange: IMenuChangeFunc;
    onSelect?: IMenuSelectFunc;
  },
  IMenuState
>;

type IMenuRenders = {
  empty?: IMenuEmptyRender;
  option?: IMenuOptionRender;
};

export interface IMenuProps
  extends OmitOf<IMenuState, 'values'>,
    ReactWrapProps {
  value?: ControlValue | ControlValues;
  /**
   * 选项
   */
  options?: ControlOption[];
  /**
   * 渲染方法
   */
  render?: IMenuRenders;
  /**
   * 选中选项时触发的回调。
   */
  onChange?: IMenuChangeFunc;
  /**
   * 聚焦选项时触发的回调
   */
  onSelect?: IMenuSelectFunc;
}
