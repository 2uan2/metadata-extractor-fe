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
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;

const AddConstraintDialog = ({ table, onAddConstraintSuccess }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const onAddConstraintClick = () => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onSubmitConstraintClick = () => {
    const toastId = toast.loading(t("addingConstraintToast"));
    setOpen(false);
    axios
      .post(`${BASE_URL}/api/tables/${table.id}/constraints`, formData)
      .then((response) => {
        onAddConstraintSuccess(response.data);
        setFormData({});
        toast.success(t("successfulAddToast"), { id: toastId });
      })
      .catch(() => {
        setOpen(true);
        toast.error(t("failureAddToast"), { id: toastId });
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
            {t("addConstraintButtonText")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("addConstraintButtonText")}</DialogTitle>
            <DialogDescription>
              {t("addConstraintToTableDescription", { tableName: table.name })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="keyNameInput">{t("keyNameLabel")}</Label>
              <Input
                id="keyNameInput"
                value={formData.keyName}
                onChange={(e) => onChange(e, "keyName")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="columnNameInput">{t("columnNameLabel")}</Label>
              <Input
                id="columnNameInput"
                value={formData.columnName}
                onChange={(e) => onChange(e, "columnName")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keyTypeInput">
                {t("keyTypeLabelConstraint")}
              </Label>
              <Input
                id="keyTypeInput"
                value={formData.keyType}
                onChange={(e) => onChange(e, "keyType")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="referencedTableNameInput">
                {t("referencedTableNameLabel")}
              </Label>
              <Input
                id="referencedTableNameInput"
                value={formData.referencedTableName}
                onChange={(e) => onChange(e, "referencedTableName")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="referencedColumnName">
                {t("referencedColumnNameLabel")}
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
              <Button>{t("cancelButtonText")}</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitConstraintClick}>
              {t("addConstraintButtonText")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddConstraintDialog;
