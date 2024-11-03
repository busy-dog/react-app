import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';

import { isEmpty } from '@busymango/is-esm';
import { sleep } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import {
  ICard,
  IChip,
  IControlWrap,
  IEmptyWrap,
  IFlex,
  IInput,
  ISignLine,
  ITypography,
  IVirtualizer,
} from '@/components';
import { iThemeVariable } from '@/utils';

import { emails } from '../data';

dayjs.locale('zh-CN');
dayjs.extend(relative);

export const EmailList: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['EMAIL_QUERY'],
    queryFn: async () => {
      await sleep(2000);
      return emails.map(({ id, ...item }) => ({
        value: id,
        ...item,
      }));
    },
  });

  return (
    <div
      style={{
        display: 'grid',
        height: '100%',
        width: 256,
        gridTemplateRows: 'max-content minmax(0, 1fr)',
      }}
    >
      <IControlWrap prefix={<ISignLine type="magnifier" />} variant="bordered">
        <IInput />
      </IControlWrap>
      <div
        style={{
          height: '100%',
          padding: `${iThemeVariable('--gap-03')} 0`,
        }}
      >
        <IEmptyWrap isEmpty={isEmpty(data)} isLoading={isLoading}>
          <IVirtualizer
            data={data}
            estimateSize={() => 150}
            gap={8}
            render={(item, { Container, measureElement }) => {
              const email = data![item.index];
              return (
                <Container {...item} ref={measureElement}>
                  <ICard
                    extra={
                      <ITypography variant="subtitle">
                        {dayjs(email.sendeTime).fromNow()}
                      </ITypography>
                    }
                    footer={
                      <IFlex gap={iThemeVariable('--gap-02')}>
                        <IChip>会议</IChip>
                        <IChip>工作</IChip>
                        <IChip>重要</IChip>
                      </IFlex>
                    }
                    title={
                      <ITypography variant="h6">
                        {email.sender.name}
                      </ITypography>
                    }
                  >
                    <ITypography maxRow={3} variant="body">
                      {email.content}
                    </ITypography>
                  </ICard>
                </Container>
              );
            }}
          />
        </IEmptyWrap>
      </div>
    </div>
  );
};
