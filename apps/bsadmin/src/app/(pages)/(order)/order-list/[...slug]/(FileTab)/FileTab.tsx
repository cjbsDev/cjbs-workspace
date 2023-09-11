import React, { useMemo, useRef, useState } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { cjbsTheme, DataTableBase, OutlinedButton } from "cjbsDSTM";
import { useParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
// import fetcher from "../../../../../func/fetcher";
import { fetcher, DELETE, GET, POST_BLOB, PUT } from "api";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import SubHeader from "./SubHeader";
import FileUploadModal from "./FileUploadModal";
import MyIcon from "icon/MyIcon";
import FileSaver from "file-saver";

const FileTab = () => {
  const [isFileUploadModal, setIsFileUploadModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { mutate } = useSWRConfig();
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/${orderUkey}/file/list`, fetcher, {
    suspense: true,
  });
  const fileList = Array.from(data);

  console.log("FILELIST", fileList);
  const rowDelete = async (orderFileUkey: string) => {
    console.log("orderFileUkey ==>>", orderFileUkey);
    try {
      const res = await DELETE(`/order/${orderUkey}/file/${orderFileUkey}`);
      if (res.success) {
        toast("삭제되었습니다.");
        mutate(`/order/${orderUkey}/file/list`);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
    }
  };

  const handleDownload = async (
    orderFileUkey: string,
    fileOriginNm: string
  ) => {
    try {
      const res = await GET(`/order/${orderUkey}/file/${orderFileUkey}`);
      if (res.success) {
        // toast("다운로드 되었습니다.");
        // console.log(res);

        console.log(res);
        // if (response.status === 200) {
        //   // const disposition = response.headers["content-disposition"];
        //   // const resFileName = decodeURI(
        //   //   disposition
        //   //     .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        //   //     .replace(/['"]/g, "")
        //   // );
        //   FileSaver.saveAs(response.data, fileOriginNm);
        // }

        // FileSaver.saveAs(new Blob([res.data]), fileOriginNm);
        // mutate(`/order/${orderUkey}/file/list`);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
    }
  };

  const filteredItems = fileList.filter((item) => {
    const filterPattern = new RegExp(
      filterText.toLowerCase().normalize("NFC"),
      "i"
    );

    return (
      (item.orderFileMemo &&
        filterPattern.test(
          item.orderFileMemo.toLowerCase().normalize("NFC")
        )) ||
      (item.fileOriginNm &&
        filterPattern.test(item.fileOriginNm.toLowerCase().normalize("NFC")))
    );
  });

  const columns = useMemo(
    () => [
      {
        name: "",
        width: "3%",
        selector: (row, index) => index + 1,
      },
      {
        name: "파일명",
        sortable: true,
        selector: (row) => row.fileOriginNm,
      },
      {
        name: "설명",
        sortable: true,
        cell: (row) => {
          return row.orderFileMemo;
        },
      },
      {
        name: "QC메일",
        width: "100px",
        sortable: true,
        selector: (row) => row.isSendQCEmail,
      },
      {
        name: "부서",
        width: "120px",
        sortable: true,
        selector: (row) => row.departVal,
      },
      {
        name: "등록자",
        width: "90px",
        sortable: true,
        selector: (row) => row.userNm,
      },
      {
        name: "등록일",
        width: "120px",
        sortable: true,
        selector: (row) => row.createdDttm,
      },
      {
        name: "다운",
        width: "100px",
        button: true,
        selector: (row) => row.createdDttm,
        cell: (row) => {
          const { orderFileUkey, fileOriginNm } = row;
          return (
            <OutlinedButton
              // disabled={true}
              sx={{ my: 1 }}
              buttonName="다운"
              size="small"
              startIcon={<MyIcon icon="download" size={14} />}
              onClick={() => handleDownload(orderFileUkey, fileOriginNm)}
            />
          );
        },
      },
      {
        name: "삭제",
        width: "80px",
        button: true,
        selector: (row) => row.createdDttm,
        cell: (row) => {
          const { orderFileUkey } = row;
          return (
            <IconButton onClick={() => rowDelete(orderFileUkey)}>
              <MyIcon icon="trash" size={20} />
            </IconButton>
          );
        },
      },
    ],
    []
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const onFilter = (e: { target: { value: React.SetStateAction<string> } }) =>
      setFilterText(e.target.value);

    const handleFileUploadModalOpen = () => {
      setIsFileUploadModal(true);
    };

    return (
      <>
        <SubHeader
          // exportUrl={`${process.env.NEXT_PUBLIC_API_URL}/order/list/download`}
          filterText={filterText}
          onFilter={onFilter}
          totalCount={filteredItems.length}
          handleClear={handleClear}
          handleFileUploadModalOpen={handleFileUploadModalOpen}
          // handleSampleBatchModalOpen={handleSampleBatchModalOpen}
          // handleExPrgrsPhsOpen={handleExPrgrsPhsOpen}
        />
      </>
    );
  }, [fileList, filterText]);

  const handleFileUploadModalClose = () => {
    setIsFileUploadModal(false);
  };

  return (
    <>
      <DataTableBase
        data={filteredItems}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        pagination={false}
        selectableRows={false}
      />

      {/* 실험 진행 단계 변경 */}
      {isFileUploadModal && (
        <FileUploadModal
          onClose={handleFileUploadModalClose}
          open={isFileUploadModal}
          modalWidth={800}
          formId="fileUploadForm"
        />
      )}
    </>
  );
};

export default FileTab;
