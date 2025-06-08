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
import { Button } from "@/components/ui/button";

const ConstraintEditorCard = ({
  tableData,
  setTableData,
  onActionDeleteClick,
  onSave,
  onSaveAll,
}) => {
  const { t } = useTranslation();

  const constraintColumns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
    },
    {
      field: "keyName",
      headerName: t("keyNameLabel"),
      editable: true,
      width: 200,
    },
    {
      field: "columnName",
      headerName: t("columnNameLabel"),
      editable: true,
      width: 200,
    },
    {
      field: "keyType",
      headerName: t("keyTypeLabelConstraint"),
      editable: true,
      width: 200,
    },
    {
      field: "referencedTableName",
      headerName: t("referencedTableNameLabel"),
      editable: true,
      width: 200,
    },
    {
      field: "referencedColumnName",
      headerName: t("referencedColumnNameLabel"),
      editable: true,
      width: 200,
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
              "constraints",
              params.id,
              tableData.constraints.find(
                (constraint) => constraint.id === params.id
              )
            )
          }
          label="Save"
        />,
        <GridActionsCellItem
          icon={<FaRegTrashAlt />}
          onClick={(e) => onActionDeleteClick(e, "constraints", params.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const onAddConstraintSuccess = (newCol) => {
    setTableData((prevTable) => {
      return { ...prevTable, constraints: [...prevTable.constraints, newCol] };
    });
  };

  const processConstraintRowUpdate = async (newRow, oldRow) => {
    setTableData((prevTable) => {
      return {
        ...prevTable,
        constraints: prevTable.constraints.map((constraint) => {
          if (constraint.id == newRow.id) return newRow;
          return constraint;
        }),
      };
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("constraints")}</CardTitle>
          <CardDescription>
            {t("editConstraintDescription", { tableName: tableData.name })}
          </CardDescription>
          <CardAction className="flex flex-row space-x-2">
            <Button onClick={(e) => onSaveAll(e, "constraints")}>
              {t("saveChangesButtonText")}
            </Button>
            <AddConstraintDialog
              table={tableData}
              onAddConstraintSuccess={onAddConstraintSuccess}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataGrid
            rows={tableData.constraints}
            columns={constraintColumns}
            processRowUpdate={processConstraintRowUpdate}
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

export default ConstraintEditorCard;
