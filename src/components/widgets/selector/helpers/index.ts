import { isString } from 'remeda';

import {
  compact,
  ensure,
  iArray,
  isEmptyValue,
  isNonEmptyString,
} from '@/utils';

import type { ControlOption } from '../../control';
import type { ISignType } from '../../sign';
import type { ISelectorChangeHandle, ISelectorState } from '../models';

export const iSignType = ({
  clearable,
  isFocus,
  isHover,
  keyword,
  value,
  open,
}: Pick<
  ISelectorState,
  'open' | 'isFocus' | 'isHover' | 'clearable' | 'value' | 'keyword'
>): ISignType => {
  const iArrow: ISignType = open ? 'arrowTop' : 'arrowBottom';

  const isShowClear = clearable && (isFocus || isHover || open);

  return isShowClear && !isEmptyValue(value || keyword) ? 'cross' : iArrow;
};

export const iPredicate = (
  { title, label }: ControlOption,
  keyword?: string
) => {
  if (!isNonEmptyString(keyword)) return true;
  const text = isString(title) ? title : ensure(isString(label) && label);
  return text?.toLowerCase()?.includes(keyword?.toLowerCase()) ?? false;
};

export const iSelectorChangeHandler = (
  option: ControlOption,
  handleChange: ISelectorChangeHandle,
  {
    multiple,
    isSelected,
  }: {
    multiple?: boolean;
    isSelected?: boolean;
  }
) => {
  const { value } = option;
  if (!multiple) handleChange(value);
  if (multiple && isSelected) {
    handleChange((pre) => compact(iArray(pre)).filter((val) => val !== value));
  }
  if (multiple && !isSelected) {
    handleChange((pre) => compact(iArray(pre).concat([value])));
  }
};
