import type React from 'react';

import type { ReactHTMLRef, ReactRender, ReactWrapProps } from '@/models';
import type { Nil, OmitOf } from '@/utils';

/** 控件排版方向 */
export type ControlUIAlign = 'start' | 'center' | 'end';

/** 控件密度 */
export type ControlUIDensity = 'sm' | 'md' | 'lg';

/** 控件变体 */
export type ControlUIVariant = 'filled' | 'standard' | 'bordered';

/** 控件排版方向 */
export type ControlUIDirection = 'horizontal' | 'vertical';

/** 控件校验状态 */
export type ControlStatus = 'vaildating' | 'danger' | 'warn' | 'success';

/** 控件交互方式 */
export type ControlPattern =
  | 'disabled'
  | 'editable'
  | 'readOnly'
  | 'readPretty';

export type ControlValue = PropertyKey | Nil | bigint;

export type ControlValues = ControlValue[];

export type ControlOption = {
  value: ControlValue;
  title?: React.ReactNode;
  label?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
} & Pick<React.CSSProperties, 'color'>;

export interface InteractionProps {
  style?: React.CSSProperties;
  ref: (node: HTMLElement | SVGElement | null) => void;
  onBlur?(e: React.FocusEvent): void;
  onFocus?(e: React.FocusEvent): void;
  onClick?(e: React.MouseEvent): void;
  onKeyUp?(e: React.KeyboardEvent): void;
  onKeyDown?(e: React.KeyboardEvent): void;
  onMouseDown?(e: React.MouseEvent): void;
  onMouseMove?(e: React.MouseEvent): void;
  onPointerDown?(e: React.UIEvent): void;
  onPointerEnter?(e: React.UIEvent): void;
}

export type IControlWrapState = {
  isFocus?: boolean;
  isLoading?: boolean;
  isFocusWithin?: boolean;
  isPrefixClickable?: boolean;
  isSuffixClickable?: boolean;
  density?: ControlUIDensity;
  variant?: ControlUIVariant;
  pattern?: ControlPattern;
  status?: ControlStatus;
};

export type IControlWrapRootRender = ReactRender<
  OmitOf<ReactWrapProps, 'prefix' | 'children'> & {
    ref: React.RefObject<HTMLDivElement | null>;
    prefix: React.ReactNode;
    suffix: React.ReactNode;
    children?: React.ReactNode;
  },
  IControlWrapState
>;

export interface IControlWrapProps
  extends React.PropsWithChildren,
    OmitOf<IControlWrapState, 'isFocus'>,
    OmitOf<ReactWrapProps, 'prefix' | 'children'> {
  ref?: ReactHTMLRef<HTMLDivElement>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  render?: {
    root?: IControlWrapRootRender;
  };
  onPrefixClick?: React.MouseEventHandler<HTMLDivElement>;
  onSuffixClick?: React.MouseEventHandler<HTMLDivElement>;
}
