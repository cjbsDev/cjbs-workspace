import axios from "axios";
import FileSaver from "file-saver";
import { useState } from "react";
import {GET_FILE, POST_BLOB} from "api";

export const useFileDownload = (exportUrl: string, keyword:string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const saverFile = () => {
    const bodyData = {
      keyword: keyword
    };
    setIsLoading(true);
      POST_BLOB(exportUrl, bodyData)
      .then((res) => {

        if(res.status == 200) {
          const disposition = res.headers["content-disposition"];
          const resFileName = decodeURI(
              disposition
                  .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
                  .replace(/['"]/g, "")
          );
          setFileName(resFileName);
          setIsLoading(false);
          FileSaver.saveAs(res.data, resFileName);
        }

      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  return { isLoading, fileName, saverFile };
};
