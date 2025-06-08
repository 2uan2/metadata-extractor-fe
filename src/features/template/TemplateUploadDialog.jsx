import { useState, useRef } from "react";
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
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;
const CARBONE_URL = import.meta.env.VITE_CARBONE_URL;

const TemplateUploadDialog = ({ onUploadSuccess }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const onOpenDialog = () => {
    setOpen(true);
    setFile(null);
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        selectedFile.name.endsWith(".pdf") ||
        selectedFile.name.endsWith(".docx")
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Please select a PDF or DOCX file");
        e.target.value = null;
      }
    }
  };

  const clearSelectedFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("template", file);

    const toastId = toast.loading("Uploading file...");

    axios.post(`${CARBONE_URL}/template`, formData).then((response) => {
      const data = response.data.data.templateId;
      console.log(data);

      toast.success("File uploaded successfully", { id: toastId });
      setOpen(false);
      setFile(null);

      axios
        .post(`${BASE_URL}/api/templates`, {
          id: data,
          name: null,
          description: null,
        })
        .then((response) => {
          onUploadSuccess();
          console.log(response);
        })
        .catch((error) => console.log(error));
    });

    setIsUploading(false);
  };

  const getFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={onOpenDialog}>
          {/* <UploadIcon className="mr-2 h-4 w-4" /> */}
          {t("uploadTemplateText")}
          {/* Upload Document */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("uploadTemplateText")}</DialogTitle>
          <DialogDescription>
            {t("uploadTemplateDescription")}
            {/* Upload a PDF or DOCX file to the system. */}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="file">{t("templateLabel")}</Label>

            {!file ? (
              <div className="grid gap-2">
                <Input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={onFileChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  {t("acceptedFileTypes", { fileTypes: "PDF, DOCX" })}
                  {/* Accepted file types: PDF, DOCX */}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  {/* <FileIcon className="h-4 w-4 text-blue-500" /> */}
                  <div className="grid gap-0.5">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSelectedFile}
                  className="h-8 w-8"
                >
                  {/* <X className="h-4 w-4" /> */}
                  <span className="sr-only">{t("removeFileLabel")}</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              {t("cancelButtonText")}
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? t("uploading") : t("uploadLabel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateUploadDialog;
