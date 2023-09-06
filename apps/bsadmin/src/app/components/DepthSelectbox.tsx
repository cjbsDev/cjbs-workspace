import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../func/fetcher";

export default function DepthSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=Depth(GB)`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data.data);

  return (
    <SelectBox
      // required={true}
      errorMessage="Depth를 선택헤 주세요."
      inputName="depthMc"
      options={data.data}
      sx={{ width: "100%" }}
    />
  );
}
