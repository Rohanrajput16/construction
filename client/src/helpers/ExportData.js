import React from "react";
import { Button } from "react-bootstrap";
import { downloadExcel } from "react-export-table-to-excel";

const ExportData = (props) => {
  const { title, header, body, tableName } = props;
  function handleDownloadExcel() {
    downloadExcel({
      fileName: tableName ? tableName : "Shyamg Data Record",
      sheet: tableName ? tableName : "Shree Shyam Snacks Food Pvt. Ltd.",
      tablePayload: {
        header: header,
        body: body,
      },
    });
  }

  return (
    <div>
      <Button onClick={handleDownloadExcel} className="f-right btn btn-success">
        {title}
      </Button>
    </div>
  );
};

export default ExportData;
