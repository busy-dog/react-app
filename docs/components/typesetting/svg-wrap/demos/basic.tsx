import { BaseLineWrap } from 'docs/widgets';

import { IFlex, ISignLine, ISVGWrap } from '@/components';

const App: React.FC = () => (
  <IFlex vertical gap={'var(--gap-06)'}>
    <BaseLineWrap>
      <ISignLine ring type="helper" />
      帮助
      <ISignLine type="helper" />
      <ISVGWrap>
        <ISignLine ring type="helper" />
      </ISVGWrap>
      帮助
      <ISVGWrap>
        <ISignLine type="helper" />
      </ISVGWrap>
    </BaseLineWrap>
    <BaseLineWrap>
      <ISignLine ring type="tick" />
      Tick
      <ISignLine type="tick" />
      <ISVGWrap>
        <ISignLine ring type="tick" />
      </ISVGWrap>
      Tick
      <ISVGWrap>
        <ISignLine type="tick" />
      </ISVGWrap>
    </BaseLineWrap>
    <BaseLineWrap>
      <ISignLine ring type="magnifier" />
      搜索
      <ISignLine type="magnifier" />
      <ISVGWrap>
        <ISignLine ring type="magnifier" />
      </ISVGWrap>
      搜索
      <ISVGWrap>
        <ISignLine type="magnifier" />
      </ISVGWrap>
    </BaseLineWrap>
    <BaseLineWrap>
      <ISignLine ring type="dollar" />
      100
      <ISignLine type="dollar" />
      <ISVGWrap>
        <ISignLine ring type="dollar" />
      </ISVGWrap>
      100
      <ISVGWrap>
        <ISignLine type="dollar" />
      </ISVGWrap>
    </BaseLineWrap>
  </IFlex>
);

export default App;
