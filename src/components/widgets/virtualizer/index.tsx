import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';

import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';

import type { ReactWrapProps } from '@/models';
import type { OmitOf } from '@/utils';
import { crdnl, iPropagation } from '@/utils';

import type { IVirtualizerProps } from './models';

import * as styles from './index.scss';

const Container = forwardRef<
  HTMLDivElement,
  ReactWrapProps & OmitOf<VirtualItem, 'key'>
>(function Container(props, iForwardRef) {
  const { index, start, style, className, ...others } = props;

  const ref = useRef<HTMLDivElement>(null);

  const transform = `translateY(${start}px)`;

  useImperativeHandle(iForwardRef, () => ref.current!);

  return (
    <div
      ref={ref}
      aria-posinset={index + 1}
      className={classNames(styles.item, className)}
      data-index={index}
      style={{ transform, ...style }}
      {...others}
    />
  );
});

export const IVirtualizer = <T,>(props: IVirtualizerProps<T>) => {
  const {
    gap,
    data,
    className,
    children,
    overscan = 20,
    onClick = iPropagation,
    estimateSize,
    render,
    ...others
  } = props;

  const count = crdnl(data);

  const container = useRef<HTMLDivElement>(null);

  const getScrollElement = () => container.current!;

  const {
    measure,
    getTotalSize,
    scrollToIndex,
    measureElement,
    getVirtualItems,
    getOffsetForIndex,
  } = useVirtualizer({
    getScrollElement,
    estimateSize,
    overscan,
    count,
    gap,
  });

  const items = getVirtualItems();

  return (
    <div
      ref={container}
      className={classNames(styles.scrollable, className)}
      onClick={onClick}
      {...others}
    >
      <div style={{ height: getTotalSize() }}>
        {items.map(({ key, ...others }: VirtualItem) => (
          <Fragment key={key}>
            {render(others, {
              Container,
              measure,
              scrollToIndex,
              measureElement,
              getOffsetForIndex,
            })}
          </Fragment>
        ))}
      </div>
      {children}
    </div>
  );
};

export type { IVirtualizerProps } from './models';
