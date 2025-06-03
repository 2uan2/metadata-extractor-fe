import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ReportContainer from "./ReportContainer";
import { Link, useParams, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const BASE_URL = import.meta.env.VITE_API_URL;

const ReportList = () => {
  const [reportPage, setReportPage] = useState({ content: [] });
  // const [pageNumber, setPageNumber] = useState(0);
  // const [pageSize, setPageSize] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    size: 5,
  });
  const pageNumber = useMemo(() => {
    return parseInt(searchParams.get("page"));
  });
  const pageSize = useMemo(() => {
    return parseInt(searchParams.get("size"));
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/reports?page=${pageNumber}&size=${pageSize}`, {
        // headers: {
        //   "ngrok-skip-browser-warning": true,
        // },
      })
      .then((response) => {
        setReportPage(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [pageNumber]);

  const reports = useMemo(() => {
    return reportPage.content;
  }, [reportPage.content]);

  const onDeleteButtonClick = (e, id) => {
    // const toastId = toast.loading("Deleting report ...");
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/api/reports/${id}`)
      .then(() => {
        toast.success("deleted succesfully maybe"); //, { id: toastId });
        setReportPage((prevReport) => {
          return {
            ...prevReport,
            content: prevReport.content.filter((report) => report.id != id),
          };
        });
      })
      .catch((error) => {
        toast.error("Uh oh, something went wrong"); //, { id: toastId });
      });
  };

  const onPreviousPageClick = () => {
    if (pageNumber > 0)
      setSearchParams({
        page: parseInt(pageNumber) - 1,
        size: parseInt(pageSize),
      });
  };
  const onNextPageClick = () => {
    if (pageNumber < reportPage.totalPages)
      setSearchParams({
        page: parseInt(pageNumber) + 1,
        size: parseInt(pageSize),
      });
  };
  const onPageClick = (newPageNum) => {
    if (newPageNum < reportPage.totalPages && newPageNum > 0) {
      setSearchParams({
        page: newPageNum,
        size: parseInt(pageSize),
      });
    }
  };

  return (
    <div className="p-8 px-24 min-w-150 space-y-2 ">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={onPreviousPageClick}
              disabled={parseInt(pageNumber) == 0}
            />
          </PaginationItem>
          {pageNumber > 0 ? (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageClick(parseInt(pageNumber) - 1)}
              >
                {pageNumber - 1}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <div></div>
          )}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageClick(parseInt(pageNumber))}
              isActive
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
          {parseInt(pageNumber) < reportPage.totalPages - 1 ? (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageClick(parseInt(pageNumber) + 1)}
              >
                {pageNumber + 1}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <></>
          )}
          {parseInt(pageNumber) < reportPage.totalPages - 2 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <></>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={onNextPageClick}
              disabled={pageNumber == reportPage.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {reports.length == 0 ? (
        <div className="flex justify-center">
          No reports yep, you can scrape database to make report at&nbsp;
          <Link to={"/create"}> /create</Link>
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
