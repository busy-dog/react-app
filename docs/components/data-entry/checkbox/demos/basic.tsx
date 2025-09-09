import { Variants } from 'docs/widgets';

import { ICheckbox, IFlex } from '@/components';

const App: React.FC = () => (
  <Variants densifiable patternable>
    {({ pattern, density }) => (
      <IFlex gap={8}>
        <ICheckbox density={density} label="Checkbox" pattren={pattern} />
      </IFlex>
    )}
  </Variants>
);

export default App;
