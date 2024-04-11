import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const UserDepartMcSelect = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=user&midValue=authority`,
    fetcher,
    {
      suspense: true,
      fallbackData: [],
    },
  );

  return (
    <SelectBox
      key="authCc"
      inputName="authCc"
      options={data}
      defaultMsg="권한 선택"
    />
  );
};

export default UserDepartMcSelect;
