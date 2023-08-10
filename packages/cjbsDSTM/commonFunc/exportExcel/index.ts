import FileSaver from "file-saver";
import axios from "axios";

interface ExportExcelProps {
  exportUrl: string;
}
export const exportCSVData = async (props: ExportExcelProps) => {
  const { exportUrl } = props;

  await axios.post(exportUrl, "").then((res) => {
    const resData = res.data;
    console.log("Excel Data ==>>", resData);
    const resultData = `data:text/csv,${encodeURIComponent(resData)}`;
    FileSaver.saveAs(resultData, res.headers.filename);
  });
};
