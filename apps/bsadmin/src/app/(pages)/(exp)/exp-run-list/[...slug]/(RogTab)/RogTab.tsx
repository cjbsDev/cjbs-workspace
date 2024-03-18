import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher, GET, PUT } from "api";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { cjbsTheme, ContainedButton, DataTableBase } from "cjbsDSTM";
import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { updateSampleLogListAtom } from "./rogAtom";
import dynamic from "next/dynamic";
import MyIcon from "icon/MyIcon";

const LazyAddDeleteLogModal = dynamic(() => import("./AddDeleteLogModal"), {
  ssr: false,
  loading: () => (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ),
});

// const columns = [
//   {
//     name: "변경일",
//     // width: "80px",
//     sortable: true,
//     selector: (row) => row.modifiedAt,
//   },
//   {
//     name: "담당자",
//     sortable: true,
//     selector: (row) => (row.updatedByNm === null ? "-" : row.updatedByNm),
//   },
//   {
//     name: "컬럼",
//     sortable: true,
//     button: true,
//     selector: (row) => (row.targetColVal === null ? "-" : row.targetColVal),
//   },
//   {
//     name: "변경전",
//     selector: (row) => row.preUpdateValue,
//   },
//   {
//     name: "변경후",
//     selector: (row) => row.postUpdateValue,
//   },
// ];

const RogTab = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const setUpdateSampleLogList = useSetRecoilState(updateSampleLogListAtom);
  const params = useParams();
  const uKey = params.slug;
  const { data } = useSWR(`/run/log/${uKey}`, fetcher, {
    suspense: true,
  });

  console.log("Rog Data", data);

  const rogDataList = data.updateLogList;

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleTest = (runUpdateHstrUkey: string) => {
    console.log("TTTTTTTT", runUpdateHstrUkey);
    handleOpen();
  };

  const goDetailModal = useCallback(
    (runUpdateHstrUkey: string) => async () => {
      // console.log("runUpdateHstrUkey ==>>>", row.runUpdateHstrUkey);
      // const runUpdateHstrUkey = row.runUpdateHstrUkey;

      console.log("Click!!!!", runUpdateHstrUkey);

      // try {
      //   const response = await GET(`/run/sample/log/${runUpdateHstrUkey}`);
      //   if (response.success) {
      //     console.log("************", response.data);
      //     setUpdateSampleLogList(response.data);
      //     handleOpen();
      //     // onClose();
      //     // renderList();
      //   } else if (response.code == "INVALID_AUTHORITY") {
      //     toast("권한이 없습니다.");
      //   } else {
      //     toast("문제가 발생했습니다. 01");
      //   }
      // } catch (error) {
      //   console.error("request failed:", error);
      //   toast("문제가 발생했습니다. 02");
      // }
    },
    [setUpdateSampleLogList],
  );

  // const goDetailModal = async (row) => {
  //   console.log("runUpdateHstrUkey ==>>>", row.runUpdateHstrUkey);
  //   const runUpdateHstrUkey = row.runUpdateHstrUkey;
  //   try {
  //     const response = await GET(`/run/sample/log/${runUpdateHstrUkey}`);
  //     if (response.success) {
  //       console.log("************", response.data);
  //       setUpdateSampleLogList(response.data);
  //       handleOpen();
  //       // onClose();
  //       // renderList();
  //     } else if (response.code == "INVALID_AUTHORITY") {
  //       toast("권한이 없습니다.");
  //     } else {
  //       toast("문제가 발생했습니다. 01");
  //     }
  //   } catch (error) {
  //     console.error("request failed:", error);
  //     toast("문제가 발생했습니다. 02");
  //   }
  // };

  const columns = useMemo(
    () => [
      {
        name: "변경일",
        // width: "80px",
        sortable: true,
        selector: (row) => row.modifiedAt,
      },
      {
        name: "담당자",
        sortable: true,
        selector: (row) => (row.updatedByNm === null ? "-" : row.updatedByNm),
      },
      {
        name: "컬럼",
        sortable: true,
        // selector: (row) => (row.targetColVal === null ? "-" : row.targetColVal),
        cell: (row) => {
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Box>
                <p>{row.targetColVal}</p>
              </Box>
              {/*{row.targetColNm === "BS_1704008" ||*/}
              {/*  row.targetColNm === "BS_1704009"}*/}
              <Box>
                <IconButton
                  // onClick={() => goDetailModal(row.runUpdateHstrUkey)}
                  onClick={() => handleTest(row.runUpdateHstrUkey)}
                >
                  <MyIcon icon="memo" size={18} />
                </IconButton>
              </Box>
            </Stack>
          );
        },
      },
      {
        name: "변경전",
        selector: (row) => row.preUpdateValue,
      },
      {
        name: "변경후",
        selector: (row) => row.postUpdateValue,
      },
    ],
    [],
  );

  return (
    <>
      <DataTableBase
        data={rogDataList}
        columns={columns}
        // onRowClicked={goDetailModal}
        // pointerOnHover
        // highlightOnHover
        customStyles={dataTableCustomStyles3}
        selectableRows={false}
        // subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        // selectableRows
        // onSelectedRowsChange={handleSelectedRowChange}
        // clearSelectedRows={isClear}
        // selectableRowsVisibleOnly={true}
        // pagination
        // paginationServer
        // paginationTotalRows={totalElements}
        // onChangeRowsPerPage={handlePerRowsChange}
        // onChangePage={handlePageChange}
      />

      {/*  추가, 삭제 샘플 모달  */}
      <LazyAddDeleteLogModal
        modalWidth={1200}
        open={showModal}
        onClose={handleClose}
      />
    </>
  );
};

export default RogTab;
