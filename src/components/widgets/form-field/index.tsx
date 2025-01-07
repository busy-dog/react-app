import classNames from 'classnames';
import { motion } from 'motion/react';

import { isTrue } from '@busymango/is-esm';

import type { ReactCFC } from '@/models';
import { isReactChildren, isReactNode } from '@/utils';

import { IFlex } from '../flex';
import { IMarker } from '../marker';
import { IPanel } from '../motion-panel';
import { IFieldProvider, useIFieldCellContext } from './hooks';
import type { IFieldCellProps, IFieldStackProps } from './models';

import * as styles from './index.scss';

export const IFieldStack: ReactCFC<IFieldStackProps> = ({
  cell,
  children,
  className,
  ...others
}) => (
  <IFlex
    vertical
    wrap
    className={classNames(styles.wrap, className)}
    data-ui="field-stack"
    {...others}
  >
    <IFieldProvider {...cell}>{children}</IFieldProvider>
  </IFlex>
);

export const IFieldCell: ReactCFC<IFieldCellProps> = (props) => {
  const ctx = useIFieldCellContext();

  const {
    grid,
    title,
    address,
    feedback,
    required,
    className,
    status = 'success',
    pattern = 'editable',
    colon = ctx?.colon ?? ':',
    size = ctx?.size ?? 'medium',
    margin = ctx?.margin ?? false,
    align = ctx?.align ?? 'flex-start',
    forceRenderTitle = ctx?.forceRenderTitle,
    children,
    ...others
  } = props;

  const showTitle = forceRenderTitle || isReactNode(title);

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
      {...others}
    >
      <div
        className={classNames(styles.grid)}
        data-ui="field-cell-grid"
        style={{
          gridTemplateRows: grid?.rows ?? 'repeat(2, max-content)',
          gridTemplateColumns: grid?.cols ?? '1fr',
        }}
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
              visible={isReactChildren(feedback)}
            >
              {feedback}
            </IPanel>
          </IFlex>
        )}
      </div>
    </div>
  );
};

export type { IFieldCellProps, IFieldStackProps } from './models';
