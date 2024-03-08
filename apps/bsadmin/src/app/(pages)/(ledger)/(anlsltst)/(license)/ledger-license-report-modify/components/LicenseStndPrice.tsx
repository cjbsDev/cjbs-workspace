import React, {useEffect, useState} from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { cjbsTheme, formatNumberWithCommas, InputValidation } from "cjbsDSTM";
import {InputAdornment, Stack, Typography} from "@mui/material";
import {POST} from "api";
import {toast} from "react-toastify";

const LicenseStndPrice = (props:any) => {
  const { index } = props;
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const { getValues, setValue, control, watch } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  // const srvcTypeMcVal = sampleValue[index].srvcTypeMc;
  // const sampleSizeVal = sampleValue[index].sampleSize;
  const srvcTypeMcVal = watch(`sample[${index}].srvcTypeMc`);
  const sampleSizeVal = watch(`sample[${index}].sampleSize`);
  const chkStndPrice = watch(`sample[${index}].chkStndPrice`);
  // console.log("srvcTypeMcVal", srvcTypeMcVal);
  // console.log("sampleSizeVal", sampleSizeVal);
  // console.log("chkStndPrice", chkStndPrice);

  useEffect(() => {
    if(isFirst) {
      setIsFirst(false);
    } else {
      if(sampleSizeVal !== undefined && sampleSizeVal > 0) {
        callStndPrice();
      } else {
        setValue(`sample.[${index}].sampleSize`, 0);
        setValue(`sample.[${index}].stndPrice`, 0);
      }
    }

  }, [srvcTypeMcVal, sampleSizeVal]);

  // 기준가 조회하기
  const callStndPrice = async () => {
    const bodyData = [
      {
        "anlsTypeMc": getValues("anlsTypeMc"),
        "depthMc": getValues("depthMc"),
        "pltfMc": getValues("pltfMc"),
        "srvcCtgrMc": getValues("srvcCtgrMc"),
        "sampleSize": sampleSizeVal,
        "srvcTypeMc": srvcTypeMcVal,
      }
    ];
    console.log("************", bodyData);

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      console.log("************", response.data);
      const resData = response.data;
      if (response.success) {
        // if(chkStndPrice !== resData[0].stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")){
          if(resData[0].stndPrice === 'N/A'){
            setValue(`sample.[${index}].stndPrice`, 'N/A');
            setValue(`sample.[${index}].dscntPctg`, 'N/A');
            setValue(`sample.[${index}].chkStndPrice`, 'N/A');
          } else {
            setValue(`sample.[${index}].stndPrice`, resData[0].stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            setValue(`sample.[${index}].chkStndPrice`, resData[0].stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            setValue(`sample.[${index}].dscntPctg`, 0);
          }
          setValue(`sample.[${index}].stndCode`, resData[0].stndCode);
          setValue(`sample.[${index}].stndDscntPctg`, resData[0].stndDscntPctg);
          setValue(`sample.[${index}].unitPrice`, 0);
          setValue(`sample.[${index}].supplyPrice`, 0);
          setValue(`sample.[${index}].vat`, 0);
        // }

      } else if (response.code == "STND_PRICE_NOT_EXIST") {
        toast(response.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  }


  return (
    <>
      <InputValidation
        inputName={`sample.[${index}].chkStndPrice`}
        required={false}
        sx={{
          display: 'none',
        }}
      />
      <InputValidation
        inputName={`sample.[${index}].stndPrice`}
        required={true}
        fullWidth={true}
        sx={{
          // width: 150,
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
          "&.MuiTextField-root" : {
            backgroundColor : "#F1F3F5",
          },
          // display: watchAddType === "button" ? 'none' : 'block',
        }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="body2" sx={{ color: "black" }}>
                원
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <InputValidation
        inputName={`sample.[${index}].stndCode`}
        required={true}
        sx={{
          width: 150,
          display: 'none'
        }}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  );
};

export default LicenseStndPrice;
