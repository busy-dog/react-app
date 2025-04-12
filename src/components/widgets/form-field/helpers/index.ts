import type { RequiredPick } from '@/utils';
import { compact } from '@/utils';

import type { ICellGridModel, IFieldCellProps } from '../models';

export type ICellGridParams = ICellGridModel &
  RequiredPick<IFieldCellProps, 'columns' | 'span'>;

export const iCellGrid = ({
  span,
  columns,
  vertical,
  control = 3,
  label = 1,
  extra = 1,
}: ICellGridParams): Pick<
  React.CSSProperties,
  'width' | 'gridTemplateRows' | 'gridTemplateColumns' | 'gridTemplateAreas'
> => {
  const iSpan = Math.min(span, columns);

  const width = `calc(${iSpan}00% / ${columns})`;

  const iControl = label * (iSpan - 1) + extra * (iSpan - 1) + control * iSpan;

  const rows = compact([vertical && 'max-content', 'max-content']).join(' ');

  const areas = vertical
    ? ['"title extra"', '"control control"'].join('\n')
    : '"title control extra"';

  const cols = compact([label, !vertical && iControl, extra])
    .map((num = 1) => `${num}fr`)
    .join(' ');

  return {
    width,
    gridTemplateRows: rows,
    gridTemplateAreas: areas,
    gridTemplateColumns: cols,
  };
};
