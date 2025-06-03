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
import { FormInput } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const AddColumnDialog = ({ table, onAddColumnSuccess }) => {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const onAddColumnClick = (e) => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onSubmitColumnClick = (e) => {
    // e.preventDefault();
    const toastId = toast.loading("Adding column...");
    setOpen(false);
    axios
      .post(`${BASE_URL}/api/tables/${table.id}/columns`, formData)
      .then((response) => {
        console.log(response.data);
        onAddColumnSuccess(response.data);
        setFormData({});
        toast.success("Successfully added column!", { id: toastId });
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
          <Button
            onClick={(e) => {
              onAddColumnClick(e);
            }}
          >
            Add Column
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Column</DialogTitle>
            <DialogDescription>
              Add a column to {table.name} table
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fieldNameInput">Field Name</Label>
              <Input
                id="fieldNameInput"
                value={formData.fieldName}
                onChange={(e) => onChange(e, "fieldName")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataTypeInput">Data Type</Label>
              <Input
                id="dataTypeInput"
                value={formData.dataType}
                onChange={(e) => onChange(e, "dataType")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataLengthInput">Data Length</Label>
              <Input
                id="dataLengthInput"
                value={formData.dataLength}
                onChange={(e) => onChange(e, "dataLength")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nullableInput">Nullable</Label>
              <Input
                id="nullableInput"
                value={formData.nullable}
                onChange={(e) => onChange(e, "nullable")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="autoIncrementInput">Auto Increment</Label>
              <Input
                id="autoIncrementInput"
                value={formData.autoIncrement}
                onChange={(e) => onChange(e, "autoIncrement")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keyTypeInput">Key Type</Label>
              <Input
                id="keyTypeInput"
                value={formData.keyType}
                onChange={(e) => onChange(e, "keyType")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="defaultValueInput">Default Value</Label>
              <Input
                id="defaultValueInput"
                value={formData.defaultValue}
                onChange={(e) => onChange(e, "defaultValue")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descriptionInput">Description</Label>
              <Input
                id="descriptionInput"
                value={formData.description}
                onChange={(e) => onChange(e, "description")}
              ></Input>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitColumnClick}>
              Add Column
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddColumnDialog;
