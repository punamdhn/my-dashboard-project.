import XLSX from "xlsx";
import { saveAs } from "file-saver";
import { mockTransactions } from "./data/mockData";
import { Select } from "@mui/material";

// const worksheet1 = XLSX.utils.json_to_sheet(data1);
// const worksheet2 = XLSX.utils.json_to_sheet(data2);
// const workbook = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(workbook, worksheet1, "Sheet1");
// XLSX.utils.book_append_sheet(workbook, worksheet2, "Sheet2");

const selectedComponents = () => {
  return (
    <Select>
      <div>
        <ul>
          <li>Header</li>
          <li>StatBox</li>
          <li>LineChart</li>
          <li>GeographyChart</li>
          <li>BarChart</li>
          <li>ProgressCircle</li>
        </ul>
      </div>
    </Select>
  );
};

export default selectedComponents;
