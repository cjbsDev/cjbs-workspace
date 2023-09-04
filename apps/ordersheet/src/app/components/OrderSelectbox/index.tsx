import { SelectBox } from "cjbsDSTM";
import { fetcher } from 'api';
import useSWR from "swr";

interface CommonSelectboxProps {
  url: string;
  inputName: string;
}
export default function CommonSelectbox({
  url,
  inputName,
}: CommonSelectboxProps) {
  // console.log("&&&&&&&&&&&&&&&&&&&&")
  // console.log(url+" : "+inputName);
  const { data } = useSWR(
      url,
      fetcher,
      {
        suspense: true,
      }
  );

  // console.log(data.data);

  return (
    <SelectBox
      inputName={inputName}
      options={data.data}
      required={true}
      errorMessage="값을 선택해 주세요."
    />
)}

