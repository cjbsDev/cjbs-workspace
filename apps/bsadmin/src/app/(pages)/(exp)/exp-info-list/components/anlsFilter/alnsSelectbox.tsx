import React, { useState } from "react";
import useStatusTypeList from "../../../../../hooks/useStatusTypeList";
import { SelectBox2 } from "cjbsDSTM";
import { SelectChangeEvent } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

interface ResultObject {
  anlsTypeMc: string | null;
}

const AlnsSelectbox = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resultObject] = useResultObject() as [ResultObject, unknown];
  const { anlsTypeMc } = resultObject;

  const { data } = useStatusTypeList("Analaysis Type ", "none");
  const DEFAULT_ANALYSIS_TYPE = "ALL";

  const valuesToDelete = [
    "BS_0100006004",
    "BS_0100006011",
    "BS_0100006006",
    "BS_0100006007",
    "BS_0100006008",
  ];

  const filteredAnlsListData = data.filter((item) =>
    valuesToDelete.includes(item.value),
  );

  // console.log(filteredAnlsListData);

  // const url = new URL(pathname);
  // console.log("URL", pathname);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const params = new URLSearchParams(searchParams.toString());
    console.log("@@@@@@@@@PARAMS", params.toString());
    // params.delete("page");
    // params.delete("size");

    // router.push(`${pathname}?page=1&size=15&${params.toString()}`);

    if (value === DEFAULT_ANALYSIS_TYPE) {
      params.delete("anlsTypeMc");
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.delete("anlsTypeMc");
      params.append("anlsTypeMc", value);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <SelectBox2
        options={filteredAnlsListData}
        onChange={handleChange}
        defaultValue={anlsTypeMc}
      />
    </>
  );
};

export default AlnsSelectbox;
