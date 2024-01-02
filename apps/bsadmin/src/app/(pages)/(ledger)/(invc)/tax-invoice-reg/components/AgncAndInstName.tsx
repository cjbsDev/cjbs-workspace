import React from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";

const AgncAndInstName = () => {
  const { getValues } = useFormContext();
  const getAgncNm = getValues("agncNm");
  const getIsntNm = getValues("instNm");

  const isEmpty = !getAgncNm || !getIsntNm;
  const displayText = isEmpty
    ? "거래처 검색을 해주세요."
    : `${getAgncNm}(${getIsntNm})`;

  // console.log("{{{{{{{{{{{{");

  return (
    <Typography
      variant="body2"
      color="secondary"
      // sx={{ color: isEmpty && "red" }}
    >
      {displayText}
    </Typography>
  );
};

export default AgncAndInstName;
