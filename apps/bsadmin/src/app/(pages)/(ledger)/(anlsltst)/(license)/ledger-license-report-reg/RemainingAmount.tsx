import React, { useEffect } from "react";
import { InputAdornment, Typography } from "@mui/material";
import { formatNumberWithCommas, InputValidation } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";

const RemainingAmount = () => {
  const { control, getValues, setValue, watch } = useFormContext();

  const rmnPrePymtPrice = watch("rmnPrePymtPrice");
  const totalPrice = watch("totalPrice");
  // const totalCnt = watch("sampleSize");
  // const totalSupplyPrice = watch("totalSupplyPrice");
  // const totalVat = watch("vat");

  console.log("totalPrice", totalPrice);
  console.log("rmnPrePymtPrice", Number(rmnPrePymtPrice.replaceAll(",", "")));

  // const getSupplyTotalValue = watch("totalSupplyPrice");
  // const getVat = watch("vat");
  // console.log("getVat^^^^", getVat);
  const remainingAmount =
    totalPrice - Number(rmnPrePymtPrice.replaceAll(",", ""));

  const isRemainingAmount = remainingAmount > 0 ? remainingAmount : 0;

  useEffect(() => {
    setValue("remainingAmount", formatNumberWithCommas(isRemainingAmount));
  }, [setValue, totalPrice, isRemainingAmount]);

  // console.log("totalSupplyPrice", totalSupplyPrice);
  // console.log("totalVat", totalVat);

  // useEffect(() => {
  //
  //
  //   if (rmnPrePymtPrice > 0) {
  //     // 선결제 금액이 있는경우
  //     if (rmnPrePymtPrice >= totalPrice) {
  //       // 선결제 비용이 합계금액보다 큰경우
  //       setValue("remainingAmount", "0");
  //       setValue(
  //         "settlementCost",
  //         totalPrice
  //           .toFixed(0)
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //       );
  //     } else if (rmnPrePymtPrice < totalPrice) {
  //       // 선결제 비용이 합계금액보다 적은경우
  //       setValue(
  //         "remainingAmount",
  //         (totalPrice - rmnPrePymtPrice)
  //           .toFixed(0)
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //       );
  //       setValue(
  //         "settlementCost",
  //         rmnPrePymtPrice
  //           .toFixed(0)
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //       );
  //     }
  //     // setSettlement(true);
  //   } else {
  //     // 선결제 금액이 없는경우
  //     setValue(
  //       "remainingAmount",
  //       totalPrice
  //         .toFixed(0)
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //     );
  //     // setValue("", sumTotVat);
  //     // setSettlement(false);
  //   }
  // }, [setValue, totalPrice, rmnPrePymtPrice]);

  // const rmnPrePymtPrice = Number(
  //   getValues("rmnPrePymtPrice").replaceAll(",", ""),
  // );
  // if (rmnPrePymtPrice > 0) {
  //   // 선결제 금액이 있는경우
  //   if (rmnPrePymtPrice >= totalPrice) {
  //     // 선결제 비용이 합계금액보다 큰경우
  //     setValue("remainingAmount", "0");
  //     setValue(
  //       "settlementCost",
  //       totalPrice
  //         .toFixed(0)
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //     );
  //   } else if (rmnPrePymtPrice < totalPrice) {
  //     // 선결제 비용이 합계금액보다 적은경우
  //     setValue(
  //       "remainingAmount",
  //       (totalPrice - rmnPrePymtPrice)
  //         .toFixed(0)
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //     );
  //     setValue(
  //       "settlementCost",
  //       rmnPrePymtPrice
  //         .toFixed(0)
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //     );
  //   }
  //   // setSettlement(true);
  // } else {
  //   // 선결제 금액이 없는경우
  //   setValue(
  //     "remainingAmount",
  //     totalPrice
  //       .toFixed(0)
  //       .toString()
  //       .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //   );
  //   // setValue("", sumTotVat);
  //   // setSettlement(false);
  // }

  return (
    <>
      <InputValidation
        inputName="remainingAmount"
        required={true}
        sx={{
          width: "100%",
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
          "&.MuiTextField-root": {
            backgroundColor: "#F1F3F5",
          },
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
    </>
  );
};

export default RemainingAmount;
