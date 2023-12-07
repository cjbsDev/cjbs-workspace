import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";

import axios from "axios";
import { fetcher } from "api";
export default function SelectDeptMng() {
  const { watch } = useFormContext();
  const departCode = watch("departCodeMc");
  const prjcMngrUkey = watch("prjcMngrUkey");
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
      inputName="prjcMngrUkey"
      options={deptMngData}
      defaultOption={false}
    />
  ) : null;
}
