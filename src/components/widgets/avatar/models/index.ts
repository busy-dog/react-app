import type { ReactImgProps, ReactRender, ReactWrapProps } from '@/models';

import type { ControlUIDensity } from '../../control';

type IAvatarState = {
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string;
  size?: ControlUIDensity;
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcset?: string;
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant?: 'circular' | 'square';
};

export type IAvatarRootRender = ReactRender<ReactWrapProps, IAvatarState>;

export type IAvatarImgRender = ReactRender<
  ReactImgProps & {
    img?: HTMLImageElement;
  },
  IAvatarState
>;

export interface IAvatarProps extends IAvatarState, ReactImgProps {
  /**
   *
   */
  fallback?: React.ReactNode;
  /**
   *
   */
  renders?: {
    img?: IAvatarImgRender;
    root?: IAvatarRootRender;
  };
}
