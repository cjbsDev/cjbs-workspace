import React from "react";
import { POST } from "api";
import { toast } from "react-toastify";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { cjbsTheme, InputEAType } from "cjbsDSTM";
import { Typography } from "@mui/material";

interface SampleSizeProps {
  fieldName: string;
  index: number;
}

const SampleSize = ({ fieldName, index }: SampleSizeProps) => {
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  // const productValue = useWatch({ name: fieldName, control });
  const callStndPrice = async () => {
    const bodyData = [
      {
        anlsTypeMc: getValues("anlsTypeMc"),
        depthMc: "BS_0100010001",
        pltfMc: getValues("pltfMc"),
        sampleSize: getValues(`costList[${index}].sampleSize`),
        srvcCtgrMc: getValues("srvcCtgrMc"),
        srvcTypeMc: getValues(`costList[${index}].srvcTypeMc`),
      },
    ];

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      const resData = response.data;

      console.log("기준가 조회 ==>", response);

      if (response.success) {
        // console.log("SSSSSSSS", response.data[0].stndDscntPctg);
        if (resData[0].stndPrice === "N/A") {
          setValue(`costList[${index}].stndPrice`, "N/A");
          setValue(`costList[${index}].dscntPctg`, "N/A");
        } else {
          setValue(
            `costList[${index}].stndPrice`,
            resData[0].stndPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          );
          setValue(`costList[${index}].dscntPctg`, 0);
        }
        setValue(`costList[${index}].stndCode`, resData[0].stndCode);
        setValue(`costList[${index}].stndDscntPctg`, resData[0].stndDscntPctg);
        setValue(`costList[${index}].unitPrice`, "0");
        setValue(`costList[${index}].supplyPrice`, "0");
        setValue(`costList[${index}].vat`, "0");
      } else if (response.code == "STND_PRICE_NOT_EXIST") {
        toast(response.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    } finally {
    }
  };

  return (
    <>
      <Controller
        name={`${fieldName}[${index}].sampleSize`}
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <NumericFormat
            defaultValue={0}
            value={value}
            thousandSeparator={true}
            onValueChange={(values) => {
              onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
            }}
            onBlur={callStndPrice}
            customInput={InputEAType}
          />
        )}
      />

      {errors?.costList?.[index]?.sampleSize && (
        <Typography variant="body2" color={cjbsTheme.palette.warning.main}>
          수량을 입력 해주세요
        </Typography>
      )}
    </>
  );
};

export default SampleSize;
