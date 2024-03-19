import React, { useState } from "react";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import { Backdrop, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import RogDataTable from "./RogDataTable";

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

const RogTab = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // const handleTest = (runUpdateHstrUkey: string) => {
  //   console.log("TTTTTTTT", runUpdateHstrUkey);
  //   setRunUpdateHstrUkey(runUpdateHstrUkey);
  //   handleOpen();
  // };

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

  return (
    <>
      <ErrorContainer FallbackComponent={Fallback}>
        <RogDataTable handleOpen={handleOpen} />
      </ErrorContainer>

      {/*  추가, 삭제 샘플 모달  */}
      {showModal && (
        <LazyAddDeleteLogModal
          modalWidth={1200}
          open={showModal}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default RogTab;
