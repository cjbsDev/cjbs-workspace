import React, { useEffect, useMemo, useState } from "react";
import { cjbsTheme, InputValidation } from "cjbsDSTM";
import { InputAdornment, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

interface StndDscntPctgProps {
  fieldName: string;
  index: number;
}

const StndDscntPctg = ({ fieldName, index }: StndDscntPctgProps) => {
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  console.log("##########", productValue);

  const sampleSize = productValue[index].sampleSize;
  const unitPrice = productValue[index].unitPrice;
  console.log("기준가!!@!@!@!", unitPrice);
  const stndPrice = Number(productValue[index].stndPrice.replaceAll(",", ""));
  console.log("기준$$$$가!!@!@!@!", stndPrice - unitPrice);
  const stndDscntPctg = productValue[index].stndDscntPctg;
  const dscntPctg =
    stndPrice !== "N/A"
      ? Math.round(((stndPrice - unitPrice) / stndPrice) * 100)
      : "0";
  console.log("사용할인율####", dscntPctg);
  const isExc = dscntPctg > stndDscntPctg ? "Y" : "N";
  const watchIsExc = productValue[index].isExc;

  const [disCountChk, setDisCountChk] = useState<boolean>(false);

  useEffect(() => {
    setValue(`costList[${index}].dscntPctg`, dscntPctg);
    setValue(`costList[${index}].isExc`, isExc);
  }, [
    setValue,
    stndDscntPctg,
    dscntPctg,
    isExc,
    stndPrice,
    unitPrice,
    sampleSize,
  ]);

  return (
    <>
      <InputValidation
        inputName={`costList[${index}].dscntPctg`}
        required={true}
        // sx={{ width: 100, display: "none" }}
        sx={{
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
          "&.MuiTextField-root": {
            backgroundColor: "#F1F3F5",
          },
          ".MuiOutlinedInput-input:read-only": {
            textFillColor: watchIsExc === "Y" ? "#f10505" : "#000000",
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
      {errors.costList?.[index]?.dscntPctg && (
        <Typography variant="body2" color={cjbsTheme.palette.warning.main}>
          사용할인율 미입력.
        </Typography>
      )}
      <InputValidation
        inputName={`costList[${index}].isExc`}
        required={true}
        // sx={{ display: "none" }}
        InputProps={{
          readOnly: true,
        }}
      />
      <InputValidation
        inputName={`costList[${index}].stndDscntPctg`}
        required={true}
        errorMessage="llll"
        // sx={{ display: "none" }}
        InputProps={{
          readOnly: true,
        }}
        // sx={{
        //   // width: 150,
        //   ".MuiOutlinedInput-input": {
        //     textAlign: "end",
        //   },
        //   "&.MuiTextField-root": {
        //     backgroundColor: "#F1F3F5",
        //   },
        //   ".MuiOutlinedInput-input:read-only": {
        //     textFillColor: disCountChk === true ? "#f10505" : "#000000",
        //   },
        // }}
        // InputProps={{
        //   readOnly: true,
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <Typography variant="body2" sx={{ color: "black" }}>
        //         %
        //       </Typography>
        //     </InputAdornment>
        //   ),
        // }}
      />
      {errors.costList?.[index]?.stndDscntPctg && (
        <Typography variant="body2" color={cjbsTheme.palette.warning.main}>
          stndDscntPctg 미입력.
        </Typography>
      )}
    </>
  );
};

export default StndDscntPctg;
