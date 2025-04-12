import { useMemo } from 'react';
import classNames from 'classnames';
import { motion } from 'motion/react';

import { ensure, isFalse, isTrue } from '@/utils';

import type { IFlexProps, IFlexRootRender } from './models';

import * as styles from './index.scss';

const iRootRender: IFlexRootRender = (props) => <motion.div {...props} />;

export const IFlex: React.FC<IFlexProps> = (props) => {
  const {
    ref,
    gap,
    flex,
    wrap,
    align,
    style,
    inline,
    justify,
    reverse,
    children,
    centered,
    className,
    direction,
    vertical = false,
    renders,
    ...others
  } = props;

  const flexWrap = isTrue(wrap) ? 'wrap' : wrap;

  const alignItems = align ?? ensure(centered && 'center');

  const justifyContent = justify ?? ensure(centered && 'center');

  return (renders?.root ?? iRootRender)(
    {
      ref,
      children,
      style: useMemo(
        () => ({
          ...style,
          flex,
          flexWrap,
          alignItems,
          justifyContent,
          flexDirection: direction,
          gap,
        }),
        [style, flex, alignItems, justifyContent, flexWrap, gap, direction]
      ),
      className: classNames(
        styles.wrap,
        reverse && styles.reverse,
        isTrue(inline) && styles.inline,
        isTrue(vertical) && styles.vertical,
        isFalse(vertical) && styles.horizontal,
        className
      ),
      ...others,
    },
    { inline, reverse, vertical, centered }
  );
};

export type { IFlexProps, IFlexRootRender } from './models';
