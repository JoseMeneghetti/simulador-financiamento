import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface DataTable {
  parcela: number;
  divida: number;
  correcao: number;
  dividaCorrigida: number;
  amortizacao: number;
  juros: number;
  txAdicional: number;
  valorMensal: number;
  saldo: number;
}

interface AmortizationT {
  parcela: number;
  value: number;
}

interface TableContextProps {
  tr: number;
  setTr: Dispatch<SetStateAction<number>>;
  feeTax: number;
  setFeeTax: Dispatch<SetStateAction<number>>;
  totalValue: number;
  setTotalValue: Dispatch<SetStateAction<number>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  tableData: DataTable[] | null;
  isLoading: boolean;
  amortization: AmortizationT[];
  setAmortization: Dispatch<SetStateAction<AmortizationT[]>>;
}

export const TableContext = createContext<TableContextProps | null>(null);

const TableProvider = ({ children }: any) => {
  const [isLoading, setIsloading] = useState(false);
  const [tr, setTr] = useState(1);
  const [feeTax, setFeeTax] = useState(10.5);
  const [totalValue, setTotalValue] = useState(700000);
  const [time, setTime] = useState(360);
  const [amortization, setAmortization] = useState<AmortizationT[]>([]);
  const [tableData, setTableData] = useState<DataTable[] | null>(null);

  useEffect(() => {
    setIsloading(true);
    let data = [];
    let totalAmortizacaoExtra = amortization.reduce(
      (total, amort) => total + amort.value,
      0
    );
    let tempoRestante = time;
    for (let index = 0; index < time; index++) {
      if (data[index - 1]?.saldo < 1) {
        break;
      }

      const mesAmortizado = amortization.find((el) => el.parcela === index);

      const baseTotal: number =
        index === 0 ? totalValue : data[index - 1]?.saldo;

      const baseTime: number =
        index === 0 ? tempoRestante : tempoRestante - index;

      const trPercentage = tr / 100;
      const feeTaxPercentage = feeTax / 100;
      const correcao = baseTotal * (trPercentage / 12);
      const dividaCorrigida = baseTotal + correcao;
      const amortizacaoMensal = dividaCorrigida / baseTime;
      const juros = dividaCorrigida * (1 + feeTaxPercentage / 12) - baseTotal;
      const taxaAdicional = 90;
      const saldo = dividaCorrigida - amortizacaoMensal;

      const saldoTaxaExtra = saldo - (mesAmortizado?.value ?? 0);

      if (totalAmortizacaoExtra > 0) {
        totalAmortizacaoExtra -= amortizacaoMensal;
        tempoRestante--;
      }

      data.push({
        parcela: index,
        divida: Number(baseTotal.toFixed(2)),
        correcao: Number(correcao.toFixed(2)),
        dividaCorrigida: Number(dividaCorrigida.toFixed(2)),
        amortizacao: Number(amortizacaoMensal.toFixed(2)),
        juros: Number(juros.toFixed(2)),
        txAdicional: Number(taxaAdicional.toFixed(2)),
        valorMensal: Number(
          (amortizacaoMensal + juros + taxaAdicional).toFixed(2)
        ),
        saldo: Number(saldoTaxaExtra.toFixed(2)) ?? Number(saldo.toFixed(2)),
      });
    }

    setTableData(data);
    setIsloading(true);
  }, [tr, feeTax, totalValue, time, amortization]);

  return (
    <TableContext.Provider
      value={{
        tr,
        setTr,
        feeTax,
        setFeeTax,
        totalValue,
        setTotalValue,
        time,
        setTime,
        tableData,
        isLoading,
        amortization,
        setAmortization,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
