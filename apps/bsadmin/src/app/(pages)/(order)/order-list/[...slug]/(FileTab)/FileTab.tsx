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

const FileTab = () => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const params = useParams();
  // console.log("SAMPLE TAB PARAMS", params);
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/${orderUkey}/file/list`, fetcher, {
    suspense: true,
  });
  const fileList = data.orderFileList;

  console.log("FILELIST", fileList);

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleId,
      },
    ],
    []
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    // const handleClear = () => {
    //   if (filterText) {
    //     setResetPaginationToggle(!resetPaginationToggle);
    //     setFilterText("");
    //   }
    // };
    // const handleSampleAddModalOpen = () => {
    //   setShowSampleAddModal(true);
    // };
    // const handleExPrgrsPhsOpen = () => {
    //   if (sampleUkeyList.length !== 0) setShowExPrgsChngModal(true);
    //   if (sampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");
    //   setIsClear(false);
    // };
    //
    // const handleSampleBatchModalOpen = () => {
    //   if (sampleUkeyList.length !== 0) setShowSampleBatchChangeModal(true);
    //   if (sampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");
    //   setIsClear(false);
    // };

    return (
      <SubHeader
        // exportUrl={`${process.env.NEXT_PUBLIC_API_URL}/order/list/download`}
        totalCount={fileList.length}
        // handleSampleAddModalOpen={handleSampleAddModalOpen}
        // handleSampleBatchModalOpen={handleSampleBatchModalOpen}
        // handleExPrgrsPhsOpen={handleExPrgrsPhsOpen}
      />
    );
  }, []);

  return (
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
    />
  );
};

export default FileTab;
