import React, { useMemo, useState } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../components/NoDataView";
import { DataTableBase, OutlinedButton } from "cjbsDSTM";
import { useParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { DELETE, fetcher, GET } from "api";
import MyIcon from "icon/MyIcon";
import { Box, IconButton } from "@mui/material";
import SubHeader from "./SubHeader";
import { toast } from "react-toastify";
import axios from "axios";
import FileSaver from "file-saver";
import { useSetRecoilState } from "recoil";
import { fileModalAtom } from "./fileModalAtom";
import { useSession } from "next-auth/react";

const FileTable = () => {
  const { data: session, status } = useSession();
  const setIsFileUploadModal = useSetRecoilState(fileModalAtom);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const { data } = useSWR(`/order/${orderUkey}/file/list`, fetcher, {
    suspense: true,
  });
  const fileList = Array.from(data);

  // console.log("UseInfo", session);
  // console.log("$%$%$%$%$%$%$%$%$%$%$%$%", fileList);

  const filteredItems = fileList.filter((item) => {
    const filterPattern = new RegExp(
      filterText.toLowerCase().normalize("NFC"),
      "i",
    );

    return (
      (item.orderFileMemo &&
        filterPattern.test(
          item.orderFileMemo.toLowerCase().normalize("NFC"),
        )) ||
      (item.fileOriginNm &&
        filterPattern.test(item.fileOriginNm.toLowerCase().normalize("NFC")))
    );
  });

  const rowDelete = async (orderFileUkey: string) => {
    console.log("orderFileUkey ==>>", orderFileUkey);
    try {
      const res = await DELETE(`/order/${orderUkey}/file/${orderFileUkey}`);
      if (res.success) {
        console.log("Delete", res);
        toast("삭제되었습니다.");
        mutate(`/order/${orderUkey}/file/list`);
      }
    } catch (e: any) {
      console.log(e.message);
    } finally {
    }
  };

  const handleDownload = async (
    orderFileUkey: string,
    fileOriginNm: string,
  ) => {
    try {
      const res = await GET(`/order/${orderUkey}/file/${orderFileUkey}`);

      await axios({
        url: res.data,
        method: "get",
        responseType: "blob",
      }).then((response) => {
        FileSaver.saveAs(response.data, fileOriginNm);
        // console.log(">>>>>>>>>>", response);
      });
    } catch (e: any) {
      console.log(e.message);
    } finally {
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "No",
        width: "60px",
        center: true,
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
        center: true,
        selector: (row) => row.isSendQCEmail,
      },
      {
        name: "부서",
        width: "120px",
        sortable: true,
        center: true,
        selector: (row) => row.departVal,
      },
      {
        name: "등록자",
        width: "90px",
        sortable: true,
        center: true,
        selector: (row) => row.userNm,
      },
      {
        name: "등록일",
        width: "110px",
        sortable: true,
        right: true,
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
        width: "60px",
        button: true,
        selector: (row) => row.createdDttm,
        cell: (row) => {
          const { orderFileUkey } = row;
          return (
            <IconButton
              onClick={() => rowDelete(orderFileUkey)}
              disabled={row.userEmail !== session.user.email}
              color="warning"
              sx={{
                cursor:
                  row.userEmail !== session.user.email ? "default" : "pointer",
              }}
            >
              <MyIcon icon="trash" size={20} />
            </IconButton>
          );
        },
      },
    ],
    [],
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
  }, [filterText, filteredItems.length, resetPaginationToggle]);

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        data={filteredItems}
        columns={columns}
        // pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        pagination={false}
        selectableRows={false}
        noDataComponent={<NoDataView />}
      />
    </Box>
  );
};

export default FileTable;
