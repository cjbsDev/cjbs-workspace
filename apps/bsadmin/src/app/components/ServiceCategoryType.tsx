import React, {useEffect} from "react";

import { fetcher } from "api";
import useSWR from "swr";
import { RadioGV } from "cjbsDSTM";
import {useFormContext} from "react-hook-form";

const ServiceCategoryType = (props: any) => {

  const { watch } = useFormContext();
  const srvcCtgrMcValue = watch("srvcCtgrMc");

  useEffect(() => {
    props.handleOnChange(srvcCtgrMcValue);
  }, [srvcCtgrMcValue]);

  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Service Classification&midValue=`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("ServiceCategoryType List", data);
  const serviceCategoryTypeData = data;

  return (
    <RadioGV
      data={serviceCategoryTypeData}
      inputName="srvcCtgrMc"
      required={true}
      errorMessage="서비스 분류 타입을 선택해 주세요."
    />
  );
};

export default ServiceCategoryType;
