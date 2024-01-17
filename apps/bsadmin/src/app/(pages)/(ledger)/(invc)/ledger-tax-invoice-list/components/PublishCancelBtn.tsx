import React from "react";
import { ContainedButton } from "cjbsDSTM";
import { DELETE, POST } from "api";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";

const PublishCancelBtn = () => {
  const router = useRouter();
  const params = useParams();
  const invcUkey = params.slug;
  const handlePublishCancel = async () => {
    const bodyData = {
      invcUkey,
    };

    try {
      const res = await POST(`/invc/issue/cancel/${invcUkey}`, bodyData);
      console.log("Response", res);
      if (res.success) {
        console.log("발행 취소", res);
        router.push("/tax-invoice-list");
      } else {
        // setSubAlertMsg(res.message);
        toast(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      // setIsLoading(false);
      // setIsDisabled(true);
    }
  };

  return (
    <ContainedButton
      size="small"
      buttonName="발행 취소"
      color="error"
      onClick={handlePublishCancel}
    />
  );
};

export default PublishCancelBtn;
