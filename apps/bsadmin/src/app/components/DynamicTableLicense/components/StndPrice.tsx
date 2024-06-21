import React, { useEffect } from "react";
import InputPrice from "../../../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/InputPrice";
import { POST } from "api";
import { toast } from "react-toastify";
import { useFormContext, useWatch } from "react-hook-form";
import { InputValidation } from "cjbsDSTM";
import { IconButton, Stack } from "@mui/material";
import MyIcon from "icon/MyIcon";

interface StndPriceProps {
  fieldName: string;
  index: number;
}

const StndPrice = ({ fieldName, index }: StndPriceProps) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  console.log("productValue%%%%%%%%", productValue);

  // useEffect(() => {
  //   callStndPrice();
  // }, []);

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
        // setValue(`costList[${index}].unitPrice`, "0");
        // setValue(`costList[${index}].supplyPrice`, "0");
        // setValue(`costList[${index}].vat`, "0");
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
    <Stack direction="row" spacing={1}>
      <InputValidation
        inputName={`costList[${index}].stndPrice`}
        disabled={true}
        placeholder="수량을 입력후 기준가를 조회 하세요."
      />
      <IconButton onClick={callStndPrice} color="primary">
        <MyIcon icon="search" size={18} />
      </IconButton>

      {/*<InputPrice inputName={`sample[${index}].stndPrice`} />*/}
    </Stack>
  );
};

export default StndPrice;
