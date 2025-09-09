import { ICard, IChip, ITypography } from '@/components';

const App: React.FC = () => (
  <ICard>
    <ITypography variant="h5">
      Title of the component
      <ITypography variant="inherit">success</ITypography>
    </ITypography>
    <ITypography variant="body">
      <IChip density="sm" style={{ margin: `0 $'var(--gap-02)'` }}>
        Typography
      </IChip>
      允许您创建
      <IChip
        density="sm"
        style={{ margin: `0 $'var(--gap-02)'` }}
        variant="bordered"
      >
        嵌套
      </IChip>
      排版。发挥您的想象力来构建出色的
      <ITypography mark="violet" variant="inherit">
        用户界面
      </ITypography>
      。
    </ITypography>
  </ICard>
);

export default App;
