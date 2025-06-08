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

const TableEditorCard = ({
  catalogData,
  setCatalogData,
  onActionDeleteClick,
  onSave,
  onSaveAll,
}) => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const tableColumns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "name",
      headerName: t("tableNameLabel"),
      editable: true,
      width: 400,
    },
    {
      field: "description",
      headerName: t("descriptionLabel"),
      editable: true,
      width: 500,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FaArrowUpRightFromSquare />}
          onClick={() => navigate(`/tables/${params.id}`)}
          label="Save"
        />,
        <GridActionsCellItem
          icon={<FaSave />}
          onClick={() =>
            onSave(
              params.id,
              catalogData.tables.find((table) => table.id === params.id)
            )
          }
          label="Save"
        />,
        <GridActionsCellItem
          icon={<FaRegTrashAlt />}
          onClick={(e) => onActionDeleteClick(e, "indexes", params.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const onAddTableSuccess = (newCol) => {
    setCatalogData((prevTable) => {
      return { ...prevTable, tables: [...prevTable.tables, newCol] };
    });
  };

  const processTableRowUpdate = async (newRow, oldRow) => {
    setCatalogData((prevCatalog) => {
      return {
        ...prevCatalog,
        tables: prevCatalog.tables.map((table) => {
          if (table.id == newRow.id) return newRow;
          return table;
        }),
      };
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("tablesHeading")}</CardTitle>
          <CardDescription>
            {t("tablesDescription", { catalogName: catalogData.name })}
          </CardDescription>
          <CardAction className="flex flex-row space-x-2">
            <Button onClick={onSaveAll}>{t("saveChangesButtonText")}</Button>
            <AddTableDialog
              catalogData={catalogData}
              onAddTableSuccess={onAddTableSuccess}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataGrid
            rows={catalogData.tables}
            columns={tableColumns}
            processRowUpdate={processTableRowUpdate}
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

export default TableEditorCard;
