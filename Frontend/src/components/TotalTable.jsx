import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function TotalTable(props) {
  const incomeData = props.data
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const { totalIncome, totalExpense, remainingAmount } = props.totalData;

  const expenseData = props.data
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="grid px-2">
      <div className="flex">
        <Table>
          <TableCaption>
            Table Showing Total Amount Earned(Income), Spend(Expense) and
            Remaining Amount(Savings){" "}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-2xl text-center">
                Total Income
              </TableHead>
              <TableHead className="text-2xl text-center">
                Total Expense
              </TableHead>
              <TableHead className="text-2xl text-center">Remaining</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow id="Row1">
              <TableCell className="text-center text-lg">
                {!totalIncome ? "0" : totalIncome}
              </TableCell>
              <TableCell className="text-center text-lg">
                {!totalExpense ? "0" : totalExpense}
              </TableCell>
              <TableCell className="text-center text-lg">
                {!remainingAmount ? "0" : remainingAmount}
                {/* {(!incomeData ? 0 : incomeData) -
                  (!expenseData ? 0 : expenseData)} */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* onClick={(e) => {
                  e.target.parentElement.style.backgroundColor = "grey";
                  // e.nativeEvent.srcElement.style.backgroundColor = "grey";
                  console.log(e.target.parentElement.id);
                }} */}
      </div>
    </div>
  );
}

export default TotalTable;
