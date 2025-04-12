import type { HTMLMotionProps } from 'motion/react';

import type { ReactRender, ReactWrapProps } from '@/models';

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
  React.PropsWithChildren<ReactWrapProps>,
  IPanelState
>;

type IPanelRenders = {
  header?: IPanelHeaderRender;
  content?: IPanelContentRender;
};

export interface IPanelProps
  extends Partial<IPanelState>,
    HTMLMotionProps<'div'> {
  /** 自定义UI */
  renders?: IPanelRenders;
}
