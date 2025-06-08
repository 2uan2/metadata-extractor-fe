import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ReportContainer from "./ReportContainer";
import { Link, useSearchParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchAndPagination from "@/shared/SearchAndPagination";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_API_URL;

const ReportList = () => {
  const { t, i18n } = useTranslation();
  const [reportPage, setReportPage] = useState({ content: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    size: 5,
    // url: "",
  });
  const pageNumber = useMemo(() => {
    return parseInt(searchParams.get("page"));
  }, [searchParams]);
  const pageSize = useMemo(() => {
    return parseInt(searchParams.get("size"));
  }, [searchParams]);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/api/reports?page=${pageNumber}&size=${pageSize}${
          searchParams.get("url") != null ? `&url=${searchQuery}` : ""
        }`
      )
      .then((response) => {
        setReportPage(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [pageNumber, pageSize]);

  const reports = useMemo(() => {
    return reportPage.content;
  }, [reportPage.content]);

  const onDeleteButtonClick = (e, id) => {
    const toastId = toast.loading(t("deletingToast"));
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/api/reports/${id}`)
      .then(() => {
        toast.success(t("successfulDeleteToast"), { id: toastId });
        setReportPage((prevReport) => {
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

  const search = (query) => {
    if (query != "") {
      setSearchParams(
        () => {
          return { page: pageNumber, size: pageSize, url: query };
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
        `${BASE_URL}/api/reports?page=${pageNumber}&size=${pageSize}${
          searchQuery != "" ? `&url=${searchQuery}` : ""
        }`
      )
      .then((response) => setReportPage(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-8 px-24 min-w-150 space-y-2 ">
      <Toaster />
      <SearchAndPagination
        label={t("reportPerPageLabel")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        search={search}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pageNumber={pageNumber}
        page={reportPage}
      />
      {reports.length == 0 ? (
        <div className="flex justify-center">
          {t("noReportsYetHint")}
          &nbsp;
          <Link to={"/reports/create"}> /create</Link>
        </div>
      ) : (
        reports.map((report) => (
          <ReportContainer
            key={report.id}
            report={report}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        ))
      )}
    </div>
  );
};

export default ReportList;
