import SearchAndPagination from "@/shared/SearchAndPagination";
import axios from "axios";
import { useMemo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import TableContainer from "./TableContainer";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;

const TableList = () => {
  const { t, i18n } = useTranslation();
  const [tablePage, setTablePage] = useState({ content: [] });
  const [searchParams, setSearchParams] = useSearchParams({
    page: 0,
    size: 3,
  });
  const pageNumber = useMemo(() => {
    return parseInt(searchParams.get("page"));
  }, [searchParams]);
  const pageSize = useMemo(() => {
    return parseInt(searchParams.get("size"));
  }, [searchParams]);
  const tables = useMemo(() => {
    return tablePage.content;
  }, [tablePage.content]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/tables?page=${pageNumber}&size=${pageSize}`)
      .then((response) => setTablePage(response.data))
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
        `${BASE_URL}/api/tables?page=${pageNumber}&size=${pageSize}${
          searchQuery != "" ? `&query=${searchQuery}` : ""
        }`
      )
      .then((response) => setTablePage(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-8 px-24 min-w-150 space-y-2">
      <SearchAndPagination
        label={t("tablePerPageLabel")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        search={search}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pageNumber={pageNumber}
        page={tablePage}
      />
      {tables.length == 0 ? (
        <div className="flex justify-center">
          {t("noTablesYetHint")}
          &nbsp;
          <Link to={"/reports/create"}> /create</Link>
        </div>
      ) : (
        tables.map((table) => (
          <TableContainer
            key={table.id}
            table={table}
            setTablePage={setTablePage}
          />
        ))
      )}
    </div>
  );
};

export default TableList;
