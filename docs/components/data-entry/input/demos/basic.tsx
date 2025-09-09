import { useRef } from 'react';
import { Variants } from 'docs/widgets';

import type { IControlWrapProps, IInputProps } from '@/components';
import { IInput, ISignLine, onInputCatch, useControlState } from '@/components';
import { isEmptyValue } from 'src/utils';

import AccountSVG from '@/icons/identifier/account.svg?react';

const Input: React.FC<
  IInputProps &
    Pick<IControlWrapProps, 'density' | 'variant' | 'status'> & {
      onClear?: () => void;
    }
> = (props) => {
  const {
    density,
    variant,
    status,
    value,
    pattern,
    onClear,
    onChange,
    ...others
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const [text, handler] = useControlState({
    value,
    onChange,
    onCatch: onInputCatch,
  });

  const isSuffixClickable = !isEmptyValue(text);

  //    <IInput ref={ref} pattern={pattern} {...others} />
  return (
    <IInput
      density={density}
      isSuffixClickable={isSuffixClickable}
      pattern={pattern}
      placeholder="占位文本"
      prefix={<AccountSVG />}
      status={status}
      suffix={isSuffixClickable && <ISignLine type="cross" />}
      value={text}
      variant={variant}
      onChange={handler}
      onSuffixClick={onClear}
    />
  );
};

const App: React.FC = () => (
  <Variants
    densifiable
    patternable
    statusable
    variants={
      [
        'bordered',
        'filled',
        'standard',
      ] satisfies IControlWrapProps['variant'][]
    }
  >
    {({ density, status, variant, pattern }) => (
      <Input
        density={density}
        pattern={pattern}
        status={status}
        variant={variant}
      />
    )}
  </Variants>
);

export default App;
