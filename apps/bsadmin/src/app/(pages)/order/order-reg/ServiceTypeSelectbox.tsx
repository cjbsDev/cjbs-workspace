import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import fetcher from "../../../func/fetcher";
import useSWR from "swr";

export default function ServiceTypeSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topUniqueCode=BS_0100007`,
    fetcher,
    {
      suspense: true,
    }
  );
  return (
    <SelectBox required={true} inputName="srvcTypeMc" options={data.data} />
  );
}
