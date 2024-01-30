"use client";
import React from "react";
import useStatusTypeList from "../../../../../hooks/useStatusTypeList";
import { SelectBox2 } from "cjbsDSTM";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

const AlnsSelectbox = ({ defaultValue }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useStatusTypeList("Analaysis Type ", "none");
  const DEFAULT_ANALYSIS_TYPE = "ALL";

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    console.log(value);
    if (value === DEFAULT_ANALYSIS_TYPE) {
      router.push(pathname);
    } else {
      router.push(`${pathname}?page=1&size=15&anlsTypeMc=${value}`);
    }
  };

  return (
    <SelectBox2
      options={data}
      onChange={handleChange}
      defaultValue={defaultValue}
    />
  );
};

export default AlnsSelectbox;
