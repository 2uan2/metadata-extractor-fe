import SearchAndPagination from "@/shared/SearchAndPagination";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useSearchParams } from "react-router";
import CatalogContainer from "./CatalogContainer";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;

const CatalogList = () => {
  const { t } = useTranslation();
  const [catalogPage, setCatalogPage] = useState({ content: [] });
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
  const catalogs = useMemo(() => {
    console.log(catalogPage.content);
    return catalogPage.content;
  }, [catalogPage.content]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/catalogs?page=${pageNumber}&size=${pageSize}`)
      .then((response) => setCatalogPage(response.data))
      .catch((error) => console.log(error.message));
  }, [pageNumber, pageSize]);

  const search = (query) => {
    if (query != "") {
      setSearchParams(
        () => {
          return { page: pageNumber, size: pageSize, name: query };
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
        `${BASE_URL}/api/catalogs?page=${pageNumber}&size=${pageSize}${
          searchQuery != "" ? `&name=${searchQuery}` : ""
        }`
      )
      .then((response) => setCatalogPage(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-8 px-24 min-w-150 space-y-2">
      <Toaster />
      <SearchAndPagination
        label={t("catalogPerPageLabel")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        search={search}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pageNumber={pageNumber}
        page={catalogPage}
      />
      {catalogs.length == 0 ? (
        <div className="flex justify-center">
          {t("noCatalogsYetHint")}
          &nbsp;
          <Link to={"/reports/create"}> /create</Link>
        </div>
      ) : (
        catalogs.map((catalog) => (
          <CatalogContainer catalog={catalog} setCatalogPage={setCatalogPage} />
        ))
      )}
    </div>
  );
};

export default CatalogList;
