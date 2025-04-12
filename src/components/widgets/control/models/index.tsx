import type React from 'react';
import type { FocusEvent } from 'react';

import type { ReactHTMLRef, ReactRender, ReactWrapProps } from '@/models';
import type { Nil, OmitOf } from '@/utils';

/** 控件大小 */
export type ControlUISize = 'mini' | 'medium' | 'huge';

/** 控件大小 */
export type ControlAlign = 'start' | 'center' | 'end';

/** 控件排版方向 */
export type ControlUIDirection = 'horizontal' | 'vertical';

/** 控件交互方式 */
export type ControlPattern =
  | 'disabled'
  | 'editable'
  | 'readOnly'
  | 'readPretty';

/** 控件校验状态 */
export type ControlUIStatus = 'vaildating' | 'danger' | 'warn' | 'success';

export type ControlValue = React.Key | null | undefined;

export type ControlValues = Exclude<ControlValue, Nil>[];

export type ControlOption = {
  value: React.Key;
  title?: string;
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

export type IControlVariant = 'filled' | 'standard' | 'bordered';

export type IControlWrapState = {
  size?: ControlUISize;
  status?: ControlUIStatus;
  pattern?: ControlPattern;
  isFocus?: boolean;
  isLoading?: boolean;
  isFocusWithin?: boolean;
  isPrefixClickable?: boolean;
  isSuffixClickable?: boolean;
  variant?: IControlVariant;
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
