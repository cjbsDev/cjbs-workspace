import React, { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {cjbsTheme, InputEAType, InputPriceType, InputValidation} from "cjbsDSTM";
import {InputAdornment, Typography} from "@mui/material";
import { NumericFormat } from "react-number-format";
import {toast} from "react-toastify";

const LicenseDscntPctg = (props:any) => {

  const { index, errors } = props;
  const { setValue, getValues, control } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  return (
    <>
      <InputValidation
        inputName={`sample.[${index}].stndDscntPctg`}
        required={false}
        sx={{ width: 100, display: "none" }}
      />
      <InputValidation
        inputName={`sample.[${index}].isExc`}
        required={true}
        sx={{ width: 100, display: "none" }}
      />
      <InputValidation
        inputName={`sample.[${index}].dscntPctg`}
        required={true}
        fullWidth={true}
        sx={{
          // width: 150,
          "&.MuiTextField-root" : {
            backgroundColor : "#F1F3F5",
          },
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
        }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="body2" sx={{ color: "black" }}>
                %
              </Typography>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default LicenseDscntPctg;
