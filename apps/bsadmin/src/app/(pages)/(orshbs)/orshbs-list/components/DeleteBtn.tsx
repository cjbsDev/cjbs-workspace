import React, { useCallback, useState } from "react";
import { DELETE } from "api";
import { useRouter } from "next-nprogress-bar";
import { AlertModal, ContainedButton } from "cjbsDSTM";
import { useParams } from "next/navigation";
import {mutate} from "swr";
import {toast} from "react-toastify";

const DeleteBtn = ( {orshUkey} : { orshUkey:string; }) => {
  console.log("orshUkey : {}", orshUkey);
  const params = useParams();
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [subAlertMsg, setSubAlertMsg] = useState("");
  const handleOrshDelete = async (orshUkey: string) => {
    try {
      const res = await DELETE(`/orsh/bs/${orshUkey}`);
      console.log("Response", res);
      if (res.success) {
        mutate(`/orshbs-list/`);
        toast("삭제 되었습니다.");
        handleAlertClose();
      } else {
        setSubAlertMsg(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
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
          buttonName="취소"
          color="error"
          onClick={handleAlertOpen}
          size="small"
      />
      <AlertModal
          onClose={handleAlertClose}
          alertMainFunc={() => handleOrshDelete(orshUkey)}
          open={alertModalOpen}
          mainMessage="취소를 진행하시겠습니까?"
          subMessage={subAlertMsg}
          alertBtnName="취소"
      />
    </>
  );
};

export default DeleteBtn;
