import { GridActionsCellItem } from "@mui/x-data-grid";
import { FaRegTrashAlt } from "react-icons/fa";
export function formatDataTypeAndLength(dataType, dataLength) {
  return `${dataType}${
    dataLength != null &&
    dataLength != undefined &&
    dataLength != "" &&
    !isNaN(dataLength)
      ? `(${dataLength})`
      : ""
  }`;
}

export const indexColumns = (onActionDeleteClick) => {
  return [
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
};
export const constraintColumns = (onActionDeleteClick) => [
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
export const columnColumns = (onActionDeleteClick) => [
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
