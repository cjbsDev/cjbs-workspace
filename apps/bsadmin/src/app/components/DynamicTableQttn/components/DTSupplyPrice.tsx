import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import {
  cjbsTheme,
  InputEAType,
  InputPriceType,
  formatNumberWithCommas,
} from "cjbsDSTM";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";

interface SupplyPriceProps {
  inputName: string;
  fieldName: string;
  index: number;
  errors: string;
}

const DTSupplyPrice = ({
  fieldName,
  inputName,
  index,
  errors,
}: SupplyPriceProps) => {
  const { control, setValue, watch } = useFormContext();

  // 공급가액
  // 수량 x 단가 = 공급가액 세팅
  // 공급가액을 변경은 가능하나 10원 이상은 변경 불가
  const productValue = useWatch({ name: fieldName, control });
  const sampleSize =
    productValue[index]?.sampleSize === undefined
      ? 0
      : productValue[index]?.sampleSize;
  const unitPrice =
    productValue[index]?.unitPrice === undefined
      ? 0
      : productValue[index]?.unitPrice;

  const supplyPrice = sampleSize * unitPrice;

  useEffect(() => {
    if (unitPrice > 0 && sampleSize > 0) {
      setValue(inputName, supplyPrice);
    }

    if (unitPrice === 0 && sampleSize === 0) {
      setValue(inputName, 0);
    }
    if (unitPrice === 0 && sampleSize > 0) {
      setValue(inputName, 0);
    }
    if (unitPrice > 0 && sampleSize === 0) {
      setValue(inputName, 0);
    }
  }, [sampleSize, unitPrice, setValue]);

  const sampleValue = useWatch({
    name: "productDetailList",
    control,
  });

  const chkSupplyPrice =
    watch(`productDetailList[${index}].unitPrice`) *
    watch(`productDetailList[${index}].sampleSize`);
  const supplyPriceWatch = watch(`productDetailList[${index}].supplyPrice`);

  const handleOnFocus = (event: any) => {
    event.target.select();
  };

  const handleOnBlurSupplyPrice = () => {
    if (supplyPriceWatch - chkSupplyPrice > 10) {
      toast(
        <>
          <Typography variant="body2">
            금액이 10원 이상 변경 되었습니다.
          </Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(`productDetailList[${index}].supplyPrice`, chkSupplyPrice);
    } else if (supplyPriceWatch - chkSupplyPrice < -10) {
      toast(
        <>
          <Typography variant="body2">
            금액이 10원 이상 변경 되었습니다.
          </Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(`productDetailList[${index}].supplyPrice`, chkSupplyPrice);
    }
  };

  return (
    // <Stack direction="row" spacing={0.5} justifyContent="flex-end">
    //   <Typography variant="body2">
    //     {formatNumberWithCommas(supplyPrice)}
    //   </Typography>
    //   <Typography variant="body2">원</Typography>
    // </Stack>
    <>
      <Controller
        name={`productDetailList[${index}].supplyPrice`}
        control={control}
        rules={{ required: "공급가액을 입력해야 합니다." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumericFormat
            defaultValue={0}
            value={value}
            thousandSeparator={true}
            onValueChange={(values) => {
              onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
            }}
            onBlur={handleOnBlurSupplyPrice}
            onFocus={handleOnFocus}
            customInput={InputPriceType}
          />
        )}
      />
      {errors.productDetailList?.[index]?.supplyPrice && (
        <Typography variant="body2" color={cjbsTheme.palette.warning.main}>
          공급가액을 입력 해주세요.
        </Typography>
      )}
    </>
  );
};

export default DTSupplyPrice;
