import React, { useEffect } from "react";
import { fetcher } from "api";
import useSWR from "swr";
import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";

interface InputNameProps {
  inputName: string;
}

const AnlsTypeSelectbox = ({ inputName }: InputNameProps) => {
  // const { watch } = useFormContext();
  // const srvcCtgrMcValue = watch("srvcCtgrMc");
  // //
  // useEffect(() => {
  //   // props.handleOnChange(srvcCtgrMcValue);
  //
  //   console.log("AnlsType List@@@@", data);
  // }, [srvcCtgrMcValue]);

  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Analaysis Type&midValue=`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("AnlsType List", data);
  // const serviceCategoryTypeData = data;

  return (
    <SelectBox
      inputName={inputName}
      options={data}
      required={true}
      sx={{ width: "100%" }}
    />
  );
};

export default AnlsTypeSelectbox;
