import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

// RUN Type
export default function RunTypeSelectbox(props) {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Run Service Type`,
    fetcher,
    {
      suspense: true,
    }
  );

  // console.log(data);

  return (
    <SelectBox
      {...props}
      inputName="runType"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
