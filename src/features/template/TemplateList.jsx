import SearchAndPagination from "@/shared/SearchAndPagination";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import TemplateContainer from "./TemplateContainer";
import TemplateUploadDialog from "./TemplateUploadDialog";

const BASE_URL = import.meta.env.VITE_API_URL;

const TemplateList = () => {
  const { t } = useTranslation();
  const [templatePage, setTemplatePage] = useState({ content: [] });
  const [searchParams, setSearchParams] = useSearchParams({
    page: 0,
    size: 5,
  });
  const pageNumber = useMemo(() => {
    return parseInt(searchParams.get("page"));
  }, [searchParams]);
  const pageSize = useMemo(() => {
    return parseInt(searchParams.get("size"));
  }, [searchParams]);
  const templates = useMemo(() => {
    return templatePage.content;
  }, [templatePage.content]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/templates?page=${pageNumber}&size=${pageSize}`)
      .then((response) => setTemplatePage(response.data))
      .catch((error) => console.log(error.message));
  }, [pageNumber, pageSize]);

  const search = (query) => {
    if (query != "") {
      setSearchParams(
        () => {
          return { page: pageNumber, size: pageSize, query: query };
        },
        { replace: true }
      );
    } else {
      setSearchParams(
        () => {
          return { page: pageNumber, size: pageSize };
        },
        { replace: true }
      );
    }
    axios
      .get(
        `${BASE_URL}/api/templates?page=${pageNumber}&size=${pageSize}${
          searchQuery != "" ? `&query=${searchQuery}` : ""
        }`
      )
      .then((response) => setTemplatePage(response.data))
      .catch((error) => console.log(error));
  };

  const onUploadSuccess = () => {
    axios
      .get(`${BASE_URL}/api/templates?page=${pageNumber}&size=${pageSize}`)
      .then((response) => setTemplatePage(response.data))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="p-8 px-24 min-w-150 space-y-2">
      <Toaster />
      <SearchAndPagination
        children={<TemplateUploadDialog onUploadSuccess={onUploadSuccess} />}
        label={t("templatePerPageLabel")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        search={search}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pageNumber={pageNumber}
        page={templatePage}
      />
      {templates.length == 0 ? (
        <div className="flex justify-center">
          {t("noTemplateYetHint")}
          {/* &nbsp;
          <Link to={"/reports/create"}> /create</Link> */}
        </div>
      ) : (
        templates.map((template) => (
          <TemplateContainer
            template={template}
            setTemplatePage={setTemplatePage}
          />
        ))
      )}
    </div>
  );
};

export default TemplateList;
