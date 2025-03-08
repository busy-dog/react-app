import { ICard, IDotsLoading, IFlex, ISpinner } from '@/components';

const App: React.FC = () => (
  <ICard>
    <IFlex gap={16}>
      <ISpinner />
      <IDotsLoading animate="jump" />
      <IDotsLoading animate="pulse" />
    </IFlex>
  </ICard>
);

export default App;
