import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const UserDepartMcSelect = () => {
  const { data } = useSWR(
    `/code/list/shortly/?topUniqueCode=BS_0100003`,
    fetcher,
    {
      suspense: true,
      fallbackData: [],
    },
  );
  return (
    <SelectBox
      key="departMc"
      inputName="departMc"
      options={data}
      defaultMsg="부서 선택"
    />
  );
};

export default UserDepartMcSelect;
