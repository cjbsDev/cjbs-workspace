import React, { useEffect } from "react";
import {
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  formatNumberWithCommas,
  InputValidation,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import { useFormContext, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import VatValue from "../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/VatValue";
import TotalPrice from "../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/TotalPrice";
import InputPrice from "../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/InputPrice";
import { addDays, subDays } from "date-fns";

const DynamicSumTableLicense = () => {
  const { control, setValue, getValues, watch } = useFormContext();
  // const getPymtInfoCc = watch("pymtInfoCc");
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

export default DynamicSumTableLicense;
