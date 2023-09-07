import React, { useMemo, useState } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { cjbsTheme, DataTableBase } from "cjbsDSTM";
import { useParams } from "next/navigation";
import useSWR from "swr";
// import fetcher from "../../../../../func/fetcher";
import { fetcher } from "api";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import SubHeader from "./SubHeader";
import FileUploadModal from "./FileUploadModal";

const FileTab = () => {
  const [isFileUploadModal, setIsFileUploadModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/${orderUkey}/file/list`, fetcher, {
    suspense: true,
  });
  const fileList = data;

  console.log("FILELIST", fileList);

  const columns = useMemo(
    () => [
      {
        name: "파일명",
        sortable: true,
        selector: (row) => row.fileOriginNm,
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
      <SubHeader
        // exportUrl={`${process.env.NEXT_PUBLIC_API_URL}/order/list/download`}
        filterText={filterText}
        onFilter={onFilter}
        totalCount={fileList.length}
        handleClear={handleClear}
        handleFileUploadModalOpen={handleFileUploadModalOpen}
        // handleSampleBatchModalOpen={handleSampleBatchModalOpen}
        // handleExPrgrsPhsOpen={handleExPrgrsPhsOpen}
      />
    );
  }, []);

  const handleFileUploadModalClose = () => {
    setIsFileUploadModal(false);
  };

  return (
    <>
      <DataTableBase
        data={fileList}
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
