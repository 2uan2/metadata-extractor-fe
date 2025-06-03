import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const AddIndexDialog = ({ table, onAddIndexSuccess }) => {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const onAddIndexClick = () => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onSubmitColumnClick = () => {
    const toastId = toast.loading("Adding index...");
    setOpen(false);
    axios
      .post(`${BASE_URL}/api/tables/${table.id}/indexes`, formData)
      .then((response) => {
        onAddIndexSuccess(response.data);
        setFormData({});
        toast.success("Successfully added index!", { id: toastId });
      })
      .catch((error) => {
        setOpen(true);
        toast.error("Uh oh, something went wrong", { id: toastId });
      });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <form>
        <DialogTrigger asChild>
          <Button onClick={onAddIndexClick}>Add Index</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Index</DialogTitle>
            <DialogDescription>
              Add an index to {table.name} table
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nameInput">Name</Label>
              <Input
                id="nameInput"
                value={formData.name}
                onChange={(e) => onChange(e, "name")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="referencedColumnName">
                Referenced Column Name
              </Label>
              <Input
                id="referencedColumnName"
                value={formData.referencedColumnName}
                onChange={(e) => onChange(e, "referencedColumnName")}
              ></Input>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitColumnClick}>
              Add Index
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddIndexDialog;
