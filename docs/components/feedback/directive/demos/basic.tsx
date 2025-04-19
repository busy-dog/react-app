import { Variants } from 'docs/widgets';

import { IDirective, IFlex, ISignLine } from '@/components';

const App: React.FC = () => (
  <Variants variants={['filled', 'borderered'] as const}>
    {({ variant }) => (
      <IFlex vertical gap={16}>
        <IDirective
          icon={<ISignLine ring type="info" />}
          title="通用"
          variant={variant}
        >
          这是一个指示。
        </IDirective>
        <IDirective
          icon={<ISignLine ring type="tick" />}
          status="success"
          title="成功"
          variant={variant}
        >
          这是一个成功的指示。
        </IDirective>
        <IDirective
          icon={<ISignLine ring type="cross" />}
          status="danger"
          title="危险"
          variant={variant}
        >
          这是一个危险的指示。
        </IDirective>
        <IDirective
          icon={<ISignLine trigon type="info" />}
          status="warn"
          title="警告"
          variant={variant}
        >
          这是一个包含警告意的指示。
        </IDirective>
      </IFlex>
    )}
  </Variants>
);

export default App;
