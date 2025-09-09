import GmailSVG from 'docs/icons/gmail.svg?react';
import { Variants } from 'docs/widgets';

import type { ControlOption } from '@/components';
import { ISegment } from '@/components';

const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']
  .map<ControlOption>((value) => ({ value, label: value }))
  .concat([
    {
      value: 'Gmail',
      label: 'Gmail',
      icon: <GmailSVG />,
      disabled: true,
    },
  ]);

const App: React.FC = () => (
  <Variants densifiable directionable widthable>
    {({ density, width, direction }) => (
      <ISegment
        density={density}
        isFullWidth={width === 'full-width'}
        options={options}
        vertical={direction === 'vertical'}
      />
    )}
  </Variants>
);

export default App;
