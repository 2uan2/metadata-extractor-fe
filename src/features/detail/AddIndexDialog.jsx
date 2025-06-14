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
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;

const AddIndexDialog = ({ table, onAddIndexSuccess }) => {
  const { t } = useTranslation();
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
    const toastId = toast.loading(t("addingIndexToast"));
    setOpen(false);
    axios
      .post(`${BASE_URL}/api/tables/${table.id}/indexes`, formData)
      .then((response) => {
        onAddIndexSuccess(response.data);
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
          <Button onClick={onAddIndexClick}>{t("addIndexButtonText")}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("addIndexButtonText")}</DialogTitle>
            <DialogDescription>
              {t("addIndexToTableDescription", { tableName: table.name })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nameInput">{t("indexNameLabel")}</Label>
              <Input
                id="nameInput"
                value={formData.name}
                onChange={(e) => onChange(e, "name")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="referencedColumnName">
                {t("indexReferencedColumnNameLabel")}
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
              <Button>{t("cancelButtonText")}</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitColumnClick}>
              {t("addIndexButtonText")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddIndexDialog;
