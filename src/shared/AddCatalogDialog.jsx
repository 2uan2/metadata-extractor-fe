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

const AddCatalogDialog = ({ reportData, onAddCatalogSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const onAddCatalogClick = () => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onSubmitTableClick = () => {
    const toastId = toast.loading(t("addingTableToast"));
    setOpen(false);
    axios
      .post(`${BASE_URL}/api/reports/${reportData.id}/catalogs`, formData)
      .then((response) => {
        onAddCatalogSuccess(response.data);
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
          <Button onClick={onAddCatalogClick}>
            {t("addCatalogDialogTitle")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("addCatalogDialogTitle")}</DialogTitle>
            <DialogDescription>
              {t("addTableToCatalogDescription", {
                reportUrl: reportData.url,
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nameInput">{t("catalogNameText")}</Label>
              <Input
                id="nameInput"
                value={formData.name}
                onChange={(e) => onChange(e, "name")}
              ></Input>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>{t("cancelButtonText")}</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitTableClick}>
              {t("addCatalogDialogTitle")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddCatalogDialog;
