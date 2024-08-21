import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

export default function NGSSalesManagerSelectbox() {
  const { data } = useSWR(`/code/user/BS_0100003012/list`, fetcher, {
    suspense: true,
  });

  // console.log("영업담당자 목록 ==>>", data);

  return (
    <SelectBox
      errorMessage="영업 담당자를 선택해 주세요."
      inputName="bsnsMngrUkey"
      options={data}
      required={true}
    />
  );
}
