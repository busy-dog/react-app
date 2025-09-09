import { Variants } from 'docs/widgets';

import type { ControlOption, ControlUIVariant } from '@/components';
import { ISelector } from '@/components';

const options: ControlOption[] = [
  { value: 10, label: 'Ten' },
  { value: 20, label: 'Twenty' },
  { value: 30, label: 'Thirty' },
];

const App: React.FC = () => (
  <Variants
    densifiable
    patternable
    statusable
    variants={['bordered', 'filled', 'standard'] satisfies ControlUIVariant[]}
  >
    {({ density, pattern, variant, status }) => (
      <ISelector
        density={density}
        options={options}
        pattern={pattern}
        placeholder="placeholder"
        status={status}
        variant={variant}
      />
    )}
  </Variants>
);

export default App;
