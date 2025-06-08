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
import UpdateTemplateDialog from "./UpdateTemplateDialog";

const BASE_URL = import.meta.env.VITE_API_URL;
const CARBONE_URL = import.meta.env.VITE_CARBONE_URL;

const TemplateContainer = ({ template, setTemplatePage }) => {
  const { t } = useTranslation();
  const onDeleteButtonClick = (e, id) => {
    const toastId = toast.loading(t("deletingToast"));
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/api/templates/${id}`)
      .then(() => {
        toast.success(t("successfulDeleteToast"), { id: toastId });
        setTemplatePage((prevReport) => {
          return {
            ...prevReport,
            content: prevReport.content.filter((template) => template.id != id),
          };
        });
      })
      .catch(() => {
        toast.error(t("failureDeleteToast"), { id: toastId });
      });
  };
  const onUpdateSuccess = (newTemplate) => {
    setTemplatePage((prevPage) => {
      console.log(prevPage);
      return {
        ...prevPage,
        content: prevPage.content.map((currentTemplate) => {
          if (template.id == currentTemplate.id) return newTemplate;
          return currentTemplate;
        }),
      };
    });
  };
  const onDownloadClick = () => {
    window.open(`${CARBONE_URL}/template/${template.id}`, "_blank");
    // axios.get(`${CARBONE_URL}/template/${template.id}`);
  };
  return (
    <div>
      <Toaster />
      {/* <Link to={`${template.id}`}> */}
      <Card>
        <CardHeader>
          <CardTitle>
            {template.name != null ? (
              <>
                <div className="text-2xl">{template.name}</div>
                <br></br>
                {`${template.id}`}
              </>
            ) : (
              template.id
            )}
            {/* {template.id}. {template.name} */}
          </CardTitle>
          <CardAction className="flex space-x-2">
            <Button variant={""} onClick={onDownloadClick}>
              {t("downloadButtonText")}
            </Button>
            <UpdateTemplateDialog
              template={template}
              onUpdateSuccess={onUpdateSuccess}
            />
            <Button
              variant={"destructive"}
              onClick={(e) => onDeleteButtonClick(e, template.id)}
            >
              {t("deleteButtonText")}
            </Button>
          </CardAction>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
};

export default TemplateContainer;
