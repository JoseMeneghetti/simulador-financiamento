"use client";

import { LightningBoltIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Button } from "../ui/button";
import UseTable from "../../../hooks/table-hook";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const useTable = UseTable();
  const amortizacao = useTable?.amortization.find(
    (el) => el.parcela === row.getValue("parcela")
  );

  const handleSetAmortization = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    useTable?.setAmortization((old) => {
      const oldFiltered = old.filter(
        (el) => el.parcela !== amortizacao?.parcela
      );
      return [
        ...oldFiltered,
        {
          parcela: Number(row.getValue("parcela")),
          value: Number(e.currentTarget?.value),
        },
      ];
    });
  };

  return (
    <Popover key={row.getValue("parcela")}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {amortizacao?.value ?? "0"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[150px] p-0 flex items-center rounded-lg"
        align="start"
      >
        <LightningBoltIcon className="mx-2" />
        <Input
          type="number"
          onBlurCapture={(e) => handleSetAmortization(e)}
        ></Input>
      </PopoverContent>
    </Popover>
  );
}
