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

  const callStndPrice = async (index: number) => {
    const bodyData = [
      {
        anlsTypeMc: getValues(`productDetailList.[${index}].anlsTypeMc`),
        depthMc: getValues(`productDetailList.[${index}].depthMc`),
        pltfMc: getValues(`productDetailList.[${index}].pltfMc`),
        sampleSize: getValues(`productDetailList.[${index}].sampleSize`),
        srvcCtgrMc: getValues(`productDetailList.[${index}].srvcCtgrMc`),
        srvcTypeMc: getValues(`productDetailList.[${index}].srvcTypeMc`),
      },
    ];

    // 견적서에서 기준가를 조회시 srvcCtgrMc 는 srvcTypeMc 값을 보낸다고함. // 로라 확인
    // 20240130 : Analysis 인 경우 BS_0100005001, License 인 경우 BS_0100005002
    console.log("************", bodyData);

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      const resData = response.data;
      console.log("PRICE response.data", resData);
      if (response.success) {
        // console.log("성공");
        // 기준가, 기준할인율,

        if (resData[0].stndPrice === "N/A") {
          // console.log("여기에 세팅되어야 댐 ");
          setValue(`productDetailList.[${index}].stndPrice`, "N/A");
          setValue(`productDetailList.[${index}].dscntPctg`, "N/A");
        } else {
          setValue(
            `productDetailList.[${index}].stndPrice`,
            resData[0].stndPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          );
          setValue(
            `productDetailList.[${index}].dscntPctg`,
            resData[0].stndDscntPctg,
          );
          setValue(
            `productDetailList.[${index}].stndDscntPctg`,
            resData[0].stndDscntPctg,
          );
        }
      } else if (response.code == "STND_PRICE_NOT_EXIST") {
        toast(response.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  // const callStndPrice = async () => {
  //   const bodyData = [
  //     {
  //       anlsTypeMc: getValues("anlsTypeMc"),
  //       depthMc: "BS_0100010001",
  //       pltfMc: getValues("pltfMc"),
  //       sampleSize: getValues(`costList[${index}].sampleSize`),
  //       srvcCtgrMc: getValues("srvcCtgrMc"),
  //       srvcTypeMc: getValues(`costList[${index}].srvcTypeMc`),
  //     },
  //   ];
  //
  //   try {
  //     const response = await POST(`/anls/itst/stnd/price`, bodyData);
  //     const resData = response.data;
  //
  //     console.log("기준가 조회 ==>", response);
  //
  //     if (response.success) {
  //       // console.log("SSSSSSSS", response.data[0].stndDscntPctg);
  //       if (resData[0].stndPrice === "N/A") {
  //         setValue(`costList[${index}].stndPrice`, "N/A");
  //         setValue(`costList[${index}].dscntPctg`, "N/A");
  //       } else {
  //         setValue(
  //           `costList[${index}].stndPrice`,
  //           resData[0].stndPrice
  //             .toString()
  //             .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //         );
  //         setValue(`costList[${index}].dscntPctg`, 0);
  //       }
  //       setValue(`costList[${index}].stndCode`, resData[0].stndCode);
  //       setValue(`costList[${index}].stndDscntPctg`, resData[0].stndDscntPctg);
  //       setValue(`costList[${index}].unitPrice`, "0");
  //       setValue(`costList[${index}].supplyPrice`, "0");
  //       setValue(`costList[${index}].vat`, "0");
  //     } else if (response.code == "STND_PRICE_NOT_EXIST") {
  //       toast(response.message);
  //     } else {
  //       toast("문제가 발생했습니다. 01");
  //     }
  //   } catch (error) {
  //     console.error("request failed:", error);
  //     toast("문제가 발생했습니다. 02");
  //   } finally {
  //   }
  // };

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
