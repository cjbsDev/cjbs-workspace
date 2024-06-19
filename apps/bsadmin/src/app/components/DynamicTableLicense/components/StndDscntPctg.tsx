import React, { useState } from "react";
import { InputValidation } from "cjbsDSTM";
import { InputAdornment, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface StndDscntPctgProps {
  index: number;
}

const StndDscntPctg = ({ index }: StndDscntPctgProps) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const [disCountChk, setDisCountChk] = useState<boolean>(false);
  const [stndSupplyPrice, setStndSupplyPrice] = useState<number>(0);
  const [sampleSizeState, setSampleSizeState] = useState<number>(0);

  const handleOnBlurUnitPrice = (index) => {
    console.log("handleOnBlurUnitPrice ==>>", index);
    const unitPrice = Number(
      getValues(`sample.[${index}].unitPrice`).replaceAll(",", ""),
    );
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    const stndPrice = Number(
      getValues(`sample.[${index}].stndPrice`).replaceAll(",", ""),
    );
    const stndDscntPctg = Number(watch(`sample.[${index}].stndDscntPctg`));
    // console.log("unitPrice", unitPrice);
    // console.log("sampleSize", sampleSize);
    // console.log("stndPrice", stndPrice);
    // console.log("stndPricestndDscntPctg", stndDscntPctg);
    if (sampleSize > 0) {
      setValue(
        `sample.[${index}].supplyPrice`,
        (unitPrice * sampleSize)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      );
      setValue(
        `sample.[${index}].vat`,
        (unitPrice * sampleSize * 0.1)
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      );
      setStndSupplyPrice(unitPrice * sampleSize);

      let disCountPercent: number = 0;
      if (unitPrice >= 0) {
        if (isNaN(stndPrice) || stndPrice === 0) {
          disCountPercent = 0;
          setValue(`sample.[${index}].dscntPctg`, "N/A");
        } else {
          if (stndPrice > unitPrice) {
            disCountPercent =
              Math.round(((stndPrice - unitPrice) / stndPrice) * 100 * 100) /
              100.0;
            setValue(`sample.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice < unitPrice) {
            disCountPercent =
              Math.round(
                (((unitPrice - stndPrice) / stndPrice) * 100 + 100) * 100,
              ) / 100.0;
            setValue(`sample.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice == unitPrice) {
            disCountPercent = 0;
            setValue(`sample.[${index}].dscntPctg`, "0");
          }
        }
      } else {
        setValue(`sample.[${index}].dscntPctg`, "-");
        setValue(`sample.[${index}].isExc`, "N");
      }

      if (disCountPercent > stndDscntPctg) {
        if (disCountPercent > 100) {
          setValue(`sample.[${index}].isExc`, "N");
          setDisCountChk(false);
        } else {
          setValue(`sample.[${index}].isExc`, "Y");
          setDisCountChk(true);
        }
      } else {
        setValue(`sample.[${index}].isExc`, "N");
        setDisCountChk(false);
      }
    }
    // 모든계산이 끝나면 단가에 콤마추가
    setValue(
      `sample.[${index}].unitPrice`,
      unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    );
    // 합계금액이 달라졌을경우 월비용에 대한 값이 초기화 된다.
    // setIsMonthly(false);
  };

  return (
    <>
      <InputValidation
        inputName={`sample.[${index}].dscntPctg`}
        required={true}
        // sx={{ width: 100, display: "none" }}
      />
      <InputValidation
        inputName={`sample.[${index}].isExc`}
        required={true}
        // sx={{ width: 100, display: "none" }}
      />
      <InputValidation
        inputName={`sample.[${index}].stndDscntPctg`}
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
