import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

export default function NGSAnlManagerSelectbox({ inputName }) {
  const { data } = useSWR(`/code/user/BS_0100003011/list`, fetcher, {
    suspense: true,
  });

  return (
    <SelectBox
      errorMessage="담당자를 선택해 주세요."
      inputName={inputName}
      options={data}
    />
  );
}
