import { IButton, ICard, iSnackbar, ISnackbarPortal } from '@/components';

const App: React.FC = () => (
  <ICard>
    <ISnackbarPortal />
    <IButton
      onClick={() => {
        iSnackbar.info('Hello');
      }}
    >
      消息
    </IButton>
    <IButton
      onClick={() => {
        iSnackbar.warn('Warning ⚠');
      }}
    >
      警告
    </IButton>
    <IButton
      onClick={() => {
        iSnackbar.success('Congratulation');
      }}
    >
      完成！
    </IButton>
    <IButton
      onClick={() => {
        iSnackbar.danger('Oops, Something was wrong');
      }}
    >
      异常
    </IButton>
  </ICard>
);

export default App;
