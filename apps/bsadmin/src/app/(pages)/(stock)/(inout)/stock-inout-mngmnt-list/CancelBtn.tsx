import React, { useCallback, useState } from "react";
import { AlertModal, DeletedButton } from "cjbsDSTM";
import { DELETE } from "api";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

interface CancelBtnProps {
  inOut: string;
  isCancelButtonStatus: string;
  stockInOutUkey: string;
}

const CancelBtn = ({
  inOut,
  isCancelButtonStatus,
  stockInOutUkey,
}: CancelBtnProps) => {
  const { mutate } = useSWRConfig();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [subAlertMsg, setSubAlertMsg] = useState("");
  const deleteURL =
    inOut === "입고"
      ? `/stock/inout/${stockInOutUkey}/in`
      : `/stock/inout/${stockInOutUkey}/out`;

  const handleDelete = async () => {
    try {
      const res = await DELETE(deleteURL);
      console.log("Delete 성공 여부", res.success);

      if (res.success) {
        mutate(`/stock/inout/list?page=1&size=15`);
        toast("삭제 되었습니다.");
      } else {
        toast(res.message);
      }
    } catch (error: any) {
      console.error(
        "입출고 삭제 오류>>>>",
        error.response?.data?.data || error.message,
      );
    } finally {
      handleAlertClose();
    }
  };

  const handleAlertOpen = useCallback(() => {
    setAlertModalOpen(true);
  }, []);

  const handleAlertClose = () => {
    setAlertModalOpen(false);
    setSubAlertMsg("");
  };

  return (
    <>
      <DeletedButton
        buttonName="취소"
        size="small"
        // onClick={handleDelete}
        onClick={handleAlertOpen}
        disabled={isCancelButtonStatus !== "Y"}
      />

      <AlertModal
        onClose={handleAlertClose}
        alertMainFunc={() => handleDelete()}
        open={alertModalOpen}
        mainMessage="정말 취소하시겠습니까?"
        subMessage={subAlertMsg}
        alertBtnName="확인"
      />
    </>
  );
};

export default CancelBtn;
