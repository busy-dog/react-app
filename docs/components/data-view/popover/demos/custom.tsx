import { useRef, useState } from 'react';

import type { Placement } from '@floating-ui/react';

import { IButton, IFlex, IPopover, IRadioGroup } from '@/components';

const App: React.FC = () => {
  const ref = useRef(null);

  const [placement, setPlacement] = useState<Placement>('top');

  return (
    <IFlex vertical gap={8} style={{ width: '100%' }}>
      <IFlex wrap gap={6}>
        <IRadioGroup
          options={(
            [
              'top',
              'top-end',
              'top-start',
              'bottom',
              'bottom-end',
              'bottom-start',
              'left',
              'left-end',
              'left-start',
              'right',
              'right-end',
              'right-start',
            ] satisfies Placement[]
          ).map((value) => ({ value }))}
          value={placement}
          onChange={(v) => setPlacement(v as Placement)}
        />
      </IFlex>
      <IFlex
        ref={ref}
        centered
        style={{ position: 'relative', padding: 'var(--gap-10)' }}
      >
        <IPopover
          open
          content={placement}
          placement={placement}
          render={{
            reference: (props) => (
              <IButton density="lg" tabIndex={0} {...props}>
                {placement}
              </IButton>
            ),
          }}
          root={ref}
          trigger={'click'}
          variant="tooltip"
        />
      </IFlex>
    </IFlex>
  );
};

export default App;
