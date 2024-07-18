import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { addDays, subDays } from "date-fns";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { formatNumberWithCommas, SingleDatePicker, TD, TH } from "cjbsDSTM";
import VatValue from "./VatValue";
import TotalPrice from "./TotalPrice";

const Index = () => {
  const { control, setValue, getValues, watch } = useFormContext();
  const rmnPrePymtPrice = Number(
    getValues("rmnPrePymtPrice").replaceAll(",", ""),
  );

  console.log("rmnPrePymtPrice", rmnPrePymtPrice);

  const fieldArrayName = "costList";
  const productValue =
    useWatch({
      name: fieldArrayName,
      control,
    }) || []; // productValue가 undefined일 경우 빈 배열을 기본값으로 사용

  // console.log("Product Sum Vaule ==>>", productValue);

  const totalCnt = productValue.reduce(
    (sum, item) => sum + (item.sampleSize || 0),
    0,
  );

  const totalSupplyPrice = productValue.reduce(
    (sum, item) => sum + (item.supplyPrice || 0), // item.supplyPrice가 undefined일 경우 0을 기본값으로 사용
    0,
  );

  const vatValue = Math.round(totalSupplyPrice * 0.1);
  const supplyPlusVatTotalValue = totalSupplyPrice + vatValue;

  useEffect(() => {
    setValue("sampleSize", totalCnt);
    setValue("totalSupplyPrice", totalSupplyPrice);
    setValue("vat", vatValue);
    setValue("totalPrice", supplyPlusVatTotalValue);

    if (rmnPrePymtPrice > 0) {
      // 선결제 금액이 있는경우
      if (rmnPrePymtPrice >= supplyPlusVatTotalValue) {
        // 선결제 비용이 합계금액보다 큰경우
        setValue("remainingAmount", "0");
        setValue(
          "settlementCost",
          supplyPlusVatTotalValue,
          // .toFixed(0)
          // .toString()
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        );
      } else if (rmnPrePymtPrice < supplyPlusVatTotalValue) {
        // 선결제 비용이 합계금액보다 적은경우
        setValue(
          "remainingAmount",
          supplyPlusVatTotalValue - rmnPrePymtPrice,
          // .toFixed(0)
          // .toString()
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        );
        setValue(
          "settlementCost",
          rmnPrePymtPrice,
          // .toFixed(0)
          // .toString()
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        );
      }
      // setSettlement(true);
    } else {
      // 선결제 금액이 없는경우
      setValue(
        "remainingAmount",
        supplyPlusVatTotalValue,
        // .toFixed(0)
        // .toString()
        // .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      );
      // setSettlement(false);
    }
  }, [setValue, totalCnt, totalSupplyPrice, vatValue, supplyPlusVatTotalValue]);

  const standDate = () => {
    // const now = new Date("2024-03-01");
    const now = new Date();
    const nowDate: number = now.getDate();
    let startDate;
    let endDate;
    // const nowDate= 5;
    console.log("nowDate : ", nowDate);
    let startMonth: number = 0;
    let endMonth: number = 0;
    if (nowDate < 6) {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth() + 2));
      endMonth = endDate.getMonth();
    } else {
      startDate = new Date(now);
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth() + 1));
      endMonth = endDate.getMonth();
    }
    console.log("startMonth : ", startMonth);
    console.log("endMonth : ", endMonth);

    return [
      {
        start: subDays(new Date(startDate.setDate(1)), 1),
        end: addDays(new Date(endDate.setDate(5)), 0),
      },
    ];
  };

  if (productValue.length === 0) {
    return null;
  }

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>분석일</TH>
            <TD>
              <SingleDatePicker
                inputName="anlsDttm"
                required={true}
                includeDateIntervals={standDate()}
              />
            </TD>
            <TH sx={{ width: "15%" }}>총 수량</TH>
            <TD>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {formatNumberWithCommas(totalCnt)}
                </Typography>
                <Typography variant="body2">개</Typography>
              </Stack>
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>총 공급가액</TH>
            <TD align="right">
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {formatNumberWithCommas(totalSupplyPrice)}
                </Typography>
                <Typography variant="body2">원</Typography>
              </Stack>
            </TD>
            <TH sx={{ width: "15%" }}>부가세</TH>
            <TD align="right">
              <VatValue />
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>합계금액</TH>
            <TD align="right">
              <TotalPrice />
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Index;
