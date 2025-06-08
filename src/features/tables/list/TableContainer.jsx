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
          <CardContent>
            {table.columns.map((column) => (
              <div className="flex">
                <div>{column.fieldName}: &nbsp;</div>
                <div>{column.dataType}</div>
                <div>({column.dataLength})</div>
              </div>
            ))}
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default TableContainer;
