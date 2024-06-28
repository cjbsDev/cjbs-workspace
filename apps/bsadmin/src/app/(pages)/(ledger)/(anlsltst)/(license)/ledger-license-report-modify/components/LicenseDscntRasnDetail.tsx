import React, {useEffect, useState} from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {cjbsTheme, ErrorContainer, Fallback, InputEAType, InputPriceType, InputValidation} from "cjbsDSTM";
import {Box, InputAdornment, Stack, Typography} from "@mui/material";

const LicenseDscntRasnDetail = (props:any) => {

  const { index, errors } = props;
  const { watch, setValue, getValues, control } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  const dscntRasnCc = sampleValue[index].dscntRasnCc;

  return (
    <>
      {dscntRasnCc === "BS_1813004" && (
        <Box sx={{width: '100%'}}>
          <InputValidation
            inputName={`sample.[${index}].dscntRasnDetail`}
            required={false}
            fullWidth={true}
          />
        </Box>
      )}
    </>
  );
};

export default LicenseDscntRasnDetail;
