import type { HTMLMotionProps } from 'motion/react';

import type { ReactRender, ReactWrapProps } from '@/models';
import type { OmitOf } from '@/utils';

export type IPanelState = {
  /** 展示内容 */
  open: boolean;
  /** 是否在内容卸载时留痕 */
  ghosting: boolean;
};

export type IPanelContentRender = ReactRender<
  React.PropsWithChildren<
    ReactWrapProps & {
      ref: React.RefObject<HTMLDivElement | null>;
    }
  >,
  IPanelState
>;

export type IPanelHeaderRender = ReactRender<
  React.PropsWithChildren<{
    title?: React.ReactNode;
    extra?: React.ReactNode;
  }>,
  IPanelState
>;

export type IPanelRenders = {
  header?: IPanelHeaderRender;
  content?: IPanelContentRender;
};

export interface IPanelProps
  extends Partial<IPanelState>,
    OmitOf<HTMLMotionProps<'div'>, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  /** 自定义UI */
  renders?: IPanelRenders;
}
