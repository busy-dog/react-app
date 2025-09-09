import { isString } from 'remeda';

import { ensure } from '@/utils';

import { useControlState, usePatternAssert } from '../control';
import { IRadio } from '../radio';
import type { IRadioGroupProps } from './models';

export const IRadioGroup: React.FC<IRadioGroupProps> = (props) => {
  const {
    name,
    value,
    render,
    options,
    defaultValue,
    density = 'md',
    pattern = 'editable',
    onChange,
  } = props;

  const assert = usePatternAssert(pattern);

  const [current, iChange] = useControlState({
    value,
    defaultValue,
    onChange,
  });

  if (assert.isReadPretty) {
    const option = options?.find(({ value }) => value === current);
    return option?.label ?? option?.title ?? option?.value?.toString();
  }

  return options?.map(({ title, value, disabled, ...rest }) => (
    <IRadio
      key={value?.toString()}
      checked={current === value}
      defaultChecked={defaultValue === value}
      density={density}
      label={value?.toLocaleString()}
      name={name}
      readOnly={assert.isReadOnly}
      render={render}
      title={ensure(isString(title) && title)}
      onChange={() => {
        iChange?.(value, {
          title,
          value,
          disabled,
          ...rest,
        });
      }}
      {...rest}
      disabled={disabled ?? assert.isDisabled}
    />
  ));
};
