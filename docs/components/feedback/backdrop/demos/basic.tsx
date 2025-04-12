import { Fragment } from 'react/jsx-runtime';
import { Variants } from 'docs/widgets';

import { ISpinner, ITypography } from '@/components';
import { IBackdrop } from '@/components/widgets/backdrop';
import { iPropagation } from 'src/utils';

const App: React.FC = () => (
  <Variants switchable>
    {({ open, toggle }) => (
      <Fragment>
        <ITypography margin={false} variant="body">
          点击上方开关开启遮罩
        </ITypography>
        <IBackdrop
          open={open}
          onClick={(event) => {
            iPropagation(event);
            toggle(false);
          }}
        >
          <ISpinner />
        </IBackdrop>
      </Fragment>
    )}
  </Variants>
);

export default App;
