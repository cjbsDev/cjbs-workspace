import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

export default function PhaseSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly?topUniqueCode=BS_0100004`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log(data);
  const filteredData = data.filter((item) => item.optionName !== "Prep");

  return (
    <SelectBox
      inputName="analysisPhaseMc"
      options={filteredData}
      sx={{ width: "100%" }}
      required={true}
      errorMessage="단계를 선택해 주세요."
    />
  );
}
