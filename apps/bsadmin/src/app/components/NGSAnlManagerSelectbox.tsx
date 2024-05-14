import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

export default function NGSAnlManagerSelectbox({ inputName }) {
  const { data } = useSWR(`/code/user/BS_0100003011/list`, fetcher, {
    suspense: true,
  });

  return <SelectBox inputName={inputName} options={data} />;
}
