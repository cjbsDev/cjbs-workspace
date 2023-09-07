import axios from "axios";
import FileSaver from "file-saver";
import { useEffect, useState } from "react";
import { GET_FILE, POST_BLOB } from "api";
import { toast } from "react-toastify";

export const useFileDownload = (exportUrl: string, keyword:string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  // const saverFile = () => {
  //   setIsLoading(true);
  //     POST_BLOB(exportUrl)
  //     .then((res) => {
  //
  //       if(res.status == 200) {
  //         const disposition = res.headers["content-disposition"];
  //         const resFileName = decodeURI(
  //             disposition
  //                 .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
  //                 .replace(/['"]/g, "")
  //         );
  //         setFileName(resFileName);
  //         setIsLoading(false);
  //         FileSaver.saveAs(res.data, resFileName);
  //       }
  //
  //     })
  //     .catch((err) => {
  //       console.log("Error", err.message);
  //     });
  // };

  const saverFile = async () => {
    try {
      setIsLoading(true);
      const response = await POST_BLOB(exportUrl, bodyData);

      if (response.status === 200) {
        const disposition = response.headers["content-disposition"];
        const resFileName = decodeURI(
          disposition
            .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
            .replace(/['"]/g, "")
        );

        setFileName(resFileName);
        FileSaver.saveAs(response.data, resFileName);
      } else {
        throw new Error("File download failed");
        // toast();
      }
    } catch (error) {
      console.error("Error", error.message);
      // 오류 메시지를 여기에서 처리하거나 반환
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fileName, saverFile };
};
