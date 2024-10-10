import React, { useCallback, useState } from "react";
import { DELETE } from "api";
import { useRouter } from "next-nprogress-bar";
import {AlertModal, ContainedButton, DeletedButton} from "cjbsDSTM";
import { useParams } from "next/navigation";
import {toast} from "react-toastify";
import {mutate, useSWRConfig} from "swr";
import {CanceledError} from "axios";

const CancelBtn = ({orshUkey, mutate} : { orshUkey:string; mutate:any}) => {
  const params = useParams();
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [subAlertMsg, setSubAlertMsg] = useState("");
  const handleOrshCancel = async (orshUkey: string) => {
    try {
      const res = await DELETE(`/orsh/bs/${orshUkey}`);
      console.log("Response", res);
      if (res.success) {
        mutate();
        toast("취소 되었습니다.");
      } else {
        setSubAlertMsg(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
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
          onClick={handleAlertOpen}
          size="small"
      />
      <AlertModal
          onClose={handleAlertClose}
          alertMainFunc={() => handleOrshCancel(orshUkey)}
          open={alertModalOpen}
          mainMessage="취소를 진행하시겠습니까?"
          subMessage={subAlertMsg}
          alertBtnName="취소"
      />
    </>
  );
};

export default CancelBtn;
