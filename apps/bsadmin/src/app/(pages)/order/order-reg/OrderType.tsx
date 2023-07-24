import React from "react";
import fetcher from "../../../func/fetcher";
import useSWR from "swr";
import axios from "axios";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

const OrderType = () => {
  const methods = useFormContext();
  const { control } = methods;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/value?topValue=order&midValue=type`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("OrderType List", data.data.order.type);
  const orderTypeData = data.data.order.type;

  return (
    <Stack>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "eeeeeeeeee",
          },
        }}
        name="orderTypeCc"
        render={({ field }) => (
          <RadioGroup {...field} value={undefined} row>
            {orderTypeData.map((item) => {
              const { codeNm, uniqueCode } = item;
              return (
                <FormControlLabel
                  key={uniqueCode}
                  value={uniqueCode}
                  control={<Radio />}
                  label={codeNm}
                />
              );
            })}
          </RadioGroup>
        )}
      />
      {methods.formState.errors.orderTypeCc?.type === "required" && (
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.warning.main }}
        >
          오더 타입을 선택해 주세요
        </Typography>
      )}
    </Stack>
  );
};

export default OrderType;
