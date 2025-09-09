import type { ReactInputProps } from '@/models';
import type { OmitOf } from '@/utils';

import type { ControlPattern, IControlWrapProps } from '../../control';

export interface IInputCoreProps
  extends OmitOf<ReactInputProps, 'value' | 'width' | 'size'> {
  ref?: React.RefObject<HTMLInputElement | null>;
  /** 控件宽度 */
  width?: React.CSSProperties['width'];
  /** 控件值 */
  value?: ReactInputProps['value'] | null;
  /** 控件交互模式 */
  pattern?: ControlPattern;
  /** 回车事件 */
  onPressEnter?: ReactInputProps['onKeyDown'];
}

export interface IInputRef {
  wrap: HTMLElement;
  input: HTMLInputElement;
}

export interface IInputProps
  extends Pick<
      IControlWrapProps,
      | 'density'
      | 'status'
      | 'prefix'
      | 'suffix'
      | 'render'
      | 'variant'
      | 'pattern'
      | 'onPrefixClick'
      | 'onSuffixClick'
      | 'isSuffixClickable'
    >,
    OmitOf<IInputCoreProps, 'width' | 'ref' | 'prefix'> {
  ref?: React.RefObject<IInputRef | null>;
}
