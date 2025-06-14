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
import { Link } from "react-router";

const BASE_URL = import.meta.env.VITE_API_URL;

const CatalogContainer = ({ catalog, setCatalogPage }) => {
  const { t } = useTranslation();
  const onDeleteButtonClick = (e, id) => {
    const toastId = toast.loading(t("deletingToast"));
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/api/reports/${id}`)
      .then(() => {
        toast.success(t("successfulDeleteToast"), { id: toastId });
        setCatalogPage((prevReport) => {
          return {
            ...prevReport,
            content: prevReport.content.filter((report) => report.id != id),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureDeleteToast"), { id: toastId });
      });
  };
  return (
    <div>
      <Toaster />
      <Link to={`${catalog.id}`}>
        <Card>
          <CardHeader>
            <CardTitle>{catalog.name}</CardTitle>
            <CardAction>
              <Button
                variant={"destructive"}
                onClick={(e) => onDeleteButtonClick(e, catalog.id)}
              >
                {t("deleteButtonText")}
              </Button>
            </CardAction>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {catalog.tables && catalog.tables.length > 0 && (
              <table className="border-separate border-gray-400 border w-full">
                <thead>
                  <tr>
                    <th>{t("tableNameLabel")}</th>
                    <th>{t("descriptionLabel")}</th>
                  </tr>
                </thead>
                <tbody>
                  {catalog.tables.map((table) => (
                    <tr key={table.id}>
                      <td>{table.name}</td>
                      <td>{table.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CatalogContainer;
