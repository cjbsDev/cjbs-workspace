import React from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";
import { formatBusinessRegNo, InputValidation } from "cjbsDSTM";

const BusinessRegNo = () => {
  const { getValues } = useFormContext();
  const getBrno = getValues("brno");
  return (
    <>
      <Typography variant="body2" color="secondary">
        {formatBusinessRegNo(getBrno)}
      </Typography>
      <InputValidation
        sx={{ display: "none" }}
        inputName="brno"
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

export default BusinessRegNo;
