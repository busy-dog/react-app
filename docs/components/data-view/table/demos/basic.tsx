import { useMemo } from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { ITable } from '@/components/widgets/table';

type Person = {
  firstName: string;
  lastName: string;
  visits: number;
  status: string;
  progress: number;
  age: number;
  gender: string;
};

const data: Person[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    visits: 10,
    status: 'active',
    progress: 50,
    age: 20,
    gender: 'male',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    visits: 10,
    status: 'active',
    progress: 50,
    age: 21,
    gender: 'female',
  },
];

const App: React.FC = () => {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // _features: [DensityFeature], //pass our custom feature to the table to be instantiated upon creation
  });

  return <ITable table={table} />;
};

export default App;
