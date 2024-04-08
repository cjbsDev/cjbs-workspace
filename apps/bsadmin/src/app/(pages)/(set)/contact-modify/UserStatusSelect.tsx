import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const UserDepartMcSelect = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=user&midValue=status`,
    fetcher,
    {
      suspense: true,
      fallbackData: [],
    },
  );

  return (
    <SelectBox
      key="statusCc"
      inputName="statusCc"
      options={data}
      defaultMsg="상태 선택"
    />
  );
};

export default UserDepartMcSelect;
