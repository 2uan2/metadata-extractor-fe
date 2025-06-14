import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router";

const BASE_URL = import.meta.env.VITE_API_URL;

const TableContainer = ({ table, setTablePage }) => {
  const { t } = useTranslation();
  const onDeleteButtonClick = (e, id) => {
    const toastId = toast.loading(t("deletingToast"));
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/api/tables/${id}`)
      .then(() => {
        toast.success(t("successfulDeleteToast"), { id: toastId });
        setTablePage((prevTablePage) => {
          return {
            ...prevTablePage,
            content: prevTablePage.content.filter((table) => table.id != id),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureDeleteToast"), { id: toastId });
      });
  };
  return (
    <>
      <Toaster />
      <Card>
        <Link className="" to={`/tables/${table.id}`}>
          <CardHeader>
            <CardTitle>
              {table.id}. {table.name}
            </CardTitle>
            <CardAction>
              <Button
                variant={"destructive"}
                onClick={(e) => onDeleteButtonClick(e, table.id)}
              >
                {t("deleteButtonText")}
              </Button>
            </CardAction>
            <CardDescription>{table.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {table.columns && table.columns.length > 0 && (
              <>
                <div>
                  {t("columnList", {
                    columns: table.columns
                      .map((column) => column.fieldName)
                      .join(", "),
                  })}
                </div>
                <div>
                  {t("constraintList", {
                    constraints: table.constraints
                      .map((constraint) => constraint.keyName)
                      .join(", "),
                  })}
                </div>
                <div>
                  {t("indexList", {
                    indexes: table.indexes
                      .map((index) => index.name)
                      .join(", "),
                  })}
                </div>
              </>
              // <table className="border-separate border-gray-400 border w-full">
              //   <thead>
              //     <tr>
              //       <th>Column Name</th>
              //       <th>Column Data Type and Length</th>
              //       <th>Column Description</th>
              //     </tr>
              //   </thead>
              //   <tbody>
              //     {table.columns.map((column) => (
              //       <tr key={column.id}>
              //         <td>{column.fieldName}</td>
              //         <td>
              //           {column.dataType}({column.dataType})
              //         </td>
              //         {/* <td>{column.nullable}</td> */}
              //         <td>{column.description}</td>
              //       </tr>
              //     ))}
              //   </tbody>
              // </table>
            )}
            {/* {table.columns.map((column) => (
              <div className="flex">
                <div>{column.fieldName}: &nbsp;</div>
                <div>{column.dataType}</div>
                <div>({column.dataLength})</div>
              </div>
            ))} */}
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default TableContainer;
