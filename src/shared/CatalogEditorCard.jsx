import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router";
import AddTableDialog from "./AddTableDialog";
import AddCatalogDialog from "./AddCatalogDialog";

const CatalogEditorCard = ({
  reportData,
  setReportData,
  onActionDeleteClick,
  onSave,
  onSaveAll,
}) => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const catalogColumns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "name",
      headerName: t("catalogNameText"),
      editable: true,
      width: 800,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FaArrowUpRightFromSquare />}
          onClick={() => navigate(`/catalogs/${params.id}`)}
          label="Navigate to chlid entityj"
        />,
        <GridActionsCellItem
          icon={<FaSave />}
          onClick={() =>
            onSave(
              params.id,
              reportData.catalogs.find((catalog) => catalog.id === params.id)
            )
          }
          label="Save"
        />,
        <GridActionsCellItem
          icon={<FaRegTrashAlt />}
          onClick={() => onActionDeleteClick(params.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const onAddCatalogSuccess = (newCol) => {
    setReportData((prevReport) => {
      return { ...prevReport, catalogs: [...prevReport.catalogs, newCol] };
    });
  };

  const processCatalogRowUpdate = async (newRow, oldRow) => {
    setReportData((prevCatalog) => {
      return {
        ...prevCatalog,
        catalogs: prevCatalog.catalogs.map((catalog) => {
          if (catalog.id == newRow.id) return newRow;
          return catalog;
        }),
      };
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("catalogs")}</CardTitle>
          <CardDescription>{t("catalogDescription")}</CardDescription>
          <CardAction className="flex flex-row space-x-2">
            <Button onClick={onSaveAll}>{t("saveChangesButtonText")}</Button>
            <AddCatalogDialog
              reportData={reportData}
              onAddCatalogSuccess={onAddCatalogSuccess}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataGrid
            rows={reportData.catalogs}
            columns={catalogColumns}
            processRowUpdate={processCatalogRowUpdate}
            onProcessRowUpdateError={(error) => {
              console.log(error);
            }}
            showToolbar
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CatalogEditorCard;
