import React from "react";
import { useFormContext } from "react-hook-form";
import { formatBusinessRegNo, InputValidation } from "cjbsDSTM";
import { Typography } from "@mui/material";

const RepresentName = () => {
  const { getValues } = useFormContext();
  const getRprsNm = getValues("rprsNm");
  return (
    <>
      <Typography variant="body2" color="secondary">
        {getRprsNm}
      </Typography>
      <InputValidation
        sx={{ display: "none" }}
        inputName="rprsNm"
        required={true}
        errorMessage="dsssdfsdf"
        InputProps={{
          readOnly: true,
        }}
        disabled={true}
      />
    </>
  );
};

export default RepresentName;
