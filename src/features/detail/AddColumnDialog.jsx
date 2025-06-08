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

const AddColumnDialog = ({ table, onAddColumnSuccess }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const onAddColumnClick = () => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onSubmitColumnClick = () => {
    const toastId = toast.loading(t("addingColumnToast"));
    setOpen(false);
    axios
      .post(`${BASE_URL}/api/tables/${table.id}/columns`, formData)
      .then((response) => {
        onAddColumnSuccess(response.data);
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
              onAddColumnClick(e);
            }}
          >
            {t("addColumnButtonText")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("addColumnDialogTitle")}</DialogTitle>
            <DialogDescription>
              {t("addColumnToTableDescription", { tableName: table.name })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fieldNameInput">{t("fieldNameLabel")}</Label>
              <Input
                id="fieldNameInput"
                value={formData.fieldName}
                onChange={(e) => onChange(e, "fieldName")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataTypeInput">{t("dataTypeLabel")}</Label>
              <Input
                id="dataTypeInput"
                value={formData.dataType}
                onChange={(e) => onChange(e, "dataType")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataLengthInput">{t("dataLengthLabel")}</Label>
              <Input
                id="dataLengthInput"
                value={formData.dataLength}
                onChange={(e) => onChange(e, "dataLength")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nullableInput">{t("nullableLabel")}</Label>
              <Input
                id="nullableInput"
                value={formData.nullable}
                onChange={(e) => onChange(e, "nullable")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="autoIncrementInput">
                {t("autoIncrementLabel")}
              </Label>
              <Input
                id="autoIncrementInput"
                value={formData.autoIncrement}
                onChange={(e) => onChange(e, "autoIncrement")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keyTypeInput">{t("keyTypeLabel")}</Label>
              <Input
                id="keyTypeInput"
                value={formData.keyType}
                onChange={(e) => onChange(e, "keyType")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="defaultValueInput">
                {t("defaultValueLabel")}
              </Label>
              <Input
                id="defaultValueInput"
                value={formData.defaultValue}
                onChange={(e) => onChange(e, "defaultValue")}
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
            <Button type="submit" onClick={onSubmitColumnClick}>
              {t("addColumnButtonText")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddColumnDialog;
