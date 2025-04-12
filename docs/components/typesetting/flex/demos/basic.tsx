import { useState } from 'react';
import { first, last } from 'remeda';

import { IFlex, IRadioGroup } from '@/components';

const palette = [
  'rgb(var(--blue-color-500) / 1)',
  'rgb(var(--blue-color-500) / 0.75)',
];

const App: React.FC = () => {
  const [value = 'horizontal', setValue] = useState<string>();
  return (
    <IFlex vertical gap={16}>
      <IFlex gap={8}>
        <IRadioGroup
          options={[
            {
              value: 'horizontal',
              label: 'horizontal',
            },
            {
              value: 'vertical',
              label: 'vertical',
            },
          ]}
          value={value}
          onChange={(value) => setValue(value?.toString())}
        />
      </IFlex>
      <IFlex vertical={value === 'vertical'}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '25%',
              height: 64,
              backgroundColor: i % 2 ? first(palette) : last(palette),
            }}
          />
        ))}
      </IFlex>
    </IFlex>
  );
};

export default App;
