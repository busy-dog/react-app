import { EmailList } from 'docs/widgets';
import { EmialBody } from 'docs/widgets/email-body';

import { sleep } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import type { ControlOption } from '@/components';
import {
  IButton,
  IDivider,
  IFlex,
  IMenu,
  IPopover,
  ISafeArea,
  ISegment,
  ISelector,
  ISignLine,
  ISuspense,
  ISVGWrap,
} from '@/components';
import { iThemeVariable } from '@/utils';

import { configure } from '../cases/widgets';
import ArchiveSVG from '../icons/archive.svg?react';
import CloudSVG from '../icons/cloud.svg?react';
import DarftSVG from '../icons/darft.svg?react';
import GmailSVG from '../icons/gmail.svg?react';
import InboxSVG from '../icons/inbox.svg?react';
import JunkSVG from '../icons/junk.svg?react';
import SentSVG from '../icons/sent.svg?react';
import TrashSVG from '../icons/trash.svg?react';

import * as styles from './email.scss';

const options: ControlOption[] = [
  {
    value: 'mango@gmail.com',
    label: (
      <IFlex centered gap={iThemeVariable('--gap-02')}>
        <ISVGWrap>
          <GmailSVG />
        </ISVGWrap>
        mango@gmail.com
      </IFlex>
    ),
  },
  {
    value: 'mango@cloud.com',
    label: (
      <IFlex centered gap={iThemeVariable('--gap-02')}>
        <ISVGWrap>
          <CloudSVG />
        </ISVGWrap>
        mango@cloud.com
      </IFlex>
    ),
  },
];

const Count: React.FC<{ type?: string }> = ({ type }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['COUNT_API', type],
    queryFn: async () => {
      await sleep(1000);
      switch (type) {
        case 'inbox':
          return 128;
        case 'drafts':
          return 9;
        case 'junk':
          return 23;
        default:
          return '';
      }
    },
  });

  return <ISuspense isLoading={isLoading}>{data}</ISuspense>;
};

const App: React.FC = () => (
  <ISafeArea className={styles.area}>
    <div>
      <ISelector
        defaultValue={'mango@gmail.com'}
        options={options}
        style={{ width: 196 }}
      />
    </div>
    <IFlex align="center" justify="space-between" style={{ width: 256 }}>
      <span>收件箱</span>
      <div>
        <ISegment
          defaultValue="all"
          options={[
            { value: 'all', label: '所有邮件' },
            { value: 'unread', label: '未读邮件' },
          ]}
        />
      </div>
    </IFlex>
    <IFlex
      justify="space-between"
      style={{ padding: 8, height: '100%', width: '100%' }}
    >
      <IFlex gap={iThemeVariable('--gap-03')} style={{ fontSize: 16 }}>
        <IPopover content="archive" trigger="hover" variant="tooltip">
          {(props) => (
            <IButton {...props} icon={<ArchiveSVG />} variant="text" />
          )}
        </IPopover>
        <IButton icon={<JunkSVG />} variant="text" />
        <IButton icon={<TrashSVG />} variant="text" />
        <IDivider vertical />
        <IButton icon={<ISignLine ring type="clock" />} variant="text" />
      </IFlex>
    </IFlex>
    <IFlex vertical align="start" justify="start" style={{ height: '100%' }}>
      <ISegment
        isFullWidth
        vertical
        defaultValue="inbox"
        options={[
          {
            icon: <InboxSVG />,
            value: 'inbox',
            label: '收件箱',
            extra: <Count type="inbox" />,
          },
          {
            icon: <DarftSVG />,
            value: 'darfts',
            label: '草稿箱',
            extra: <Count type="darfts" />,
          },
          {
            icon: <SentSVG />,
            value: 'sent',
            label: '已发送',
            extra: <Count type="sent" />,
          },
          {
            icon: <JunkSVG />,
            value: 'junk',
            label: '废品箱',
            extra: <Count type="junk" />,
          },
          {
            icon: <TrashSVG />,
            value: 'trash',
            label: '垃圾箱',
            extra: <Count type="trash" />,
          },
          {
            icon: <ArchiveSVG />,
            value: 'archive',
            label: '已归档',
            extra: <Count type="archive" />,
          },
        ]}
        size="huge"
      />
      <IDivider>分割线</IDivider>
      <IMenu
        options={[
          {
            value: 'social',
            label: '社交',
          },
          {
            value: 'updates',
            label: '更新',
          },
          {
            value: 'forums',
            label: '论坛',
          },
          {
            value: 'shopping',
            label: '购物',
          },
          {
            value: 'promotions',
            label: '促销',
          },
        ]}
      />
    </IFlex>
    <EmailList />
    <p style={{ height: '100%' }}>
      <EmialBody />
    </p>
  </ISafeArea>
);

export default configure(App);

export const frontmatter = {
  // 声明布局类型
  outline: false,
};
