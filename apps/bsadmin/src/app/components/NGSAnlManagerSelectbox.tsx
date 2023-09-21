import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

export default function DateTypeSelectbox() {
  const { data } = useSWR(`/code/user/BS_0100003013/list`, fetcher, {
    suspense: true,
  });

  return (
    <SelectBox
      required={true}
      errorMessage="담당자를 선택해 주세요."
      inputName="bsnsMngrUkey"
      options={data}
    />
  );
}
