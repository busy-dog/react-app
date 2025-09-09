import { Variants } from 'docs/widgets';

import type { IControlWrapProps, IControlWrapRootRender } from '@/components';
import { IControlWrap, ITextArea } from '@/components';

const root: IControlWrapRootRender = ({ className, style }, { pattern }) => (
  <ITextArea
    className={className}
    readOnly={pattern === 'readOnly' || pattern === 'readPretty'}
    style={style}
  />
);

const App: React.FC = () => (
  <Variants
    densifiable
    patternable
    statusable
    variants={
      [
        'bordered',
        'filled',
        'standard',
      ] satisfies IControlWrapProps['variant'][]
    }
  >
    {({ density, status, pattern, variant }) => (
      <IControlWrap
        density={density}
        pattern={pattern}
        render={{ root }}
        status={status}
        style={{ padding: 'var(--gap-03) var(--gap-04)' }}
        variant={variant}
      />
    )}
  </Variants>
);

export default App;
