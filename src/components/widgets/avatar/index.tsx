import classNames from 'classnames';

import type { ReactCFC } from '@/models';

import { boundary } from '../boundary';
import { ISpinner } from '../spin-loading';
import { useImage } from './hooks';
import type {
  IAvatarImgRender,
  IAvatarProps,
  IAvatarRootRender,
} from './models';

import * as styles from './index.scss';

const iImgRender: IAvatarImgRender = ({ img, ...others }) => (
  <img {...others} src={img?.src} srcSet={img?.srcset} />
);

const iRootRender: IAvatarRootRender = (props) => <div {...props} />;

export const IAvatarCore: React.FC<Omit<IAvatarProps, 'fallback'>> = (
  props
) => {
  const {
    alt,
    src,
    srcset,
    renders,
    children,
    className,
    crossOrigin,
    referrerPolicy,
    size = 'medium',
    loading = 'lazy',
    decoding = 'async',
    variant = 'circular',
    ...others
  } = props;

  const states = {
    src,
    srcset,
    variant,
  };

  const isImg = src || srcset;

  const { data, isLoading, isSuccess } = useImage({
    src,
    alt,
    srcset,
    decoding,
    crossOrigin,
    referrerPolicy,
  });

  return isImg && isSuccess
    ? (renders?.img ?? iImgRender)(
        {
          img: data,
          decoding,
          loading,
          crossOrigin,
          referrerPolicy,
          className: classNames(
            styles.img,
            styles[variant],
            styles[size],
            className
          ),
          ...others,
        },
        states
      )
    : (renders?.root ?? iRootRender)(
        {
          children: isLoading ? <ISpinner /> : children,
          className: classNames(
            styles.wrap,
            styles[variant],
            styles[size],
            className
          ),
        },
        states
      );
};

export const IAvatar: ReactCFC<IAvatarProps> = boundary(IAvatarCore);
