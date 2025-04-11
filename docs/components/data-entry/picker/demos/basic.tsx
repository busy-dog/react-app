import { IControlWrap, IPicker, ISignLine } from '@/components';
import { iThemeVariable } from '@/utils';

import 'assets/themes/light.css';
import 'assets/themes/dark.css';

const columns = [
  [
    { label: '周一', value: '周一' },
    { label: '周二', value: '周二' },
    { label: '周三', value: '周三' },
    { label: '周四', value: '周四' },
    { label: '周五', value: '周五' },
  ],
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
  ],
];

const App: React.FC = () => (
  <article
    style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      boxSizing: 'border-box',
      padding: iThemeVariable('--gap-04'),
      boxShadow: iThemeVariable('--shadow-06'),
      borderRadius: iThemeVariable('--border-radius-03'),
      backgroundColor: iThemeVariable('--bg-color-normal'),
    }}
  >
    <IControlWrap suffix={<ISignLine type="arrowRight" />} variant="bordered">
      <IPicker columns={columns} />
    </IControlWrap>
  </article>
);

export default App;
