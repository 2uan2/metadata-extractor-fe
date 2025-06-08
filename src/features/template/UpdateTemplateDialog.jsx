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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateTemplateDialog = ({ template, onUpdateSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(template);
  const [open, setOpen] = useState(false);

  const onUpdateTemplateClick = () => {
    setOpen(true);
  };

  const onChange = (e, formValueName) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [formValueName]: e.target.value };
    });
  };

  const onUpdateTemplateSubmit = () => {
    const toastId = toast.loading(t("updatingToast"));
    setOpen(false);
    axios
      .put(`${BASE_URL}/api/templates/${template.id}`, formData)
      .then((response) => {
        onUpdateSuccess(response.data);
        // setFormData(response.data);
        toast.success(t("successfulUpdateToast"), { id: toastId });
      })
      .catch(() => {
        setOpen(true);
        toast.error(t("failureUpdateToast"), { id: toastId });
      });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <form>
        <DialogTrigger asChild>
          <Button onClick={onUpdateTemplateClick}>
            {t("updateTemplateButtonText")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("updateTemplateTitle")}</DialogTitle>
            <DialogDescription>
              {t("updateTemplateDescription", {
                templateId: template.id,
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nameInput">{t("templateNameText")}</Label>
              <Input
                id="nameInput"
                value={formData.name}
                onChange={(e) => onChange(e, "name")}
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descriptionInput">
                {t("templateDescriptionText")}
              </Label>
              <Textarea
                id="descriptionInput"
                value={formData.description}
                onChange={(e) => onChange(e, "description")}
              ></Textarea>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>{t("cancelButtonText")}</Button>
            </DialogClose>
            <Button type="submit" onClick={onUpdateTemplateSubmit}>
              {t("updateTemplateButtonText")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UpdateTemplateDialog;
