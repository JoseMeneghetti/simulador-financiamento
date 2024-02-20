"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UseTable from "../../../hooks/table-hook";
import { debounce } from "lodash";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const useTable = UseTable();

  if (!useTable) {
    return <>Loading..</>;
  }

  return (
    <div className="flex items-start justify-between flex-col gap-y-4">
      <div className="flex flex-1 items-center space-x-2">
        <Label>TR</Label>
        <Input
          placeholder="1.00%"
          value={useTable.tr}
          onChange={(event) => useTable.setTr(Number(event.target.value))}
          className="h-8 w-[150px] lg:w-[250px]"
          type="number"
        />
      </div>

      <div className="flex flex-1 items-center space-x-2">
        <Label>10.5%</Label>
        <Input
          placeholder="Taxa de juros ..."
          value={useTable.feeTax}
          onChange={(event) => useTable.setFeeTax(Number(event.target.value))}
          className="h-8 w-[150px] lg:w-[250px]"
          type="number"
        />
      </div>

      <div className="flex flex-1 items-center space-x-2">
        <Label>Total Financiamento</Label>
        <Input
          placeholder="100.000"
          value={useTable.totalValue}
          onChange={(event) =>
            useTable.setTotalValue(Number(event.target.value))
          }
          className="h-8 w-[150px] lg:w-[250px]"
          type="number"
        />
      </div>

      <div className="flex flex-1 items-center space-x-2">
        <Label>Tempo Financiamento</Label>
        <Input
          type="number"
          placeholder="420"
          value={useTable.time}
          onChange={(event) => useTable.setTime(Number(event.target.value))}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  );
}
