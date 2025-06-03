import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router";

const ReportContainer = ({ report, onDeleteButtonClick }) => {
  return (
    <div>
      <Link to={`/${report.id}`}>
        <Card>
          <CardHeader className="">
            {report.url}
            <CardAction>
              <Button
                variant={"destructive"}
                onClick={(e) => onDeleteButtonClick(e, report.id)}
              >
                Delete
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/* <div>{report.url}</div> */}
            <div>Id: {report.id}</div>
            <div>Created on: {report.createdOn}</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ReportContainer;
