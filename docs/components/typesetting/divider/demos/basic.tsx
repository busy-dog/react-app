import { ICard, IChip, IDivider, IFlex, ITypography } from '@/components';

const App: React.FC = () => (
  <ICard style={{ maxWidth: 360 }}>
    <div style={{ padding: 'var(--gap-06)' }}>
      <IFlex align="center" justify="space-between">
        <ITypography variant="h5">Toothbrush</ITypography>
        <ITypography variant="h6">$4.50</ITypography>
      </IFlex>
      <ITypography variant="body">
        Pinstriped cornflower blue cotton blouse takes you on a walk to the park
        or just down the hall.
      </ITypography>
    </div>
    <IDivider />
    <div style={{ padding: 'var(--gap-06)' }}>
      <ITypography variant="body">Select type</ITypography>
      <IFlex gap="var(--gap-03)">
        <IChip color="purple">{'Soft'}</IChip>
        <IChip>Medium</IChip>
        <IChip>Hard</IChip>
      </IFlex>
    </div>
  </ICard>
);

export default App;
