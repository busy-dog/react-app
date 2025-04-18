import type { HTMLMotionProps } from 'motion/react';

import type { ReactRender, ReactTargetType, ReactWrapProps } from '@/models';
import type { OmitOf } from '@/utils';

import type { ControlOption } from '../../control';

export interface IWheelOptionProps {
  isFocus?: boolean;
  container: React.RefObject<HTMLDivElement | null>;
}

export interface IWheelProps {
  options?: ControlOption[];
  value?: ControlOption['value'];
  onChange?: (value?: ControlOption['value']) => void;
}

interface IPickerState {
  open: boolean;
}

export type IPickerRootRender = ReactRender<ReactWrapProps, IPickerState>;

export interface IPickerProps
  extends OmitOf<
    HTMLMotionProps<'div'>,
    'title' | 'onChange' | 'onSelect' | 'defaultValue'
  > {
  open?: boolean;
  root?: ReactTargetType;
  title?: React.ReactNode;
  initialOpen?: boolean;
  defaultValue?: ControlOption['value'][];
  value?: ControlOption['value'][];
  columns?: ControlOption[][];
  render?: {
    root?: IPickerRootRender;
  };
  onChange?: (value?: ControlOption['value'][]) => void;
  onSelect?: (value?: ControlOption['value'][]) => void;
  onOpenChange?: (open?: boolean) => void;
}
