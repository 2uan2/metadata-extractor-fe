import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";

const BASE_URL = import.meta.env.VITE_API_URL;

const CatalogBasicEditor = ({ catalogData, setCatalogData }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleNameChange = (e) => {
    setCatalogData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleBasicSubmit = () => {
    setLoading(true);
    const toastId = toast.loading(t("updatingCatalogToast"));
    axios
      .put(
        `${BASE_URL}/api/reports/${catalogData.reportId}/catalogs/${catalogData.id}`,
        catalogData
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
          <CardDescription>{t("editBasicInfoCatalog")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Label>
              {t("catalogNameLabel", { catalogName: catalogData.name })}
            </Label>
            <Input value={catalogData.name} onChange={handleNameChange}></Input>
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

export default CatalogBasicEditor;
