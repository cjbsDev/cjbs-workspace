import React, { useEffect } from "react";

import { fetcher } from "api";
import useSWR from "swr";
import { SelectBox } from "cjbsDSTM";
interface InputNameProps {
  inputName: string;
}

const ServiceCategorySelectbox = ({ inputName }: InputNameProps) => {
  // const { watch } = useFormContext();
  // const srvcCtgrMcValue = watch("srvcCtgrMc");
  //
  // useEffect(() => {
  //   props.handleOnChange(srvcCtgrMcValue);
  // }, [srvcCtgrMcValue]);

  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Service Classification&midValue=`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("ServiceCategoryType List", data);
  // const serviceCategoryTypeData = data;

  return (
    <SelectBox
      inputName={inputName}
      options={data}
      required={true}
      sx={{ width: "100%" }}
      defaultValue={"BS_0100005001"}
    />
    // <RadioGV
    //   data={serviceCategoryTypeData}
    //   inputName="srvcCtgrMc"
    //   required={true}
    //   errorMessage="서비스 분류 타입을 선택해 주세요."
    // />
  );
};

export default ServiceCategorySelectbox;