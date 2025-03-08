import { useImperativeHandle } from 'react';
import classNames from 'classnames';

import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { container } from '@/init';

import { IBackdrop } from '../backdrop';
import { IButton } from '../button';
import { IFlex } from '../flex';
import { ISignLine } from '../sign';
import { ISpinner } from '../spin-loading';
import { ISVGWrap } from '../svg-wrap';
import { ITypography } from '../typography';
import type {
  IModalCancelRender,
  IModalCloseRender,
  IModalConfirmRender,
  IModalContentRender,
  IModalFooterRender,
  IModalHeaderRender,
  IModalProps,
  IModalState,
} from './models';

import * as styles from './index.scss';

const iDismissProps = { outsidePressEvent: 'mousedown' } as const;

const iHeaderRender: IModalHeaderRender = (_, { icon, title }) =>
  (icon || title) && (
    <h2 className={styles.header}>
      <IFlex align="center" gap={'var(--gap-03)'} justify="flex-start">
        {icon && <ISVGWrap className={styles.icon}>{icon}</ISVGWrap>}
        <ITypography className={styles.title} margin={false} variant="h6">
          {title}
        </ITypography>
      </IFlex>
    </h2>
  );

const iCloseRender: IModalCloseRender = (
  { className, onOpenChange },
  { closable, isLoading }
) =>
  closable && (
    <IButton
      className={className}
      disabled={isLoading}
      icon={isLoading ? <ISpinner /> : <ISignLine type="cross" />}
      variant="text"
      onClick={({ nativeEvent }) => {
        onOpenChange(false, nativeEvent, 'click');
      }}
    />
  );

const iContentRender: IModalContentRender = ({ children }) => (
  <div className={styles.content}>{children}</div>
);

const iCancelRender: IModalCancelRender = (
  { onCancel, onOpenChange },
  { isLoading }
) => (
  <IButton
    disabled={isLoading}
    tabIndex={-1}
    variant="bordered"
    onClick={async (event) => {
      const { nativeEvent } = event;
      await onCancel?.(event);
      onOpenChange(false, nativeEvent, 'click');
    }}
  >
    取消
  </IButton>
);

const iConfirmRender: IModalConfirmRender = (
  { onConfirm, onOpenChange },
  { isLoading }
) => (
  <IButton
    isLoading={isLoading}
    variant="filled"
    onClick={async (event) => {
      const { nativeEvent } = event;
      await onConfirm?.(event);
      onOpenChange(false, nativeEvent, 'click');
    }}
  >
    确认
  </IButton>
);

const iFooterRender: IModalFooterRender = ({ confirm, cancel }) => (
  <IFlex align="center" className={styles.footer} justify="flex-end">
    {cancel}
    {confirm}
  </IFlex>
);

export const IModal: React.FC<IModalProps> = (props) => {
  const {
    ref,
    icon,
    title,
    style,
    closable,
    children,
    className,
    isLoading,
    initialOpen,
    open: iOpen,
    renders,
    onOpenChange: iOpenChange,
    onConfirm,
    onCancel,
    ...others
  } = props;

  const isControl = 'open' in props;

  const { refs, context } = useFloating({
    onOpenChange: iOpenChange,
    open: isControl ? iOpen : initialOpen,
  });

  const click = useClick(context);

  const dismiss = useDismiss(context, iDismissProps);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
  ]);

  useImperativeHandle(ref, () => ({ ...refs, getReferenceProps }), [
    refs,
    getReferenceProps,
  ]);

  const { open, onOpenChange } = context;

  const state: IModalState = {
    icon,
    open,
    title,
    closable,
    isLoading,
  };

  return (
    <IBackdrop className={styles.mask} open={context.open} root={container}>
      <FloatingFocusManager context={context}>
        <div
          ref={refs.setFloating}
          className={classNames(styles.wrap, className)}
          {...getFloatingProps({ style })}
          {...others}
        >
          {(renders?.header ?? iHeaderRender)(null, state)}
          {(renders?.close ?? iCloseRender)(
            { className: styles.close, onOpenChange },
            state
          )}
          {(renders?.content ?? iContentRender)({ children }, state)}
          {(renders?.footer ?? iFooterRender)(
            {
              confirm: (renders?.confirm ?? iConfirmRender)(
                { onConfirm, onOpenChange },
                state
              ),
              cancel: (renders?.cancel ?? iCancelRender)(
                { onCancel, onOpenChange },
                state
              ),
            },
            state
          )}
        </div>
      </FloatingFocusManager>
    </IBackdrop>
  );
};

export type {
  IModalCancelRender,
  IModalCloseRender,
  IModalConfirmRender,
  IModalContentRender,
  IModalFooterRender,
  IModalHeaderRender,
  IModalProps,
  IModalRef,
} from './models';
