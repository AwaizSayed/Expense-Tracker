import { useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function AddDataForm(props) {
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("Income");
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOnClick = async (e) => {
    e.preventDefault();
    // props.setData([
    //   ...props.data,
    //   {
    //     id: Date.now(),
    //     type: selected,
    //     amount: Number(amount),
    //     description: description === "" ? "No description" : description,
    //   },
    // ]);
    let addData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transactionLog/addData`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ description, selected, amount }),
    });
    // .then((value) => {
    //   console.log(value.json());
    // })
    // .then((value) => {
    //   console.log(value);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    let resData = await addData.json();
    if (!resData.message) {
      alert("There was an error in adding the transaction");
    } else {
      props.getData();
      alert(resData.message);
    }
    // console.log("data", );
    // alert("Data Saved Successfully!!!");
  };
  return (
    <form className="grid pl-2 pt-5 gap-y-4">
      <div className="flex">
        <RadioGroup
          className=" flex flex-column"
          defaultValue={selected}
          onValueChange={(e) => {
            setSelected(e);
          }}
        >
          <div
            className="flex items-center gap-3"
            onClick={() => setSelected("Income")}
          >
            <RadioGroupItem
              value="Income"
              id="Income"
              className="border-2 border-[#0000007a]"
            />
            <Label htmlFor="Income">Income</Label>
          </div>

          <div
            className="flex items-center gap-3"
            onClick={() => setSelected("Expense")}
          >
            <RadioGroupItem
              className="border-2 border-[#0000007a]"
              value="Expense"
              id="Expense"
            />
            <Label htmlFor="Expense">Expense</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex">
        <div className="grid gap-y-1">
          <Field>
            <FieldLabel className="pl-1">Amount</FieldLabel>
            <Input
              placeholder="1000"
              value={!amount ? "" : amount}
              onChange={(e) => {
                try {
                  const value = Number(e.target.value);
                  if (isNaN(value)) {
                    throw new Error(value);
                  }
                } catch (err) {
                  // console.log(err);
                  return;
                }
                setAmount(e.target.value);
              }}
              className="w-61"
            ></Input>
            <FieldDescription className="pl-1">
              Enter Numbers only
            </FieldDescription>
          </Field>
        </div>
      </div>

      <div className="flex">
        <div className="grid gap-y-1">
          <Label className="pl-1">Description</Label>
          <Textarea
            placeholder="Purchased new Headphone"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-61"
          ></Textarea>
        </div>

        {/* <div className="pl-0.5 grid content-end">
            <Button>Set</Button>
          </div> */}
      </div>

      <div className=" pl-0.5">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button className="w-61">Add</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure, you want to add this data?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {`Selected: ${selected}`} <br /> {`Amount: ${amount}`}
                <br /> {`Description: ${description}`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="w-21"
                onClick={async (e) => {
                  setOpen(false);
                  handleOnClick(e);
                }}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
}

export default AddDataForm;

//bin
//  <Button className="w-61" onClick={(e) => handleOnClick(e)}>
//                   Add
//                 </Button>
