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

const AddTableDialog = ({ catalogData, onAddTableSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const onAddTableClick = () => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onSubmitTableClick = () => {
    // e.preventDefault();
    // console.log(e);
    const toastId = toast.loading(t("addingTableToast"));
    setOpen(false);
    axios
      .post(`${BASE_URL}/api/catalogs/${catalogData.id}/tables`, formData)
      .then((response) => {
        onAddTableSuccess(response.data);
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
      <form onSubmit={onSubmitTableClick}>
        <DialogTrigger asChild>
          <Button onClick={onAddTableClick}>{t("addTableText")}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("addTableText")}</DialogTitle>
            <DialogDescription>
              {t("addTableToCatalogDescription", {
                catalogName: catalogData.name,
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nameInput">{t("tableNameLabel")}</Label>
              <Input
                id="nameInput"
                value={formData.name}
                onChange={(e) => onChange(e, "name")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descriptionInput">{t("descriptionLabel")}</Label>
              <Input
                id="descriptionInput"
                value={formData.description}
                onChange={(e) => onChange(e, "description")}
              ></Input>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>{t("cancelButtonText")}</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitTableClick}>
              {t("addTableText")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddTableDialog;
