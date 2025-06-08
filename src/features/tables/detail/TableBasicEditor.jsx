import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";

const BASE_URL = import.meta.env.VITE_API_URL;

const TableBasicEditor = ({ tableData, setTableData }) => {
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const handleInputChange = (e, input) => {
    setTableData((prev) => ({
      ...prev,
      [input]: e.target.value,
    }));
  };

  const handleBasicSubmit = () => {
    setLoading(true);
    const toastId = toast.loading(t("updatingTableToast"));
    axios
      .put(
        `${BASE_URL}/api/catalogs/${tableData.catalogId}/tables/${tableData.id}`,
        tableData
      )
      .then((r) => {
        setLoading(false);
        toast.success(t("successfulUpdateToast"), { id: toastId });
        console.log(r);
      })
      .catch((e) => {
        toast.error(t("failureUpdateToast"), { id: toastId });
        console.log(e);
      });
  };
  return (
    <>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>{t("basicInfo")}</CardTitle>
          <CardDescription>{t("editBasicInfoTable")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Label>{t("tableNameLabel")}</Label>
            <Input
              value={tableData.name}
              onChange={(e) => handleInputChange(e, "name")}
            ></Input>
            <Label>{t("descriptionLabel")}</Label>
            <Textarea
              value={tableData.description}
              onChange={(e) => handleInputChange(e, "description")}
            ></Textarea>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} onClick={handleBasicSubmit}>
            {loading ? t("savingString") : t("saveBasicInfoButton")}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TableBasicEditor;
