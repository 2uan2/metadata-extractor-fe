import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import AddConstraintDialog from "@/features/detail/AddConstraintDialog";
import AddIndexDialog from "@/features/detail/AddIndexDialog";
import { Button } from "@/components/ui/button";

const IndexEditorCard = ({
  tableData,
  setTableData,
  onActionDeleteClick,
  onSave,
  onSaveAll,
}) => {
  const { t } = useTranslation();

  const indexColumns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
    },
    {
      field: "name",
      headerName: t("indexNameLabel"),
      editable: true,
      width: 400,
    },
    {
      field: "referencedColumnName",
      headerName: t("indexReferencedColumnNameLabel"),
      editable: true,
      width: 400,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FaSave />}
          onClick={(e) =>
            onSave(
              e,
              "indexes",
              params.id,
              tableData.indexes.find((index) => index.id === params.id)
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

  const onAddIndexSuccess = (newCol) => {
    setTableData((prevTable) => {
      return { ...prevTable, indexes: [...prevTable.indexes, newCol] };
    });
  };

  const processIndexRowUpdate = async (newRow, oldRow) => {
    setTableData((prevTable) => {
      return {
        ...prevTable,
        indexes: prevTable.indexes.map((index) => {
          if (index.id == newRow.id) return newRow;
          return index;
        }),
      };
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("indexes")}</CardTitle>
          <CardDescription>
            {t("editIndexDescription", { tableName: tableData.name })}
          </CardDescription>
          <CardAction className="flex flex-row space-x-2">
            <Button onClick={(e) => onSaveAll(e, "indexes")}>
              {t("saveChangesButtonText")}
            </Button>
            <AddIndexDialog
              table={tableData}
              onAddIndexSuccess={onAddIndexSuccess}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataGrid
            rows={tableData.indexes}
            columns={indexColumns}
            processRowUpdate={processIndexRowUpdate}
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

export default IndexEditorCard;
