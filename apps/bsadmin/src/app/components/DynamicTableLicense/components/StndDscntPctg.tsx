import React, { useEffect, useState } from "react";
import { InputValidation } from "cjbsDSTM";
import { InputAdornment, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

interface StndDscntPctgProps {
  fieldName: string;
  index: number;
}

const StndDscntPctg = ({ fieldName, index }: StndDscntPctgProps) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  console.log("##########", productValue);

  const unitPrice = productValue[index].unitPrice;
  const stndPrice = Number(productValue[index].stndPrice.replaceAll(",", ""));

  console.log("&&&&&&&&", unitPrice, stndPrice);

  const dscntPctg = (stndPrice - unitPrice) / stndPrice;
  console.log("dscntPctg", Math.round(dscntPctg * 100));

  // console.log(">>>>>>>>", Math.round(Number(dscntPctg)));

  const [disCountChk, setDisCountChk] = useState<boolean>(false);
  const [stndSupplyPrice, setStndSupplyPrice] = useState<number>(0);
  const [sampleSizeState, setSampleSizeState] = useState<number>(0);

  useEffect(() => {
    setValue(`costList[${index}].dscntPctg`, Math.round(dscntPctg * 100));
  }, [setValue, dscntPctg]);

  // const handleOnBlurUnitPrice = (index) => {
  //   console.log("handleOnBlurUnitPrice ==>>", index);
  //   const unitPrice = Number(
  //     getValues(`costList[${index}].unitPrice`).replaceAll(",", ""),
  //   );
  //   const sampleSize = getValues(`costList[${index}].sampleSize`);
  //   const stndPrice = Number(
  //     getValues(`costList[${index}].stndPrice`).replaceAll(",", ""),
  //   );
  //   const stndDscntPctg = Number(watch(`costList[${index}].stndDscntPctg`));
  //   // console.log("unitPrice", unitPrice);
  //   // console.log("sampleSize", sampleSize);
  //   // console.log("stndPrice", stndPrice);
  //   // console.log("stndPricestndDscntPctg", stndDscntPctg);
  //   if (sampleSize > 0) {
  //     setValue(
  //       `costList[${index}].supplyPrice`,
  //       (unitPrice * sampleSize)
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //     );
  //     setValue(
  //       `costList[${index}].vat`,
  //       (unitPrice * sampleSize * 0.1)
  //         .toFixed(0)
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //     );
  //     setStndSupplyPrice(unitPrice * sampleSize);
  //
  //     let disCountPercent: number = 0;
  //     if (unitPrice >= 0) {
  //       if (isNaN(stndPrice) || stndPrice === 0) {
  //         disCountPercent = 0;
  //         setValue(`costList[${index}].dscntPctg`, "N/A");
  //       } else {
  //         if (stndPrice > unitPrice) {
  //           disCountPercent =
  //             Math.round(((stndPrice - unitPrice) / stndPrice) * 100 * 100) /
  //             100.0;
  //           setValue(`costList[${index}].dscntPctg`, disCountPercent);
  //         } else if (stndPrice < unitPrice) {
  //           disCountPercent =
  //             Math.round(
  //               (((unitPrice - stndPrice) / stndPrice) * 100 + 100) * 100,
  //             ) / 100.0;
  //           setValue(`costList[${index}].dscntPctg`, disCountPercent);
  //         } else if (stndPrice == unitPrice) {
  //           disCountPercent = 0;
  //           setValue(`costList[${index}].dscntPctg`, "0");
  //         }
  //       }
  //     } else {
  //       setValue(`costList[${index}].dscntPctg`, "-");
  //       setValue(`costList[${index}].isExc`, "N");
  //     }
  //
  //     if (disCountPercent > stndDscntPctg) {
  //       if (disCountPercent > 100) {
  //         setValue(`costList[${index}].isExc`, "N");
  //         setDisCountChk(false);
  //       } else {
  //         setValue(`costList[${index}].isExc`, "Y");
  //         setDisCountChk(true);
  //       }
  //     } else {
  //       setValue(`costList[${index}].isExc`, "N");
  //       setDisCountChk(false);
  //     }
  //   }
  //   // 모든계산이 끝나면 단가에 콤마추가
  //   setValue(
  //     `costList[${index}].unitPrice`,
  //     unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //   );
  //   // 합계금액이 달라졌을경우 월비용에 대한 값이 초기화 된다.
  //   // setIsMonthly(false);
  // };

  return (
    <>
      <InputValidation
        inputName={`costList[${index}].dscntPctg`}
        required={true}
        // sx={{ width: 100, display: "none" }}
      />
      <InputValidation
        inputName={`costList[${index}].isExc`}
        required={true}
        // sx={{ width: 100, display: "none" }}
      />
      <InputValidation
        inputName={`costList[${index}].stndDscntPctg`}
        required={true}
        fullWidth={true}
        sx={{
          // width: 150,
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
          "&.MuiTextField-root": {
            backgroundColor: "#F1F3F5",
          },
          ".MuiOutlinedInput-input:read-only": {
            textFillColor: disCountChk === true ? "#f10505" : "#000000",
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

export default StndDscntPctg;
