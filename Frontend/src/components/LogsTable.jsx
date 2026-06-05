import { MoreHorizontalIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogMedia,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import AddDataForm from "./AddDataForm";
import EditFormData from "./EditFormData";

function LogsTable(props) {
  const paginationDataSize = Math.ceil(props.count / 5);
  // const [currentPage, setCurrentPage] = useState(1);

  // console.log(paginationDataSize);
  function paginationPages(i) {
    return (
      <PaginationItem key={i}>
        <PaginationLink
          isActive={props.currentPage === i ? true : false}
          onClick={() => {
            props.setCurrentPage(i);
          }}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  function paginationEllipsis() {
    return (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  function paginationNumbersDisplay() {
    const value =
      props.currentPage > 2
        ? props.currentPage < paginationDataSize
          ? props.currentPage - 2
          : props.currentPage - 3
        : 0;
    return (
      <>
        {Array.from(
          { length: paginationDataSize <= 3 ? paginationDataSize : 3 },
          (_, i) => paginationPages(i + 1 + value),
        )}
      </>
      // (props.currentPage === 1 ? 0 : props.currentPage)
    );
  }

  function PaginationDemo() {
    // console.log(paginationDataSize);
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                props.currentPage > 1
                  ? props.setCurrentPage(props.currentPage - 1)
                  : 0;
              }}
            />
          </PaginationItem>
          {paginationDataSize > 3 && props.currentPage > 2
            ? paginationEllipsis()
            : ""}
          {paginationNumbersDisplay()}
          {paginationDataSize > 3 && props.currentPage < paginationDataSize
            ? paginationEllipsis()
            : ""}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                props.currentPage < paginationDataSize
                  ? props.setCurrentPage(props.currentPage + 1)
                  : 0;
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  function descriptionWork(item) {
    if (item.description == "No description") {
      return item.description;
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Description</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Description</AlertDialogTitle>
            <AlertDialogDescription>
              {!item.description ? "No Description" : item.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Label>
              {`trasaction Date: ${new Date(item.createdAt).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              )}`}
              <br />
              {`last Edited Date:${new Date(item.updatedAt).toLocaleTimeString(
                [],
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}`}
            </Label>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  async function deleteData(id) {
    // console.log(id);
    const deletedData = await fetch(
      `${import.meta.env.BACKEND_URL}/transactionLog/deleteData`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      },
    );

    const value = await deletedData;
    const msg = await value.json();
    return msg.message;
  }
  function AlertDialogDelete(item) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Transaction Log?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this Transaction Log.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={async (e) => {
                const newData = props.data.filter(
                  (items) => items.id !== item.id,
                );
                props.setData(newData);
                const msg = await deleteData(item._id);
                props.getData();
                alert(msg);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  function AlertDialogEdit(item) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-[#d9ff0057]">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Log Update</DialogTitle>
            <DialogDescription>
              Transaction Log will be updated as soon as Edit button is pressed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center ">
            <div className="grid flex-1 ">
              <EditFormData
                setData={props.setData}
                data={props.data}
                editData={item}
                getData={props.getData}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="grid px-2 my-5 pt-1 gap-5">
      <div className="flex">
        <Table>
          <TableCaption>
            Table Showing logs of Amount Earned(Income), Spend(Expense){" "}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-2xl text-center">
                Transaction
              </TableHead>
              <TableHead className="text-2xl text-center">Amount</TableHead>
              <TableHead className="text-2xl text-center">
                Description
              </TableHead>
              <TableHead className="text-2xl text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center text-lg">
                  {item.type}
                </TableCell>
                <TableCell className="text-center text-lg">
                  {item.amount}
                </TableCell>
                <TableCell className="flex text-center text-lg justify-center ">
                  {descriptionWork(item)}
                </TableCell>
                <TableCell className="text-center text-lg">
                  {AlertDialogEdit(item)}
                  {AlertDialogDelete(item)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {PaginationDemo()}
    </div>
  );
}

export default LogsTable;

//bin
{
  /* <ScrollArea className=" w-60 rounded-md border p-2">
                    <div className=" w-60">{item.description}</div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea> */
}
{
  /* <Button
                    onClick={(e) => {
                      const newData = props.data.filter(
                        (items) => items.id !== item.id,
                      );
                      console.log(newData);
                      props.setData(newData);
                    }}
                  >
                    Delete
                  </Button> */
}

//   function dropDownThings(item) {
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon" className="size-8">
//             <MoreHorizontalIcon />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem>Edit</DropdownMenuItem>
//           <DropdownMenuItem>Description</DropdownMenuItem>
//           <DropdownMenuSeparator />

//           <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );
//   }
