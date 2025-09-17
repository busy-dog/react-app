import type { ForwardedRef } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { flexRender } from '@tanstack/react-table';
import type { RowData, Table } from '@tanstack/table-core';

import type { ControlUIDensity } from '../control';

// // Use declaration merging to add our new feature APIs and state types to TanStack Table's existing types.
// declare module '@tanstack/react-table' {
//   //merge our new feature's state with the existing table state
//   interface TableState extends DensityTableState {}
//   //merge our new feature's options with the existing table options
//   interface TableOptionsResolved<TData extends RowData>
//     extends DensityOptions {}
//   //merge our new feature's instance APIs with the existing table instance APIs
//   interface Table<TData extends RowData> extends DensityInstance {}
//   // if you need to add cell instance APIs...
//   // interface Cell<TData extends RowData, TValue> extends DensityCell
//   // if you need to add row instance APIs...
//   // interface Row<TData extends RowData> extends DensityRow
//   // if you need to add column instance APIs...
//   // interface Column<TData extends RowData, TValue> extends DensityColumn
//   // if you need to add header instance APIs...
//   // interface Header<TData extends RowData, TValue> extends DensityHeader
//   // Note: declaration merging on `ColumnDef` is not possible because it is a type, not an interface.
//   // But you can still use declaration merging on `ColumnDef.meta`
// }
// // end of TS setup!
// // Here is all of the actual javascript code for our new feature
// export const DensityFeature: TableFeature<any> = {
//   // define the new feature's initial state
//   getInitialState: (state): DensityTableState => {
//     return {
//       density: 'md',
//       ...state,
//     };
//   },
//   // define the new feature's default options
//   getDefaultOptions: <TData extends RowData>(
//     table: Table<TData>
//   ): DensityOptions => {
//     return {
//       enableDensity: true,
//       onDensityChange: makeStateUpdater('density', table),
//     } as DensityOptions;
//   },
//   // if you need to add a default column definition...
//   // getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
//   //   return { meta: {} } //use meta instead of directly adding to the columnDef to avoid typescript stuff that's hard to workaround
//   // },
//   // define the new feature's table instance methods
//   createTable: <TData extends RowData>(table: Table<TData>): void => {
//     table.setDensity = (updater) => {
//       const safeUpdater: Updater<DensityState> = (old) => {
//         const newState = functionalUpdate(updater, old);
//         return newState;
//       };
//       return table.options.onDensityChange?.(safeUpdater);
//     };
//     table.toggleDensity = (value) => {
//       table.setDensity((old) => {
//         if (value) return value;
//         return old === 'lg' ? 'md' : old === 'md' ? 'sm' : 'lg'; //cycle through the 3 options
//       });
//     };
//   },
//   // if you need to add row instance APIs...
//   // createRow: <TData extends RowData>(row, table): void => {},
//   // if you need to add cell instance APIs...
//   // createCell: <TData extends RowData>(cell, column, row, table): void => {},
//   // if you need to add column instance APIs...
//   // createColumn: <TData extends RowData>(column, table): void => {},
//   // if you need to add header instance APIs...
//   // createHeader: <TData extends RowData>(header, table): void => {},
// };
// //end of custom feature code
import * as styles from './index.scss';

// import type {
//   Column,
//   ColumnDef,
//   OnChangeFn,
//   RowData,
//   Table,
//   TableFeature,
//   Updater,
// } from '@tanstack/react-table';
// import {
//   flexRender,
//   functionalUpdate,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   makeStateUpdater,
//   useReactTable,
// } from '@tanstack/react-table';

// import type { Person } from './makeData';
// import { makeData } from './makeData';

// import './index.css';

// // TypeScript setup for our new feature with all of the same type-safety as stock TanStack Table features

export interface ITableState {
  density: ControlUIDensity;
}

export interface ITableRef {
  table?: HTMLTableElement;
}

export interface ITableProps<T extends RowData> extends Partial<ITableState> {
  table: Table<T>;
}

interface ITableGenericsFC extends React.FC<ITableProps<RowData>> {
  <T extends RowData>(
    props: ITableProps<T>
  ): ReturnType<React.FC<ITableProps<T>>>;
}

export const ITable: ITableGenericsFC = forwardRef(function Table<
  T extends RowData,
>(props: ITableProps<T>, ref: ForwardedRef<ITableRef>) {
  const { table: instance, density } = props;

  const table = useRef<HTMLTableElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      table: table.current!,
    }),
    [table]
  );

  return (
    <div className={styles.wrap}>
      <table ref={table}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      //using our new feature
                      padding:
                        density === 'sm'
                          ? '4px'
                          : density === 'md'
                            ? '8px'
                            : '16px',
                      transition: 'padding 0.2s',
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        {/* <Filter column={header.column} table={table} /> */}
                      </div>
                    ) : null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      style={{
                        //using our new feature
                        padding:
                          density === 'sm'
                            ? '4px'
                            : density === 'md'
                              ? '8px'
                              : '16px',
                        transition: 'padding 0.2s',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

//   return (
//     <div className="p-2">
//       <div className="h-2" />
//       <button
//         className="border rounded p-1 bg-blue-500 text-white mb-2 w-64"
//         onClick={() => table.toggleDensity()}
//       >
//         Toggle Density
//       </button>
//       <table>

//       </table>
//       <div className="h-2" />
//       <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1"
//           disabled={!table.getCanPreviousPage()}
//           onClick={() => table.firstPage()}
//         >
//           {'<<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           disabled={!table.getCanPreviousPage()}
//           onClick={() => table.previousPage()}
//         >
//           {'<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           disabled={!table.getCanNextPage()}
//           onClick={() => table.nextPage()}
//         >
//           {'>'}
//         </button>
//         <button
//           className="border rounded p-1"
//           disabled={!table.getCanNextPage()}
//           onClick={() => table.lastPage()}
//         >
//           {'>>'}
//         </button>
//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount().toLocaleString()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             className="border p-1 rounded w-16"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             type="number"
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
//         {table.getRowCount().toLocaleString()} Rows
//       </div>
//       <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
//     </div>
//   );
// }
