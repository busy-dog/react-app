import type { PartialPick } from '@/utils';

import type { ControlOption, ControlPattern } from '../../control';
import type { IRadioProps } from '../../radio';

interface IRadioChange {
  (value?: ControlOption['value'] | null, option?: ControlOption): void;
}

export interface IRadioGroupProps
  extends PartialPick<IRadioProps, 'render' | 'size' | 'name'> {
  /**
   * 默认选中的值
   */
  defaultValue?: ControlOption['value'];
  /**
   * 选项
   */
  options?: ControlOption[];
  /**
   * 控件交互模式
   */
  pattern?: ControlPattern;
  /**
   * 选中的值
   */
  value?: ControlOption['value'];
  /**
   * 选中事件
   */
  onChange?: IRadioChange;
}
