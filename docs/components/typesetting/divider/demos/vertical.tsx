import { IButton, IDivider, IFlex, ISignLine } from '@/components';

const App: React.FC = () => (
  <IFlex gap="var(--gap-01)">
    <IButton icon={<ISignLine type="arrowDoubleLeft" />} variant="text" />
    <IDivider vertical />
    <IButton icon={<ISignLine type="arrowDoubleRight" />} variant="text" />
    <IDivider vertical />
    <IButton icon={<ISignLine type="magnifier" />} variant="text" />
  </IFlex>
);

export default App;
