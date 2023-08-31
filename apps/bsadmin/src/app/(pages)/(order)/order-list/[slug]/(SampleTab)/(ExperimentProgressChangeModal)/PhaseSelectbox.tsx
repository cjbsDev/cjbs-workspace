import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../../../../../../func/fetcher";

export default function PhaseSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topUniqueCode=BS_0100004`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data.data);

  return (
    <SelectBox
      inputName="analysisPhaseMc"
      options={data.data}
      sx={{ width: "100%" }}
      required={true}
      errorMessage="단계를 선택해 주세요."
    />
  );
}
