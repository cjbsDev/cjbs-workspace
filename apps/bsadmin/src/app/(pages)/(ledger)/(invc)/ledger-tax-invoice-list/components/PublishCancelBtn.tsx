import React, { useCallback, useState } from "react";
import { AlertModal, ContainedButton } from "cjbsDSTM";
import { DELETE, POST } from "api";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";

const PublishCancelBtn = () => {
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [subAlertMsg, setSubAlertMsg] = useState("");
  const router = useRouter();
  const params = useParams();
  const invcUkey = params.slug;
  const handlePublishCancel = async (
    invcUkey: string | string[] | undefined,
  ) => {
    try {
      const res = await POST(`/invc/issue/cancel/${invcUkey}`);
      console.log("Response", res);
      if (res.success) {
        console.log("발행 취소", res);
        router.push("/ledger-tax-invoice-list");
      } else {
        setSubAlertMsg(res.message);
        // toast(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      // setIsLoading(false);
      // setIsDisabled(true);
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
      <ContainedButton
        size="small"
        buttonName="발행 취소"
        color="error"
        onClick={handleAlertOpen}
      />
      <AlertModal
        onClose={handleAlertClose}
        alertMainFunc={() => handlePublishCancel(invcUkey)}
        open={alertModalOpen}
        mainMessage="해당 세금계산서의 발행을 취소하시겠습니까?"
        subMessage={subAlertMsg}
        alertBtnName="확인"
      />
    </>
  );
};

export default PublishCancelBtn;
