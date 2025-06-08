import { Separator } from "@/components/ui/separator";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useMemo } from "react";
import AddColumnDialog from "./AddColumnDialog";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import AddConstraintDialog from "./AddConstraintDialog";
import AddIndexDialog from "./AddIndexDialog";
import { formatDataTypeAndLength } from "@/shared/utils";

const BASE_URL = import.meta.env.VITE_API_URL;

const ReportEditorDetail = ({ table, setReportData }) => {
  const indexColumns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "name",
      headerName: "Tên Index",
      editable: true,
    },
    {
      field: "referencedColumnName",
      headerName: "Cột tham chiếu",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FaRegTrashAlt />}
          onClick={(e) => onActionDeleteClick(e, "indexes", params.id)}
          label="Delete"
        />,
      ],
    },
  ];
  const constraintColumns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "keyName",
      headerName: "Tên khóa",
      editable: true,
    },
    {
      field: "columnName",
      headerName: "Tên trường",
      editable: true,
    },
    {
      field: "keyType",
      headerName: "Kiểu",
      editable: true,
    },
    {
      field: "referencedTableName",
      headerName: "Bảng tham chiếu",
      editable: true,
    },
    {
      field: "referencedColumnName",
      headerName: "Cột tham chiếu",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FaRegTrashAlt />}
          onClick={(e) => onActionDeleteClick(e, "constraints", params.id)}
          label="Delete"
        />,
      ],
    },
  ];
  const columnColumns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "fieldName",
      headerName: "Tên trường",
      editable: true,
    },
    {
      field: "dataTypeAndLength",
      headerName: "Kiểu dữ liệu và độ dài",
      editable: true,
      width: 200,
    },
    {
      field: "nullable",
      headerName: "Nullable",
      editable: true,
    },
    {
      field: "autoIncrement",
      headerName: "Auto Increment",
      editable: true,
    },
    {
      field: "keyType",
      headerName: "P/K Key",
      editable: true,
    },
    {
      field: "defaultValue",
      headerName: "Mặc định",
      editable: true,
    },
    {
      field: "description",
      headerName: "Mô tả",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FaRegTrashAlt />}
          onClick={(e) => onActionDeleteClick(e, "columns", params.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const columnRows = useMemo(() => {
    // console.log("-------------------------------------------");
    // console.log(table.columns);
    // console.log("new dataTypeAndLength is " + dataTypeAndLength);
    return table.columns.map((column) => ({
      ...column,
      dataTypeAndLength: formatDataTypeAndLength(
        column.dataType,
        column.dataLength
      ),
    }));
  }, [table.columns]);

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
    setReportData((prevReport) => {
      return prevReport.map((currentTable) => {
        if (currentTable.id == table.id) {
          return {
            ...currentTable,
            columns: currentTable.columns.map((column) => {
              if (column.id == newRow.id) {
                // if (dataType != newRow.dataType)
                return {
                  ...newRow,
                  dataType: dataType,
                  dataLength: dataLength,
                };
                // return newRow;
              }
              return column;
            }),
          };
        }
        return currentTable;
      });
    });
    return {
      ...newRow,
      dataType: dataType,
      dataLength: dataLength,
      dataTypeAndLength: formatDataTypeAndLength(dataType, dataLength),
    };
  };

  const processConstraintRowUpdate = async (newRow, oldRow) => {
    setReportData((prevReport) => {
      return prevReport.map((currentTable) => {
        if (currentTable.id == table.id) {
          return {
            ...currentTable,
            constraints: currentTable.constraints.map((constraint) => {
              if (constraint.id == newRow.id) return newRow;
              return constraint;
            }),
          };
        }
        return currentTable;
      });
    });
  };

  const processIndexRowUpdate = async (newRow, oldRow) => {
    setReportData((prevReport) => {
      return prevReport.map((currentTable) => {
        return {
          ...currentTable,
          indexes: currentTable.indexes.map((index) => {
            if (index.id == newRow.id) return newRow;
            return index;
          }),
        };
      });
    });
  };

  const onActionDeleteClick = (e, deleteType, id) => {
    const toastId = toast.loading("Deleting ...");
    axios
      .delete(`${BASE_URL}/api/tables/${table.id}/${deleteType}/${id}`)
      .then((response) => {
        toast.success("Deleted succesfully!", { id: toastId });
        setReportData((prevReport) => {
          return prevReport.map((report) => {
            if (report.id == table.id) {
              return {
                ...report,
                [deleteType]: report[deleteType].filter(
                  (value) => value.id != id
                ),
              };
            }
            return report;
          });
        });
        console.log(response);
      })
      .catch((error) => {
        toast.error("Uh oh, something went wrong!", { id: toastId });
        console.log(error);
      });
  };

  const onAddColumnSuccess = (newCol) => {
    console.log("new col is");
    console.log(newCol);
    console.log("current columns are");
    console.log(table.columns);
    setReportData((prevReport) => {
      return prevReport.map((currentTable) => {
        if (currentTable.id == table.id) {
          return { ...currentTable, columns: [...table.columns, newCol] };
        }
        return currentTable;
      });
    });
  };

  const onAddConstraintSuccess = (newCol) => {
    setReportData((prevReport) => {
      return prevReport.map((currentTable) => {
        if (currentTable.id == table.id) {
          return {
            ...currentTable,
            constraints: [...table.constraints, newCol],
          };
        }
        return currentTable;
      });
    });
  };

  const onAddIndexSuccess = (newCol) => {
    setReportData((prevReport) => {
      return prevReport.map((currentTable) => {
        if (currentTable.id == table.id) {
          return {
            ...currentTable,
            indexes: [...table.indexes, newCol],
          };
        }
        return currentTable;
      });
    });
  };
  return (
    <div>
      <Toaster />
      <div className="mt-8 mb-2 flex justify-between">
        <h1 className="font-bold text-3xl">{table.name}</h1>
        <AddColumnDialog
          table={table}
          onAddColumnSuccess={onAddColumnSuccess}
        />
      </div>
      <DataGrid
        rows={columnRows}
        columns={columnColumns}
        processRowUpdate={processColumnRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.log(error);
        }}
      />
      <div className="mt-6 mb-2 flex justify-between">
        <h1 className="text-2xl font-bold">Constraints</h1>
        <AddConstraintDialog
          table={table}
          onAddConstraintSuccess={onAddConstraintSuccess}
        />
      </div>

      <DataGrid
        rows={table.constraints}
        columns={constraintColumns}
        processRowUpdate={processConstraintRowUpdate}
      />
      <div className="mt-6 mb-2 flex justify-between">
        <h1 className="text-2xl font-bold">Indexes</h1>
        <AddIndexDialog table={table} onAddIndexSuccess={onAddIndexSuccess} />
      </div>
      <DataGrid
        rows={table.indexes}
        columns={indexColumns}
        processRowUpdate={processIndexRowUpdate}
      />
      <Separator className="my-8" />
    </div>
  );
};

export default ReportEditorDetail;
