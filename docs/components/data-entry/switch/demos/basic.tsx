import { Variants } from 'docs/widgets';
import { AnimatePresence } from 'motion/react';

import type { ISwitchIconRender, ISwitchLabelRender } from '@/components';
import { IFlex, ISignLine, ISVGWrap, ISwitch } from '@/components';

const icon: ISwitchIconRender = (_, { checked, pattren }) => (
  <AnimatePresence>
    {pattren !== 'readPretty' && (
      <ISVGWrap>
        <ISignLine
          color={checked ? 'var(--success-color)' : 'var(--danger-color)'}
          type={checked ? 'tick' : 'cross'}
        />
      </ISVGWrap>
    )}
  </AnimatePresence>
);

const label: ISwitchLabelRender = (_, { checked }) =>
  checked ? '已开启' : '已关闭';

const App: React.FC = () => (
  <Variants patternable sizeable>
    {({ size, pattern }) => (
      <IFlex vertical gap={8}>
        <ISwitch pattern={pattern} size={size} />
        <ISwitch pattern={pattern} render={{ label, icon }} size={size} />
      </IFlex>
    )}
  </Variants>
);

export default App;
