import { Variants } from 'docs/widgets';

import type { ControlOption } from '@/components';
import { IRadioGroup } from '@/components';

const options: ControlOption[] = [
  { value: 1, label: '选项1' },
  { value: 2, label: '选项2' },
  { value: 3, label: '选项3' },
  { value: 4, label: '选项4', disabled: true },
  { value: 5, label: '选项5' },
  { value: 6, label: '选项6' },
  { value: 7, label: '一个超长超长超长的选项7' },
];

const App: React.FC = () => (
  <Variants densifiable patternable>
    {({ pattern, density }) => (
      <IRadioGroup
        density={density}
        name="IRadioGroup"
        options={options}
        pattern={pattern}
      />
    )}
  </Variants>
);

export default App;
