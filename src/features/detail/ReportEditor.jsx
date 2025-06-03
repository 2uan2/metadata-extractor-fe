import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReportEditorDetail from "./ReportEditorDetail";
import { Button } from "@/components/ui/button";

const BASE_URL = import.meta.env.VITE_API_URL;

const ReportEditor = () => {
  let params = useParams();
  const { report: loaderReport } = useLoaderData();
  const [reportData, setReportData] = useState(loaderReport);

  useEffect(() => {
    // console.log("report data has been changed:");
    // console.log(reportData);
    // setReportData(report);
  }, [reportData]);

  const rows = useMemo(() => {
    return reportData.map((report) => ({
      id: report.id,
      name: report.name,
      description: report.description,
    }));
  }, [reportData]);

  const updateTable = () => {
    const toastId = toast.loading("Updating report ...");
    axios
      .patch(`${BASE_URL}/api/reports/${params.id}`, reportData)
      .then((response) => {
        setReportData(response.data);
        toast.success("table updated succesfully!!", { id: toastId });
      })
      .catch((error) => toast.error(error.message, { id: toastId }));
  };

  const downloadDocxReport = () => {
    window.open(`${BASE_URL}/api/reports/${params.id}/download/docx`, "_blank");
    // axios
    //   .get(`${BASE_URL}/report/${params.id}/download`)
    //   .then((response) => toast.success("downloaded"))
    //   .catch((error) => toast.error(error.message));
  };

  const downloadPdfReport = () => {
    window.open(`${BASE_URL}/api/reports/${params.id}/download/pdf`, "_blank");
  };

  const processRowUpdate = useCallback(
    async (newRow, oldRow) => {
      setReportData((prevReport) => {
        return prevReport.map((report) => {
          if (report.id == newRow.id) {
            return {
              ...report,
              name: newRow.name,
              description: newRow.description,
            };
          }
          return report;
        });
      });
    },
    [setReportData]
  );

  return (
    <>
      <div>
        <Toaster postition="top-center" />
      </div>
      <div className="p-2 space-x-2">
        <Button>Test</Button>
        <Button
          onClick={() => {
            toast("hello world");
            setReportData((prevReport) => {
              return prevReport.map((report) => {
                if (report.id == 1) {
                  return { ...report, name: "tetetet" };
                }
                return report;
              });
            });
          }}
        >
          tetet
        </Button>
        <Button onClick={updateTable}>Save changes</Button>
        <Button onClick={downloadDocxReport}>Download Word File</Button>
        <Button onClick={downloadPdfReport}>Download Pdf File</Button>
      </div>
      <DataGrid
        rows={rows}
        columns={[
          {
            field: "name",
            headerName: "Table Name",
            editable: true,
            width: 200,
          },
          {
            field: "description",
            headerName: "Description",
            editable: true,
            width: 300,
          },
        ]}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.log(error);
        }}
      />
      {reportData.map((table) => (
        <ReportEditorDetail table={table} setReportData={setReportData} />
      ))}
      {/* {reportData.map((table) => {
        return <TableDetail table={table} editSubTable={editSubTable} />;
      })} */}
    </>
  );
};

export default ReportEditor;
