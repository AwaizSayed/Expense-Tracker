import { useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";

function EditFormData(props) {
  const [description, setDescription] = useState(props.editData.description);
  const [selected, setSelected] = useState(props.editData.type);
  const [amount, setAmount] = useState(props.editData.amount);

  async function updateData() {
    const updatedData = [
      description === "" ? "No description" : description,
      selected,
      amount,
    ];
    const id = props.editData._id;
    const updateBackendData = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/transactionLog/updateData`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, updatedData }),
      },
    );
    const backendData = await updateBackendData.json();
    const messageOfBackend = await backendData.message;
    return messageOfBackend;
  }

  const handleOnClick = async (e) => {
    e.preventDefault();
    const msg = await updateData();
    props.getData();

    // props.setData(
    //   props.data.map((value) =>
    //     value.id === props.editData.id
    //       ? {
    //           id: props.editData.id,
    //           type: selected,
    //           amount: Number(amount),
    //           description: description === "" ? "No description" : description,
    //         }
    //       : value,
    //   ),
    // );

    alert(msg);
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
        <Button className="w-61" onClick={(e) => handleOnClick(e)}>
          Edit
        </Button>
      </div>
    </form>
  );
}

export default EditFormData;

//-------Bin-------
//   console.log(props.data);
//   console.log(props.data.description);
// let newData = [];
// for (let i of props.data) {
//   if (i.id === props.editData.id) {
//     newData = [
//       ...newData,
//       {
//         id: props.editData.id,
//         type: selected,
//         amount: Number(amount),
//         description: description === "" ? "No description" : description,
//       },
//     ];
//     continue;
//   }

//   newData = [...newData, i];
// }
// props.setData(newData);
// alert("Data Edited Successfully!!!");
