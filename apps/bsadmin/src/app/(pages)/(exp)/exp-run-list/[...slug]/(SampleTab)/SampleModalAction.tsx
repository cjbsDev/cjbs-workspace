import React from "react";
import { ModalAction, OutlinedButton } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { sampleUkeyAtom } from "../../../../../recoil/atoms/sampleUkeyAtom";
import { POST, PUT } from "api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

interface SampleModalActionProps {
  handleClose: () => void;
  isLoading: boolean;
}

const SampleModalAction = (props: SampleModalActionProps) => {
  const { handleClose, isLoading } = props;
  const getSampleUkeyList = useRecoilValue(sampleUkeyAtom);
  const params = useParams();
  const ukey = params.slug;
  const { mutate } = useSWRConfig();

  const sampleAdd = async () => {
    console.log(getSampleUkeyList);

    if (getSampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");

    // const transformedObject = {
    //   sampleList: getSampleUkeyList.map((item) => ({
    //     sampleUkey: item,
    //   })),
    // };
    // console.log(transformedObject);

    const body = {
      sampleUkeyList: getSampleUkeyList,
    };
    // POST(`/run/add/${ukey}`, body).then((res) =>
    //   console.log("샘플 추가 @@@@@@@", res)
    // );

    try {
      const res = await POST(`/run/add/${ukey}`, body);
      console.log("RUN 샘플 추가 성공 여부>>>> ==>>", res.success);

      if (res.success) {
        // mutate(`/run/${ukey}`);
        mutate(`/run/sample/${ukey}?page=1&size=20`);
        handleClose();
      } else {
        toast(res.message);
      }
    } catch (error: any) {
      console.error(
        "샘플 추가 오류>>>>",
        error.response?.data?.data || error.message
      );
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <ModalAction>
      <OutlinedButton
        buttonName="취소"
        onClick={handleClose}
        color="secondary"
      />
      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={sampleAdd}
        disabled={getSampleUkeyList.length === 0 ? true : false}
      >
        샘플 추가
      </LoadingButton>
    </ModalAction>
  );
};

export default SampleModalAction;
