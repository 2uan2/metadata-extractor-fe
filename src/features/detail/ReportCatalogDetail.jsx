import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import ReportBasicEditor from "./ReportBasicEditor";
import CatalogEditorCard from "@/shared/CatalogEditorCard";

const BASE_URL = import.meta.env.VITE_API_URL;

const ReportCatalogDetail = () => {
  const { t } = useTranslation();
  const { reportData: loaderReport } = useLoaderData();
  const [reportData, setReportData] = useState(loaderReport);

  const onActionDeleteClick = (id) => {
    const toastId = toast.loading(t("pleaseWait"));
    axios
      .delete(`${BASE_URL}/api/catalogs/${id}`)
      .then(() => {
        toast.success(t("successfulDeleteToast"), { id: toastId });
        setReportData((prevReport) => {
          return {
            ...prevReport,
            catalogs: prevReport.catalogs.filter((catalog) => catalog.id != id),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureDeleteToast"), { id: toastId });
      });
  };

  const onSave = (id, payload) => {
    const toastId = toast.loading(t("savingString"));
    axios
      .put(`${BASE_URL}/api/reports/${reportData.id}/catalogs/${id}`, payload)
      .then((response) => {
        toast.success(t("successfulUpdateToast"), { id: toastId });
        setReportData((prevReport) => {
          return {
            ...prevReport,
            catalogs: prevReport.catalogs.map((catalog) => {
              if (catalog.id == response.data.id) return response.data;
              return catalog;
            }),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureUpdateToast"), { id: toastId });
      });
  };

  const onSaveAll = () => {
    reportData.catalogs.forEach((catalog) => {
      onSave(catalog.id, catalog);
    });
  };

  return (
    <div className="space-y-2">
      <Toaster />
      <Label className="text-2xl font-bold">{t("reportLabel")}</Label>
      <ReportBasicEditor
        reportData={reportData}
        setReportData={setReportData}
      />
      <CatalogEditorCard
        reportData={reportData}
        setReportData={setReportData}
        onActionDeleteClick={onActionDeleteClick}
        onSave={onSave}
        onSaveAll={onSaveAll}
      />
    </div>
  );
};

export default ReportCatalogDetail;
