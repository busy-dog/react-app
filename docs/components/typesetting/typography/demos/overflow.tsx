import { useRef } from 'react';

import { isHTMLElement } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import { ICard, IFlex, IPopover, ITypography } from '@/components';
import { ellipsis } from '@/utils';

const string = `各位同事领导好\r\n\r\n\r\n\r\n\r\n\r\nEAST本月报送即将开始，提醒您及时在PLMS系统中完成以下事项，谢谢!(PLMS系统地址：http://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)
EAST本月报送即将开始，提醒您及时在PLMS系统中完成以下事项，谢谢!(PLMS系统地址：http://ivs-plms.paic.com.cn)
`;

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const root = () => {
    const { parentNode } = ref.current ?? {};
    return ifnot(isHTMLElement(parentNode) && parentNode) ?? null;
  };

  return (
    <IFlex
      ref={ref}
      vertical
      gap={16}
      style={{ padding: `$'var(--gap-03)' 0` }}
    >
      <IPopover
        content={string}
        render={{
          reference: (props) => (
            <ICard
              render={{
                root: ({ className }) => (
                  <ITypography className={className} maxRow={3} {...props}>
                    {ellipsis(string)}
                  </ITypography>
                ),
              }}
            />
          ),
        }}
        root={root}
        timing="overflow"
        variant="tooltip"
      />
    </IFlex>
  );
};

export default App;
