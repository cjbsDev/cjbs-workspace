import axios from "axios";
import FileSaver from "file-saver";
import { useState } from "react";

export const useFileDownload = (exportUrl: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const saverFile = () => {
    setIsLoading(true);
    axios
      .get(exportUrl)
      .then((res) => {
        if (res.status === 200) {
          const disposition = res.headers["content-disposition"];

          const resFileName = decodeURI(
            disposition
              .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
              .replace(/['"]/g, "")
          );

          setFileName(resFileName);
          setIsLoading(false);
          FileSaver.saveAs(exportUrl, resFileName);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  return { isLoading, fileName, saverFile };
};
