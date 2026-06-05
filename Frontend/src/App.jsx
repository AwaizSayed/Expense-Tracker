import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./components/ui/label";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Textarea } from "./components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Field, FieldDescription, FieldLabel } from "./components/ui/field";
import AddDataForm from "./components/AddDataForm";
import TotalTable from "./components/TotalTable";
import LogsTable from "./components/LogsTable";
("use client");

import { Progress } from "@/components/ui/progress";

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState({});

  // const [progress, setProgress] = useState(0);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [currentPage]);

  async function getData() {
    // setProgress(0);
    const fetchBackendData = await fetch(
      `${import.meta.env.BACKEND_URL}/transactionLog/getData?currentPage=${currentPage}`,
    );
    // setProgress(50);
    const backendData = await fetchBackendData.json();
    const { data, count, totalData } = await backendData;

    setData(data);
    setCount(count);
    if (totalData) {
      setTotalData(totalData);
    }

    // setProgress(100); // done
  }

  return (
    <>
      <div className="grid pl-2 pt-5 gap-y-4">
        <Label className="text-4xl place-self-center">Expense Tracker</Label>

        <AddDataForm setData={setData} data={data} getData={getData} />

        <TotalTable data={data} totalData={totalData} />

        <hr className="border-2 border-black mr-2" />

        <Label className="text-3xl place-self-center pt-2">
          Transactions / Logs
        </Label>
        {/* <Progress value={progress} className="w-[60%]" /> */}
        <LogsTable
          setData={setData}
          data={data}
          count={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          getData={getData}
        />
      </div>
    </>
  );
}

export default App;
