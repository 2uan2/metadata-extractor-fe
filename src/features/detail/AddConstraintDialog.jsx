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

const AddConstraintDialog = ({ table, onAddConstraintSuccess }) => {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const onAddConstraintClick = (e) => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onSubmitConstraintClick = (e) => {
    const toastId = toast.loading("Adding constraint...");
    axios
      .post(`${BASE_URL}/api/tables/${table.id}/constraints`, formData)
      .then((response) => {
        onAddConstraintSuccess(response.data);
        setFormData({});
        setOpen(false);
        toast.success("Successfully added constraint!", { id: toastId });
      })
      .catch((error) => {
        toast.error("Uh oh, something went wrong", { id: toastId });
      });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <form>
        <DialogTrigger asChild>
          <Button
            onClick={(e) => {
              onAddConstraintClick(e);
            }}
          >
            Add Constraint
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Constraint</DialogTitle>
            <DialogDescription>
              Add a constraint to {table.name} table
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="keyNameInput">Key Name</Label>
              <Input
                id="keyNameInput"
                value={formData.keyName}
                onChange={(e) => onChange(e, "keyName")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="columnNameInput">Column Name</Label>
              <Input
                id="columnNameInput"
                value={formData.columnName}
                onChange={(e) => onChange(e, "columnName")}
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
              <Label htmlFor="referencedTableNameInput">
                Referenced Table Name
              </Label>
              <Input
                id="referencedTableNameInput"
                value={formData.referencedTableName}
                onChange={(e) => onChange(e, "referencedTableName")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="referencedColumnName">
                Referenced Column Name
              </Label>
              <Input
                id="referencedColumnNameInput"
                value={formData.referencedColumnName}
                onChange={(e) => onChange(e, "referencedColumnName")}
              ></Input>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitConstraintClick}>
              Add Constraint
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddConstraintDialog;
