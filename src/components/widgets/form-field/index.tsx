import { useDeferredValue, useRef, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'motion/react';
import { isFunction } from 'remeda';

import { useResizeObserver } from '@/hooks';
import type { ReactCFC } from '@/models';
import { isReactChildren, isReactNode, isTrue } from '@/utils';

import { IFlex } from '../flex';
import { IMarker } from '../marker';
import { IPanel } from '../panel';
import { iCellGrid } from './helpers';
import { IFieldProvider, useIFieldCellContext } from './hooks';
import type { IFieldCellProps, IFieldStackProps } from './models';

import * as styles from './index.scss';

export const IFieldStack: ReactCFC<IFieldStackProps> = ({
  cell,
  children,
  className,
  ...others
}) => {
  const isResponsive = isFunction(cell);

  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number | undefined>(
    ref.current?.getBoundingClientRect()?.width
  );

  const deferred = useDeferredValue(width);

  useResizeObserver(
    ref,
    ({ contentRect }) => {
      if (contentRect.width) {
        setWidth(contentRect.width);
      }
    },
    { enabled: isResponsive }
  );

  return (
    <IFlex
      ref={ref}
      wrap
      className={classNames(styles.stack, className)}
      data-ui="field-stack"
      {...others}
    >
      <IFieldProvider {...(isResponsive ? cell(deferred) : cell)}>
        {children}
      </IFieldProvider>
    </IFlex>
  );
};

export const IFieldCell: ReactCFC<IFieldCellProps> = (props) => {
  const ctx = useIFieldCellContext();

  const {
    title,
    extra,
    style,
    address,
    feedback,
    required,
    className,
    status = 'success',
    pattern = 'editable',
    grid = ctx?.grid,
    span = ctx?.span ?? 1,
    columns = ctx?.columns ?? 1,
    colon = ctx?.colon ?? ':',
    size = ctx?.size ?? 'medium',
    margin = ctx?.margin ?? true,
    align = ctx?.align ?? 'flex-start',
    forceRenderTitle = ctx?.forceRenderTitle,
    children,
    ...others
  } = props;

  const showTitle = forceRenderTitle || isReactNode(title);

  const { width, ...grids } = iCellGrid({ span, columns, ...grid });

  return (
    <div
      className={classNames(
        styles.cell,
        styles[size],
        styles[status],
        {
          [styles.margin]: isTrue(margin),
          [styles.readPretty]: pattern === 'readPretty',
        },
        className
      )}
      data-address={address}
      data-ui="field-cell"
      style={{ width, ...style }}
      {...others}
    >
      <div
        className={classNames(styles.grid)}
        data-ui="field-cell-grid"
        style={grids}
      >
        <motion.label
          className={styles.title}
          style={{
            justifyContent: align,
            width: showTitle ? 'auto' : 0,
            height: showTitle ? 'auto' : 0,
          }}
        >
          <IMarker className={styles.marker} required={required}>
            {title}
          </IMarker>
          {colon && isReactNode(title) && (
            <div className={styles.colon}>{colon}</div>
          )}
        </motion.label>
        {isReactChildren(children) && (
          <IFlex layout vertical className={styles.control}>
            <IFlex vertical className={styles.wrapper} justify="center">
              {children}
            </IFlex>
            <IPanel
              className={classNames(
                styles.feedback,
                margin === 'feedback' && styles.withMargin
              )}
              open={isReactChildren(feedback)}
            >
              {feedback}
            </IPanel>
          </IFlex>
        )}
        <div className={styles.extra}>{extra}</div>
      </div>
    </div>
  );
};

export { IFieldProvider } from './hooks';
export type {
  IFieldCellContextVal,
  IFieldCellProps,
  IFieldStackProps,
} from './models';
