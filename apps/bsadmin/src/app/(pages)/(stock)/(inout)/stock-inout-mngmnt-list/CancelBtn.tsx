import React from "react";
import { DeletedButton } from "cjbsDSTM";
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
    }
  };
  return (
    <DeletedButton
      buttonName="취소"
      size="small"
      onClick={handleDelete}
      disabled={isCancelButtonStatus !== "Y"}
    />
  );
};

export default CancelBtn;
