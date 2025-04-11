import { AnimatePresence } from 'motion/react';

import { IButton, IFlex, ISignLine, ISwitch } from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [enabled, { iCheck }] = useToggle();

  return (
    <IFlex vertical gap={8}>
      <ISwitch
        checked={enabled}
        render={{
          icon: (_, { checked }) => (
            <AnimatePresence>
              {!checked && (
                <ISignLine ring color="var(--danger-color-active)" type="ban" />
              )}
            </AnimatePresence>
          ),
        }}
        onChange={iCheck}
      />
      <IFlex wrap gap={8}>
        <IButton disabled={!enabled} variant="filled">
          主要按钮
        </IButton>
        <IButton disabled={!enabled} variant="bordered">
          次要按钮
        </IButton>
        <IButton disabled={!enabled} variant="text">
          文本按钮
        </IButton>
      </IFlex>
      <IFlex wrap gap={8}>
        <IButton danger disabled={!enabled} variant="filled">
          主要按钮
        </IButton>
        <IButton danger disabled={!enabled} variant="bordered">
          次要按钮
        </IButton>
        <IButton danger disabled={!enabled} variant="text">
          文本按钮
        </IButton>
      </IFlex>
    </IFlex>
  );
};

export default App;
