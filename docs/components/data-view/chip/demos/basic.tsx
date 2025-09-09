import { Variants } from 'docs/widgets';

import type { IChipProps } from '@/components';
import { IChip, IFlex } from '@/components';

const App: React.FC = () => (
  <Variants variants={['filled', 'bordered'] satisfies IChipProps['variant'][]}>
    {({ density, variant }) => (
      <IFlex gap={8}>
        <IChip density={density} variant={variant}>
          Chip
        </IChip>
      </IFlex>
    )}
  </Variants>
);

export default App;
