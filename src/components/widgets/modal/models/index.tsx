import type { OpenChangeReason, UseFloatingReturn } from '@floating-ui/react';

import type { ReactRender, ReactWrapProps } from '@/models';
import type { OmitOf, PlainObject } from '@/utils';

export type IModalRef = UseFloatingReturn['refs'] & {
  getReferenceProps: (props?: React.HTMLProps<Element>) => PlainObject;
};

export type IModalState = {
  open?: boolean;
  closable?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  title?: React.ReactNode;
};

type IModalButtonEvent = (
  event: React.MouseEvent<HTMLButtonElement>
) => void | Promise<void>;

type IModalOpenChangeEvent = (
  open: boolean,
  event?: Event,
  reason?: OpenChangeReason
) => void;

export type IModalCloseRender = ReactRender<
  {
    className: string;
    onOpenChange: IModalOpenChangeEvent;
  },
  IModalState
>;

export type IModalHeaderRender = ReactRender<unknown, IModalState>;

export type IModalContentRender = ReactRender<
  {
    children: React.ReactNode;
  },
  IModalState
>;

export type IModalConfirmRender = ReactRender<
  {
    onConfirm?: IModalButtonEvent;
    onOpenChange: IModalOpenChangeEvent;
  },
  IModalState
>;

export type IModalCancelRender = ReactRender<
  {
    onCancel?: IModalButtonEvent;
    onOpenChange: IModalOpenChangeEvent;
  },
  IModalState
>;

export type IModalFooterRender = ReactRender<
  {
    cancel: React.ReactNode;
    confirm: React.ReactNode;
    onCancel?: IModalButtonEvent;
    onConfirm?: IModalButtonEvent;
  },
  IModalState
>;

interface IModalRenders {
  /** 头部渲染 */
  header?: IModalHeaderRender;
  /** 内容渲染 */
  content?: IModalContentRender;
  /** 尾部渲染 */
  footer?: IModalFooterRender;
  /** 确定按钮渲染 */
  confirm?: IModalConfirmRender;
  /** 取消按钮渲染 */
  cancel?: IModalCancelRender;
  /** 下拉菜单的渲染方法 */
  close?: IModalCloseRender;
}

export interface IModalProps
  extends IModalState,
    OmitOf<ReactWrapProps, 'title'> {
  ref?: React.RefObject<IModalRef>;
  initialOpen?: boolean;
  renders?: IModalRenders;
  onCancel?: IModalButtonEvent;
  onConfirm?: IModalButtonEvent;
  onOpenChange?: IModalOpenChangeEvent;
}
