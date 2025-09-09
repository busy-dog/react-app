import { Fragment } from 'react';
import { Variants } from 'docs/widgets';

import {
  IButton,
  IFieldCell,
  IFieldStack,
  IFlex,
  ISignLine,
  ISwitch,
} from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [checked, { iCheck }] = useToggle();

  return (
    <Variants densifiable>
      {({ density }) => (
        <Fragment>
          <IFieldStack>
            <IFieldCell title="启用大按钮">
              <ISwitch checked={checked} onChange={iCheck} />
            </IFieldCell>
          </IFieldStack>
          <IFlex vertical gap="var(--gap-04)">
            <IFlex wrap gap={8}>
              <IButton density={density} isFullWidth={checked} variant="filled">
                主要按钮
              </IButton>
              <IButton
                density={density}
                isFullWidth={checked}
                variant="bordered"
              >
                次要按钮
              </IButton>
              <IButton density={density} isFullWidth={checked} variant="text">
                文本按钮
              </IButton>
            </IFlex>
            <IFlex gap={8}>
              <IButton
                density="sm"
                icon={<ISignLine ring type="helper" />}
                variant="filled"
              >
                图标
              </IButton>
              <span>
                这是一段
                <IButton density="sm" variant="text">
                  按钮
                </IButton>
                文本
              </span>
            </IFlex>
          </IFlex>
        </Fragment>
      )}
    </Variants>
  );
};

export default App;
