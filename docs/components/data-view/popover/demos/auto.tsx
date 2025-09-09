import { useRef } from 'react';

import { IButton, IFlex, IPopover } from '@/components';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <IFlex centered>
      <div
        ref={ref}
        style={{
          width: '40vw',
          height: '10vw',
          overflow: 'scroll',
          position: 'relative',
          backgroundColor: 'var(--bg-color-warp)',
        }}
      >
        <IFlex centered style={{ width: '80vw', height: '20vw' }}>
          <IPopover
            content="我是文本"
            render={{
              reference: (props) => (
                <IButton density="lg" tabIndex={0} {...props}>
                  按钮
                </IButton>
              ),
            }}
            root={ref}
            trigger="click"
            variant="tooltip"
          />
        </IFlex>
      </div>
    </IFlex>
  );
};

export default App;
