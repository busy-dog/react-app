import type { OmitOf } from '@/utils';

import type { ControlPattern } from '../../control';

export type ITextareaRef = React.RefObject<HTMLTextAreaElement | null>;

export type ITextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface ITextAreaProps
  extends OmitOf<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'children' | 'rows'
  > {
  // ref?: React.Ref<HTMLTextAreaElement>;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows?: number;

  pattern?: ControlPattern;
}
