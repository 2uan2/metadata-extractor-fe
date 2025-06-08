import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import CatalogBasicEditor from "./CatalogBasicEditor";
import TableEditorCard from "@/shared/TableEditorCard";

const BASE_URL = import.meta.env.VITE_API_URL;

const CatalogDetail = () => {
  const { t } = useTranslation();
  const { catalogData: loaderCatalog } = useLoaderData();
  const [catalogData, setCatalogData] = useState(loaderCatalog);

  const onActionDeleteClick = (e, deleteType, id) => {
    const toastId = toast.loading(t("pleaseWait"));
    axios
      .delete(`${BASE_URL}/api/tables/${id}`)
      .then(() => {
        toast.success(t("successfulDeleteToast"), { id: toastId });
        setCatalogData((prevCatalog) => {
          return {
            ...prevCatalog,
            tables: prevCatalog.tables.filter((value) => value.id != id),
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
      .put(`${BASE_URL}/api/catalogs/${catalogData.id}/tables/${id}`, payload)
      .then((response) => {
        toast.success(t("successfulUpdateToast"), { id: toastId });
        setCatalogData((prevCatalog) => {
          return {
            ...prevCatalog,
            tables: prevCatalog.tables.map((table) => {
              if (table.id == response.data.id) return response.data;
              return table;
            }),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureUpdateToast"), { id: toastId });
      });
  };

  const onSaveAll = () => {
    catalogData.tables.forEach((table) => {
      onSave(table.id, table);
    });
  };

  return (
    <div className="space-y-2">
      <Toaster />
      <Label className="text-3xl font-bold">
        {t("catalogAndName", { catalogName: catalogData.name })}
      </Label>
      {/* <TableBasicEditor tableData={tableData} setTableData={setTableData} /> */}
      <CatalogBasicEditor
        catalogData={catalogData}
        setCatalogData={setCatalogData}
      />
      <TableEditorCard
        catalogData={catalogData}
        setCatalogData={setCatalogData}
        onActionDeleteClick={onActionDeleteClick}
        onSave={onSave}
        onSaveAll={onSaveAll}
      />
    </div>
  );
};

export default CatalogDetail;
