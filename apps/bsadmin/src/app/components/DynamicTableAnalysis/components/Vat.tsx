import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  formatNumberWithCommas,
  InputEAType,
  InputPriceType,
  InputValidation,
} from "cjbsDSTM";
import { InputAdornment, Stack, Typography } from "@mui/material";

interface VatProps {
  fieldName: string;
  index: number;
}

const Vat = ({ fieldName, index }: VatProps) => {
  const { control, setValue } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });

  const sampleSize =
    productValue[index]?.sampleSize === undefined
      ? 0
      : productValue[index]?.sampleSize;
  const unitPrice =
    productValue[index]?.unitPrice === undefined
      ? 0
      : productValue[index]?.unitPrice;

  const vatValue = Math.round(productValue[index].supplyPrice * 0.1);
  console.log("VAT ==>>", vatValue);
  useEffect(() => {
    setValue(`${fieldName}[${index}].vat`, vatValue);
  }, [setValue, vatValue]);
  return (
    <>
      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
        <Typography variant="body2">
          {formatNumberWithCommas(vatValue)}
        </Typography>
        <Typography variant="body2">원</Typography>
      </Stack>
      {/*<InputValidation*/}
      {/*  inputName={`${fieldName}[${index}].vat`}*/}
      {/*  disabled={true}*/}
      {/*  sx={{*/}
      {/*    ".MuiOutlinedInput-input": {*/}
      {/*      textAlign: "end",*/}
      {/*    },*/}
      {/*    "&.MuiTextField-root": {*/}
      {/*      backgroundColor: "#F1F3F5",*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  InputProps={{*/}
      {/*    readOnly: true,*/}
      {/*    endAdornment: (*/}
      {/*      <InputAdornment position="end">*/}
      {/*        <Typography variant="body2" sx={{ color: "black" }}>*/}
      {/*          원*/}
      {/*        </Typography>*/}
      {/*      </InputAdornment>*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  );
};

export default Vat;
