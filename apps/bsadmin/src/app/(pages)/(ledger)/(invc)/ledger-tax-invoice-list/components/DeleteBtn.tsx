import React, { useCallback, useState } from "react";
import { DELETE } from "api";
import { useRouter } from "next-nprogress-bar";
import { AlertModal, ContainedButton } from "cjbsDSTM";
import { useParams } from "next/navigation";

const DeleteBtn = () => {
  const params = useParams();
  const invcUkey = params.slug;
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [subAlertMsg, setSubAlertMsg] = useState("");
  const handleInvcDelete = async (invcUkey: string | string[] | undefined) => {
    try {
      const res = await DELETE(`/invc/${invcUkey}`);
      console.log("Response", res);
      if (res.success) {
        router.push("/ledger-tax-invoice-list");
        // mutate(`/run/sample/${ukey}?page=1&size=20`);
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
        buttonName="삭제"
        color="error"
        onClick={handleAlertOpen}
        size="small"
      />
      <AlertModal
        onClose={handleAlertClose}
        alertMainFunc={() => handleInvcDelete(invcUkey)}
        open={alertModalOpen}
        mainMessage="삭제를 진행하시겠습니까?"
        subMessage={subAlertMsg}
        alertBtnName="삭제"
      />
    </>
  );
};

export default DeleteBtn;
