import { Button } from "@/components/ui/button";
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
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import { formatDataTypeAndLength } from "./utils";
import AddColumnDialog from "@/features/detail/AddColumnDialog";
import { DataGrid } from "@mui/x-data-grid";

const BASE_URL = import.meta.env.VITE_API_URL;

const ColumnEditorCard = ({
  tableData,
  setTableData,
  onActionDeleteClick,
  onSave,
  onSaveAll,
}) => {
  const { t, i18n } = useTranslation();

  const columnColumns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
    },
    {
      field: "fieldName",
      headerName: t("fieldNameLabel"),
      editable: true,
      width: 250,
    },
    {
      field: "dataTypeAndLength",
      headerName: t("dataTypeAndLengthLabel"),
      editable: true,
      width: 300,
    },
    {
      field: "nullable",
      headerName: t("nullableLabel"),
      editable: true,
      width: 150,
    },
    {
      field: "autoIncrement",
      headerName: t("autoIncrementLabel"),
      editable: true,
      width: 150,
    },
    {
      field: "keyType",
      headerName: t("keyTypeLabel"),
      editable: true,
      width: 100,
    },
    {
      field: "defaultValue",
      headerName: t("defaultValueLabel"),
      editable: true,
      width: 200,
    },
    {
      field: "description",
      headerName: t("descriptionLabel"),
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
              "columns",
              params.id,
              tableData.columns.find((column) => column.id === params.id)
            )
          }
          label="Save"
        />,
        <GridActionsCellItem
          icon={<FaRegTrashAlt />}
          onClick={(e) => onActionDeleteClick(e, "columns", params.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const columnRows = useMemo(() => {
    return tableData.columns.map((column) => ({
      ...column,
      dataTypeAndLength: formatDataTypeAndLength(
        column.dataType,
        column.dataLength
      ),
    }));
  }, [tableData.columns]);

  const onAddColumnSuccess = (newCol) => {
    setTableData((prevTable) => {
      return { ...prevTable, columns: [...prevTable.columns, newCol] };
    });
  };

  const processColumnRowUpdate = async (newRow, oldRow) => {
    let dataType = oldRow.dataType;
    let dataLength = oldRow.dataLength;
    if (newRow.dataTypeAndLength != oldRow.dataTypeAndLength) {
      const regex = /^([^(]*)\(?([^)]*)?\)?(.*$)/;
      const match = regex.exec(newRow.dataTypeAndLength);
      if (match != null) {
        dataType = match[1];
        dataLength = !isNaN(parseInt(match[2])) ? parseInt(match[2]) : null;
      }
    }
    setTableData((prevTable) => {
      return {
        ...prevTable,
        columns: prevTable.columns.map((column) => {
          if (column.id == newRow.id) {
            return {
              ...newRow,
              dataType: dataType,
              dataLength: dataLength,
            };
          }
          return column;
        }),
      };
    });
    return {
      ...newRow,
      dataType: dataType,
      dataLength: dataLength,
      dataTypeAndLength: formatDataTypeAndLength(dataType, dataLength),
    };
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("columns")}</CardTitle>
          <CardDescription>
            {t("editColumnDescription", { tableName: tableData.name })}
          </CardDescription>
          <CardAction className="flex flex-row space-x-2">
            <Button onClick={(e) => onSaveAll(e, "columns")}>
              {t("saveChangesButtonText")}
            </Button>
            <AddColumnDialog
              table={tableData}
              onAddColumnSuccess={onAddColumnSuccess}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataGrid
            rows={columnRows}
            columns={columnColumns}
            processRowUpdate={processColumnRowUpdate}
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

export default ColumnEditorCard;
