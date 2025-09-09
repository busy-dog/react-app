import { useState } from 'react';
import { first } from 'remeda';

import type { ISignType } from '@/components';
import { ICard, ISelector, ISignLine } from '@/components';
import { iArray } from 'src/utils';

const options = [
  { value: 'ban' },
  { value: 'tick' },
  { value: 'plus' },
  { value: 'minus' },
  { value: 'cross' },
  { value: 'clock' },
  { value: 'helper' },
  { value: 'info' },
  { value: 'magnifier' },
  { value: 'arrowTop' },
  { value: 'arrowLeft' },
  { value: 'arrowRight' },
  { value: 'arrowBottom' },
  { value: 'arrowDoubleTop' },
  { value: 'arrowDoubleLeft' },
  { value: 'arrowDoubleRight' },
  { value: 'arrowDoubleBottom' },
] satisfies { value: ISignType }[];

const Welcome: React.FC = () => {
  const [sign, setSign] = useState<ISignType>('clock');
  return (
    <ICard>
      <ISelector
        density="lg"
        options={options}
        prefix={<ISignLine ring type={sign} />}
        value={sign}
        onChange={(val) => {
          setSign(first(iArray(val)) as ISignType);
        }}
      />
    </ICard>
  );
};

export default Welcome;
