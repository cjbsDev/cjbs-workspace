// AdminPublishInfoModifyViewModel.js
import { useState } from "react";
import { formatDate, updateInvoice } from "../model/Model";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

export const useAdminPublishInfoModifyViewModel = (invcUkey, onClose) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formattedIssuDttm = formatDate(data.issuDttm);
    const bodyData = {
      ...data,
      issuDttm: formattedIssuDttm,
      invcUkey: invcUkey?.toString(),
    };

    try {
      const res = await updateInvoice(invcUkey, bodyData);
      if (res.success) {
        mutate(`/invc/${invcUkey}`);
        onClose();
      } else {
        toast.error(res.message || "알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error(error.message || "폼 제출 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    isLoading,
  };
};
