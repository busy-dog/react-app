import type { RefObject } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';
import type { ReferenceType } from '@floating-ui/react';

import type {
  ReactInputProps,
  ReactRender,
  ReactTargetFunc,
  ReactWrapProps,
} from '@/models';

import type {
  ControlOption,
  ControlPattern,
  ControlValue,
  IControlWrapProps,
} from '../../control';
import type { IInputProps, IInputRef } from '../../input';
import type { ScrollableProps, ScrollableRef } from '../../scrollable';

export type ISelectorState = Pick<
  IControlWrapProps,
  'suffix' | 'prefix' | 'isLoading' | 'variant' | 'size' | 'status'
> & {
  /**
   * 控件是否呈现清空按钮
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
  value?: React.Key[] | React.Key;
};

export type ISelectorChipRender = ReactRender<
  {
    option?: ControlOption;
    onClose?: () => void;
  },
  ISelectorState
>;

export type ISelectorOptionRender = ReactRender<
  {
    isActive?: boolean;
    isSelected?: boolean;
    option?: ControlOption;
  },
  ISelectorState
>;

export type ISelectorSearchRender = ReactRender<
  ReactInputProps & {
    ref: RefObject<IInputRef>;
  },
  ISelectorState
>;

export type ISelectorScrollableRender = ReactRender<
  ScrollableProps & {
    ref: React.RefObject<ScrollableRef>;
  },
  ISelectorState
>;

export type ISelectorRootRender = ReactRender<
  OmitOf<HTMLMotionProps<'div'>, 'prefix'> & {
    ref: (node: HTMLDivElement | null) => void;
    chips?: React.ReactNode;
    search?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    iChange?: (current?: React.Key | React.Key[]) => void;
  },
  ISelectorState
>;

interface ISelectorRenders {
  /** 根元素渲染方法 */
  root?: ISelectorRootRender;
  /** 选中项的渲染方法 */
  chip?: ISelectorChipRender;
  /** 检索区渲染方法 */
  search?: ISelectorSearchRender;
  /** 选项的渲染方法 */
  option?: ISelectorOptionRender;
  /** 下拉菜单的渲染方法 */
  scrollable?: ISelectorScrollableRender;
}

export interface ISelectorPredicate {
  (option: ControlOption, keyword?: string): boolean;
}

export type ISelectorRef = {
  input?: HTMLInputElement | null;
  floating: React.MutableRefObject<ReferenceType | null>;
  reference: React.MutableRefObject<ReferenceType | null>;
};

export interface ISelectorFilterParams {
  /** 过滤方式 */
  predicate?: ISelectorPredicate;
  /** 是否排序过滤结果 */
  compare?: ((cur: ControlValue, pre: ControlValue) => number) | boolean;
}

export interface QueryFloatingRootFunc {
  (
    reference: React.MutableRefObject<ReferenceType | null>
  ): ReturnType<ReactTargetFunc> | undefined;
}

export interface ISelectorProps
  extends Pick<IInputProps, 'placeholder' | 'onFocus' | 'onBlur' | 'autoFocus'>,
    OmitOf<ISelectorState, 'isFocus' | 'isHover'>,
    OmitOf<
      ReactWrapProps,
      | 'onChange'
      | 'defaultValue'
      | 'onFocus'
      | 'onBlur'
      | 'prefix'
      | 'onScroll'
      | 'onSelect'
    >,
    Pick<
      ScrollableProps,
      | 'maxHeight'
      | 'options'
      | 'multiple'
      | 'value'
      | 'onChange'
      | 'measure'
      | 'onScroll'
      | 'onSelect'
    > {
  /**
   * 默认选中的值
   */
  defaultValue?: React.Key[] | React.Key;
  /**
   * 选项过滤配置
   */
  filter?: ISelectorFilterParams | boolean;
  /**
   * 浮层默认渲染到 root 上，也可以使用此方法指定根节点。
   * @param reference 参数元素引用
   * @returns HTMLElement
   */
  iFloatingRoot?: QueryFloatingRootFunc;
  /**
   * 浮层样式
   */
  iFloatingClassName?: string;
  /**
   * 是否默认打开
   */
  initialOpen?: boolean;
  /**
   * 分隔符
   */
  separator?: React.ReactNode;
  /**
   * 控件render方法
   */
  render?: ISelectorRenders;
  /** 搜索值变更回调 */
  onSearch?: (value?: string) => void;
  /** 下拉菜单展开/收起事件 */
  onOpenChange?: (open?: boolean) => void;
}
