import type { ReactWrapProps } from '@/models';
import type { OmitOf, PartialPick } from '@/utils';

import type {
  ControlPattern,
  ControlUISize,
  ControlUIStatus,
} from '../../control';
import type { IFlexProps } from '../../flex/models';

export type ICellGridModel = {
  vertical?: boolean;
  control?: number;
  label?: number;
  extra?: number;
};

export interface IFieldCellProps
  extends OmitOf<ReactWrapProps, 'title' | 'children'> {
  /** 字段标题对齐方式 */
  align?: IFlexProps['align'];
  /** 是否开启外间距 */
  margin?: boolean | 'feedback';
  /** 是否显示必填标识 */
  required?: boolean;
  /** 是否强制渲染标题元素，如果为true，即使title不存在也会占用空间 */
  forceRenderTitle?: boolean;
  /** 冒号元素 */
  colon?: React.ReactNode;
  /** 字段标题 */
  title?: React.ReactNode;
  /** 错误信息 */
  feedback?: React.ReactNode;
  /** 字段绝对路径（浏览器通过此属性查询字段Dom位置） */
  address?: string;
  /** 字段交互方式 */
  pattern?: ControlPattern;
  /** 字段校验状态 */
  status?: ControlUIStatus;
  /** 字段UI大小 */
  size?: ControlUISize;
  /** 字段额外空间 */
  extra?: React.ReactNode;
  /** 字段跨越多少列 */
  span?: number;
  /** 字段所在布局的列数 */
  columns?: number;
  /** 字段栅格布局（控制Label、Control、Extra的占比） */
  grid?: ICellGridModel;
}

export interface IFieldCellContextVal
  extends PartialPick<
    IFieldCellProps,
    | 'span'
    | 'grid'
    | 'size'
    | 'colon'
    | 'align'
    | 'margin'
    | 'columns'
    | 'forceRenderTitle'
  > {}

export interface IFieldStackProps extends IFlexProps {
  cell?: IFieldCellContextVal | ((width?: number) => IFieldCellContextVal);
}
