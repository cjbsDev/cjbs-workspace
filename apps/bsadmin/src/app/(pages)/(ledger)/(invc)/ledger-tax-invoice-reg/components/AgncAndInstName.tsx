import React from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";

const AgncAndInstName = ({}) => {
  const { getValues } = useFormContext();
  const getAgncNm = getValues("agncNm");
  const getInstNm = getValues("instNm");
  const getAgncInstNm = getValues("agncInstNm");
  // const getAgncInstNm = `${getAgncNm}(${getInstNm})`;

  console.log("getAgncNm", getAgncNm);
  console.log("getInstNm", getInstNm);
  console.log("getAgncInstNm", getAgncInstNm);

  const isEmpty = !getAgncNm || !getAgncInstNm;
  const displayText = isEmpty ? "거래처 검색을 해주세요." : `${getAgncInstNm}`;

  return (
    <Typography variant="body2" color="secondary">
      {displayText}
    </Typography>
  );
};

export default AgncAndInstName;
