import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import TableBasicEditor from "./TableBasicEditor";
import ColumnEditorCard from "@/shared/ColumnEditorCard";
import ConstraintEditorCard from "@/shared/ConstraintEditorCard";
import IndexEditorCard from "@/shared/IndexEditorCard";

const BASE_URL = import.meta.env.VITE_API_URL;

const TableDetail = () => {
  const { t } = useTranslation();
  const { tableData: loaderTable } = useLoaderData();
  const [tableData, setTableData] = useState(loaderTable);

  const onActionDeleteClick = (e, deleteType, id) => {
    const toastId = toast.loading(t("pleaseWait"));
    axios
      .delete(`${BASE_URL}/api/${deleteType}/${id}`)
      .then(() => {
        toast.success(t("successfulDeleteToast"), { id: toastId });
        setTableData((prevTable) => {
          return {
            ...prevTable,
            [deleteType]: prevTable[deleteType].filter(
              (value) => value.id != id
            ),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureDeleteToast"), { id: toastId });
      });
  };

  const onSave = (e, saveType, id, payload) => {
    // axios.put(`${BASE_URL}/tables/${tableData.id}/columns/${}`);
    const toastId = toast.loading(t("savingString"));
    // console.log(params);
    axios
      .put(`${BASE_URL}/api/tables/${tableData.id}/${saveType}/${id}`, payload)
      .then((response) => {
        toast.success(t("successfulUpdateToast"), { id: toastId });
        setTableData((prevTable) => {
          return {
            ...prevTable,
            [saveType]: prevTable[saveType].map((value) => {
              if (value.id == response.data.id) return response.data;
              return value;
            }),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureUpdateToast"), { id: toastId });
      });
  };

  const onSaveAll = (e, saveType) => {
    tableData[saveType].forEach((value) => {
      onSave(e, saveType, value.id, value);
    });
  };

  return (
    <div className="space-y-2">
      <Toaster />
      <Label className="text-3xl font-bold">
        {t("tableAndName", { tableName: tableData.name })}
      </Label>
      <TableBasicEditor tableData={tableData} setTableData={setTableData} />
      <ColumnEditorCard
        tableData={tableData}
        setTableData={setTableData}
        onActionDeleteClick={onActionDeleteClick}
        onSave={onSave}
        onSaveAll={onSaveAll}
      />
      <ConstraintEditorCard
        tableData={tableData}
        setTableData={setTableData}
        onActionDeleteClick={onActionDeleteClick}
        onSave={onSave}
        onSaveAll={onSaveAll}
      />
      <IndexEditorCard
        tableData={tableData}
        setTableData={setTableData}
        onActionDeleteClick={onActionDeleteClick}
        onSave={onSave}
        onSaveAll={onSaveAll}
      />
    </div>
  );
};

export default TableDetail;
