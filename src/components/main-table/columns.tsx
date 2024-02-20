"use client";

import { ColumnDef } from "@tanstack/react-table";

import { labels, priorities, statuses } from "./data/data";
import { Task } from "./data/schema";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "parcela",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parcela" />
    ),
    cell: ({ row }) => <div>{row.getValue("parcela")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "divida",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Divida" />
    ),
    cell: ({ row }) => <div>{row.getValue("divida")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "correcao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correcao" />
    ),
    cell: ({ row }) => <div>{row.getValue("correcao")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "dividaCorrigida",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Divida Corrigida" />
    ),
    cell: ({ row }) => <div>{row.getValue("dividaCorrigida")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "amortizacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amortizacao" />
    ),
    cell: ({ row }) => <div>{row.getValue("amortizacao")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "juros",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Juros" />
    ),
    cell: ({ row }) => <div>{row.getValue("juros")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "txAdicional",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Taxa Adicional" />
    ),
    cell: ({ row }) => <div>{row.getValue("txAdicional")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "valorMensal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="valorMensal" />
    ),
    cell: ({ row }) => <div>{row.getValue("valorMensal")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "saldo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saldo" />
    ),
    cell: ({ row }) => <div>{row.getValue("saldo")}</div>,
    enableSorting: false,
  },
  {
    id: "actions",
    header: () => "Amortizar",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  // {
  //   accessorKey: "dividaCorrigida",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
];
