import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";

import axios from "axios";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function SelectDeptMng() {
  const { watch } = useFormContext();
  const departCode = watch("departCodeMc");
  const prjcMngrUkey = watch("prjcMngrUkey");
  // ~/code/user/{depart}/list
  const { data: deptMngData } = useSWR(
    departCode !== undefined
      ? `${process.env.NEXT_PUBLIC_API_URL}/code/user/${departCode}/list`
      : null,
    fetcher,
    {
      suspense: true,
    }
  );

  // Only render the SelectBox if the API call has successfully fetched the data
  return deptMngData?.data ? (
    <SelectBox
      sx={{ width: "200px" }}
      inputName="prjcMngrUkey"
      options={deptMngData.data}
      defaultOption={false}
    />
  ) : null;
}
