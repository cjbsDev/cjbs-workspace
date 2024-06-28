import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";

import axios from "axios";
import { fetcher } from "api";
export default function SelectDeptMng() {
  const { watch } = useFormContext();
  const departCode = watch("departCodeMc");
  const prjtMngrUkey = watch("prjtMngrUkey");
  // ~/code/user/{depart}/list
  const { data: deptMngData } = useSWR(
    departCode !== undefined ? `/code/user/${departCode}/list` : null,
    fetcher,
    {
      suspense: true,
    }
  );

  // Only render the SelectBox if the API call has successfully fetched the data
  return deptMngData ? (
    <SelectBox
      sx={{ width: "200px" }}
      inputName="prjtMngrUkey"
      options={deptMngData}
      defaultOption={false}
    />
  ) : null;
}
