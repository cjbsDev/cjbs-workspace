import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
// import fetcher from "../../func/fetcher";
import { fetcher } from 'api';
import useSWR from "swr";

export default function SalesManagerSelectbox() {
  const { data } = useSWR(
    `/code/user/BS_0100003012/list`,
    fetcher,
    {
      suspense: true,
    }
  );
  // const methods = useFormContext();
  // const { setValue, getValues } = methods;
  // const values = getValues(["custNm", "ebcEmail"]);

  return (
    <SelectBox
      required={true}
      errorMessage="영업 담당자를 선택해 주세요."
      inputName="bsnsMngrUkey"
      options={data.data}
    />
  );
}
