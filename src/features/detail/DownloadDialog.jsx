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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const BASE_URL = import.meta.env.VITE_API_URL;
const CARBONE_URL = import.meta.env.VITE_CARBONE_URL;

const DownloadDialog = ({ reportData }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [templates, setTemplates] = useState([]);
  const [selectedFileType, setSelectedFileType] = useState("pdf");
  const selectValues = useMemo(() => {
    return templates.map((template) => {
      return { value: template.id, label: template.id };
    });
  }, [templates]);
  const fileTypes = [
    { value: "pdf", label: "Pdf" },
    { value: "docx", label: "Docx" },
    { value: "odt", label: "Odt" },
  ];

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/templates`)
      .then((response) => {
        setTemplates(response.data.content);
        setSelectedTemplate(response.data.content[0]);
        console.log("data gotten:");
        console.log(response.data);
        console.log(response.data.content[0]);
        // console.log(templates);
      })
      .then((error) => console.log(error));
  }, []);

  const onDownloadClick = () => {
    // const toastId = toast.loading(t("addingTableToast"));
    setOpen(false);
    // window.open(`${CARBONE_URL}/render/${selectedTemplate.id}?download=true`, {
    //   data: reportData,
    // });
    axios
      .post(
        `${CARBONE_URL}/render/${selectedTemplate.id}`,
        {
          data: reportData,
          convertTo: selectedFileType,
        }
        // {
        //   headers: {
        //     "Content-Disposition": 'attachment; filename="report.pdf"',
        //     "Content-Type": "application/pdf",

        //     // "Content-Type": "application/pdf",
        //   },
        //   responseType: "blob",
        // }
      )
      .then((response) => {
        window.open(`${CARBONE_URL}/render/${response.data.data.renderId}`);
      })
      .catch(() => {
        setOpen(true);
      });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <form>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>
            {t("downloadButtonText")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t("downloadButtonText")}</DialogTitle>
            <DialogDescription>
              {t("selectDownloadOptionText")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="templateSelect">
                {t("selectedTemplateLabel")}
              </Label>
              <Select
                id="templateSelect"
                defaultValue={selectValues[0]}
                options={selectValues}
                onChange={(newValue) => {
                  setSelectedTemplate(
                    templates.find((template) => template.id === newValue.value)
                  );
                }}
              />
              <Label htmlFor="fileTypeSelect">{t("selectFileTypeLabel")}</Label>
              <Select
                id="fileTypeSelect"
                defaultValue={fileTypes[0]}
                options={fileTypes}
                onChange={(newValue) => {
                  setSelectedFileType(newValue.value);
                }}
              />

              {/* <Input
                id="idInput"
                value={selectedTemplate.id}
                onChange={(e) => {
                  setSelectedTemplate((prev) => {
                    return { ...prev, id: e.target.value };
                  });
                }}
              ></Input> */}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>{t("cancelButtonText")}</Button>
            </DialogClose>
            <Button type="submit" onClick={onDownloadClick}>
              {t("downloadButtonText")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DownloadDialog;
