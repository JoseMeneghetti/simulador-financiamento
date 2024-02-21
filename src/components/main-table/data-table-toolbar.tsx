"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UseTable from "../../../hooks/table-hook";
import { debounce } from "lodash";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const useTable = UseTable();
  const [radioState, setRadioState] = useState("mensal");
  const [value, setValue] = useState(0);

  if (!useTable) {
    return <></>;
  }

  const handleInBatch = () => {
    let newArray = [];
    const time = useTable.time;

    for (let index = 0; index < time; index++) {
      if (radioState === "mensal") {
        newArray.push({
          parcela: index,
          value: value,
        });
      } else if (index % 12 === 0) {
        newArray.push({
          parcela: index,
          value: value,
        });
      }
    }

    useTable.setAmortization(newArray);
  };

  const totalFinal = useTable.tableData?.reduce((acc: number, el) => {
    if (el.saldo > 0) {
      return acc + el.valorMensal;
    }
    return acc;
  }, 0);

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

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button>Amortizar em lote</Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4" side="right">
            <RadioGroup
              defaultValue="mensal"
              onValueChange={(value) => setRadioState(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mensal" id="option-two" />
                <Label htmlFor="option-two">Mensal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anual" id="option-one" />
                <Label htmlFor="option-one">Anual</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="ex: 1000"
              type="number"
              onChange={(e) => setValue(Number(e.currentTarget.value))}
              value={value}
            />
            <Button onClick={handleInBatch}>Amortizar em lote</Button>
          </PopoverContent>
        </Popover>
      </div>
      <div>Valor total do financiamento: {totalFinal?.toFixed(2)}</div>
    </div>
  );
}
