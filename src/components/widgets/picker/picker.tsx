import { Fragment, useMemo, useRef } from 'react';
import classNames from 'classnames';
import type { AnimationDefinition } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';

import { isHTMLElement } from '@busymango/is-esm';
import { compact, isEqual } from '@busymango/utils';
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { useMemoFunc, useToggle } from '@/hooks';
import { iFindElement } from '@/utils';

import { IBackdrop } from '../backdrop';
import { IButton } from '../button';
import { useControlState } from '../control';
import { IFlex } from '../flex';
import { IWheel } from '../wheel';
import {
  iDismissProps,
  iWrapAnimate,
  iWrapExit,
  iWrapInitial,
} from './helpers';
import { IPickerMask } from './mask';
import type { IPickerProps } from './models';

import * as styles from './picker.scss';

export const IPicker: React.FC<IPickerProps> = (props) => {
  const {
    root,
    style,
    title,
    columns,
    className,
    open: iOpen,
    value: iValue,
    initialOpen: iInitialOpen,
    defaultValue: iDefaultValue,
    onOpenChange: iOpenChange,
    onChange: iChange,
    onSelect,
    render,
    ...others
  } = props;

  const [value, onChange] = useControlState({
    value: iValue,
    onChange: iChange,
    defaultValue: iDefaultValue,
  });

  const [open, onOpenChange] = useControlState({
    value: iOpen,
    onChange: iOpenChange,
    defaultValue: iInitialOpen,
  });

  const [isPlaying, { on, off }] = useToggle();

  const { refs, context } = useFloating({ open, onOpenChange });

  const focus = useRef(columns?.map((e, i) => value?.[i] ?? e?.[0]?.value));

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context, iDismissProps),
  ]);

  const onConfirm = useMemoFunc(() => {
    onChange(focus.current ?? []);
    context.onOpenChange(false);
  });

  const onAnimationStart = useMemoFunc((animate: AnimationDefinition) => {
    isEqual(animate, iWrapExit) && off();
    isEqual(animate, iWrapAnimate) && on();
  });

  const inner = useMemo(
    () =>
      compact(
        columns?.map(
          (column, index) =>
            column.find((e) => e.value === value?.[index])?.label
        ) ?? []
      )?.join(' - '),
    [columns, value]
  );

  return (
    <Fragment>
      <div
        ref={refs.setReference}
        className={styles.view}
        {...getReferenceProps()}
      >
        {inner}
      </div>
      <IBackdrop
        scroll
        className={styles.overlay}
        open={context.open || isPlaying}
        relative={isHTMLElement(iFindElement(root))}
        root={root}
      >
        <AnimatePresence>
          {context.open && (
            <motion.div
              ref={refs.setFloating}
              animate={iWrapAnimate}
              className={classNames(styles.wrap, className)}
              exit={iWrapExit}
              initial={iWrapInitial}
              style={style}
              onAnimationStart={onAnimationStart}
              {...others}
              {...getFloatingProps()}
            >
              <IFlex
                align="center"
                className={styles.header}
                justify="space-between"
              >
                <IButton
                  variant="text"
                  wave={false}
                  onClick={() => {
                    context.onOpenChange(false);
                  }}
                >
                  取消
                </IButton>
                <motion.h2 layout>{title}</motion.h2>
                <IButton variant="text" wave={false} onClick={onConfirm}>
                  确定
                </IButton>
              </IFlex>
              <IFlex className={styles.container}>
                {columns?.map((colum, index) => (
                  <IWheel
                    key={index}
                    options={colum}
                    value={value?.[index]}
                    onChange={(val) => {
                      focus.current = focus.current?.map(
                        (e, i) => (i === index ? val : e) ?? e
                      );
                      onSelect?.(focus.current);
                    }}
                  />
                ))}
                <IPickerMask />
              </IFlex>
            </motion.div>
          )}
        </AnimatePresence>
      </IBackdrop>
    </Fragment>
  );
};

export type { IPickerProps } from './models';
