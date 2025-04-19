import { Fragment } from 'react';
import { Variants } from 'docs/widgets';

import { IBackdrop, ISpinner, ITypography } from '@/components';
import { iPropagation } from '@/utils';

const App: React.FC = () => (
  <Variants switchable card={false}>
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
