import React, { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {cjbsTheme, ErrorContainer, Fallback, InputEAType, InputPriceType, InputValidation} from "cjbsDSTM";
import {InputAdornment, Typography} from "@mui/material";
import dynamic from "next/dynamic";

const LazyPrepSelectbox = dynamic(
  () => import("../../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const LicenseSrvcTypeMc = (props:any) => {

  const { index, errors, callStndPrice } = props;
  const { setValue, getValues, control } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  const addTypeVal = sampleValue[index].addType;

  return (
    <>
      <InputValidation
        inputName={`sample.[${index}].addType`}
        required={false}
        sx={{ display: 'none' }}
      />
      <InputValidation
        inputName={`sample.[${index}].srvcTypeVal`}
        required={false}
        fullWidth={true}
        sx={{
          // width: 200,
          display: addTypeVal === "button" ? 'none' : 'block',
        }}
        InputProps={{
          readOnly: true,
        }}
      />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyPrepSelectbox
          url={"/code/list/shortly/value?topValue=Service Type&midValue=none"}
          inputName={`sample.[${index}].srvcTypeMc`}
          sx={{
            // width: 200,
            display: addTypeVal === "button" ? 'block' : 'none',
          }}
        />
      </ErrorContainer>
      {errors.sample?.[index]?.srvcTypeMc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
    </>
  );
};

export default LicenseSrvcTypeMc;
