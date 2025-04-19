import {
  IButton,
  ICard,
  IFieldCell,
  IFlex,
  IInput,
  ISelector,
  ITypography,
} from '@/components';

const Basic = () => (
  <ICard style={{ width: 360 }}>
    <ITypography variant="h4">Create project</ITypography>
    <ITypography style={{ marginBottom: 'var(--gap-08)' }} variant="subtitle">
      Deploy your new project in one-click.
    </ITypography>
    <IFieldCell grid={{ vertical: true }} title="Name">
      <IInput variant="bordered" />
    </IFieldCell>
    <IFieldCell grid={{ vertical: true }} title="Framework">
      <ISelector />
    </IFieldCell>
    <IFlex
      gap="var(--gap-04)"
      justify="flex-end"
      style={{ marginTop: 'var(--gap-08)' }}
    >
      <IButton>取消</IButton>
      <IButton variant="filled">部署</IButton>
    </IFlex>
  </ICard>
);

export default Basic;
