import type { ReferenceType } from '@floating-ui/react';

import type {
  ReactInputProps,
  ReactRender,
  ReactTargetFunc,
  ReactWrapProps,
} from '@/models';
import type { OmitOf, RecipeModel } from '@/utils';

import type {
  ControlOption,
  ControlPattern,
  ControlValue,
  ControlValues,
  IControlWrapProps,
} from '../../control';
import type { IFloatingProps } from '../../floating';
import type { IInputProps } from '../../input';
import type { Presence } from '../presence';

export type ISelectorChangeFunc = (
  current?: ControlValue | ControlValues
) => void;

export type ISelectorChangeHandle = (
  next: RecipeModel<ControlValue | ControlValues>
) => void;

export type ISelectorState = Pick<
  IControlWrapProps,
  'suffix' | 'prefix' | 'isLoading' | 'variant' | 'size' | 'status'
> & {
  /**
   * 控件是否呈现清空按钮。
   */
  clearable?: boolean;
  /**
   * 控件是否处于聚焦状态
   */
  isFocus?: boolean;
  /**
   * 控件是否处于悬浮状态
   */
  isHover?: boolean;
  /**
   * 检索关键字
   */
  keyword?: string;
  /**
   * 是否开启多选
   */
  multiple?: boolean;
  /**
   * 控制下拉选单是否展开，如果为`true`则显示下拉选单
   */
  open?: boolean;
  /**
   * 控件交互状态
   */
  pattern?: ControlPattern;
  /**
   * 选中的值
   */
  value?: ControlValue | ControlValues;
  /**
   * 当前呈现的选单（过滤后的options）
   */
  filtered?: ControlOption[];
};

export type ISelectorChipsRender = ReactRender<
  {
    Container: typeof Presence;
    handleChange: ISelectorChangeHandle;
    options?: ControlOption[];
    separator?: React.ReactNode;
    values?: React.Key[] | null;
  },
  ISelectorState
>;

export type ISelectorOptionRender = ReactRender<
  {
    index: number;
    className: string;
    isActive: boolean;
    isSelected: boolean;
    option: ControlOption;
    handleChange: ISelectorChangeHandle;
  },
  ISelectorState
>;

export type ISelectorSearchRender = ReactRender<
  OmitOf<ReactInputProps, 'pattern' | 'onChange'> & {
    ref: React.RefObject<HTMLInputElement | null>;
  } & Pick<Required<ReactInputProps>, 'onChange'>,
  ISelectorState
>;

export type ISelectorFloatingRender = ReactRender<
  { virtualizer: React.ReactNode } & IFloatingProps,
  ISelectorState
>;

export type ISelectorRootRender = ReactRender<
  OmitOf<ReactWrapProps, 'prefix'> & {
    ref: (node: HTMLDivElement | null) => void;
    input?: HTMLInputElement | null;
    chips?: React.ReactNode;
    search?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    handleChange: ISelectorChangeHandle;
  },
  ISelectorState
>;

interface ISelectorRenders {
  /** 根元素渲染方法 */
  root?: ISelectorRootRender;
  /** 选中项的渲染方法 */
  chips?: ISelectorChipsRender;
  /** 检索区渲染方法 */
  search?: ISelectorSearchRender;
  /** 选项的渲染方法 */
  option?: ISelectorOptionRender;
  /** 下拉菜单的渲染方法 */
  floating?: ISelectorFloatingRender;
}

export interface ISelectorPredicate {
  (option: ControlOption, keyword?: string): boolean;
}

export type ISelectorRef = {
  input?: HTMLInputElement | null;
  floating: React.RefObject<ReferenceType | null>;
  reference: React.RefObject<ReferenceType | null>;
};

export interface ISelectorFilterParams {
  /** 过滤方式 */
  predicate?: ISelectorPredicate;
  /** 是否排序过滤结果 */
  compare?: ((cur: ControlValue, pre: ControlValue) => number) | boolean;
}

export interface QueryFloatingRootFunc {
  (
    reference: React.RefObject<ReferenceType | null>
  ): ReturnType<ReactTargetFunc> | undefined;
}

export interface ISelectorProps
  extends OmitOf<ISelectorState, 'isFocus' | 'isHover'>,
    OmitOf<ReactWrapProps, 'onFocus' | 'onBlur' | 'prefix' | 'onScroll'>,
    Pick<IInputProps, 'placeholder' | 'onFocus' | 'onBlur' | 'autoFocus'> {
  maxHeight?: React.CSSProperties['maxHeight'];
  options?: ControlOption[];
  /**
   * 控件默认选中的值。
   */
  defaultValue?: React.Key[] | React.Key;
  /**
   * 控件选项过滤配置。
   */
  filter?: ISelectorFilterParams | boolean;
  /**
   * 控件浮层样式。
   */
  iFloatingClassName?: string;
  /**
   * 浮层默认渲染到 root 上，也可以使用此方法指定根节点。
   */
  iFloatingRoot?: QueryFloatingRootFunc;
  /**
   * 是否默认打开
   */
  initialOpen?: boolean;
  /**
   * 分隔符
   */
  separator?: React.ReactNode;
  measure?: boolean;
  /**
   * 控件render方法
   */
  render?: ISelectorRenders;
  /**
   * 估算选项高度
   */
  estimateSize?: (index: number) => number;
  onChange?: ISelectorChangeFunc;
  /** 搜索值变更回调 */
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 控件浮层选单展开、收起时触发的回调。
   */
  onOpenChange?: (open?: boolean) => void;
}
