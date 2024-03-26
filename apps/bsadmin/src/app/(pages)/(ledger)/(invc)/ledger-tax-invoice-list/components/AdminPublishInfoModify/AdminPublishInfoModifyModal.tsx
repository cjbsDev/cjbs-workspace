import React, { useState } from "react";
import { ModalContainerProps } from "../../../../../../types/modal-container-props";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { PUT } from "api";
import { toast } from "react-toastify";
import {
  ErrorContainer,
  Fallback,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { CircularProgress, DialogContent, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSWRConfig } from "swr";
import dynamic from "next/dynamic";

const LazyAdminPublishInfoModifyForm = dynamic(
  () => import("./AdminPublishInfoModifyForm"),
  {
    ssr: false,
    loading: () => (
      <Stack direction="row" justifyContent="center" spacing={1}>
        <CircularProgress size={20} />
      </Stack>
    ),
  },
);

const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
) => dayjs(date).format("YYYY-MM-DD");

const AdminPublishInfoModifyModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug: invcUkey } = useParams();
  // const params = useParams();
  // const invcUkey = params.slug;
  const { mutate } = useSWRConfig();

  const onSubmit = async (data: {
    issuDttm: string | number | Date | dayjs.Dayjs | null | undefined;
  }) => {
    setIsLoading(true);
    console.log("ssssssss", data);

    const formattedIssuDttm = formatDate(data.issuDttm);
    const bodyData = {
      ...data,
      issuDttm: formattedIssuDttm,
      invcUkey: invcUkey?.toString(),
    };

    // console.log("PUT BODYDATA ==>>", bodyData);

    try {
      const res = await PUT(`/invc/issuedInfo`, bodyData);

      if (res.success) {
        console.log("SUCCESS", res);
        mutate(`/invc/${invcUkey}`);
        onClose();
      } else {
        toast.error(res.message || "알 수 없는 오류가 발생했습니다.");
      }
    } catch (error: any) {
      console.error("Error submitting form", error);
      toast.error(error.message || "폼 제출 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer
      onClose={onClose}
      open={open}
      modalWidth={modalWidth}
      overflowY="visible"
    >
      <ModalTitle onClose={onClose}>계산서 발행 정보 변경</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAdminPublishInfoModifyForm onSubmit={onSubmit} />
        </ErrorContainer>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} color="secondary" />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="accountStatementForm"
        >
          수정
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default AdminPublishInfoModifyModal;
