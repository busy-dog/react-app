import type { ForwardedRef } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import type { Column, RowData, Table } from '@tanstack/table-core';

export interface IFilterRef {
  root?: HTMLDivElement;
}

export interface IFilterProps<T extends RowData, V = unknown> {
  table: Table<T>;
  column: Column<T, V>;
}

interface IFilterGenerics extends React.FC<IFilterProps<RowData, unknown>> {
  <T extends RowData, V = unknown>(
    props: IFilterProps<T, V>
  ): ReturnType<React.FC<IFilterProps<T, V>>>;
}

export const Filter: IFilterGenerics = forwardRef(function Filter<
  T extends RowData,
  V = unknown,
>(props: IFilterProps<T, V>, ref: ForwardedRef<IFilterRef>) {
  const { table, column } = props;

  const root = useRef<HTMLDivElement>(null);

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  useImperativeHandle(
    ref,
    () => ({
      root: root.current!,
    }),
    [root]
  );

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        className="w-24 border shadow rounded"
        placeholder={`Min`}
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
      />
      <input
        className="w-24 border shadow rounded"
        placeholder={`Max`}
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
      />
    </div>
  ) : (
    <input
      className="w-36 border shadow rounded"
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
});
