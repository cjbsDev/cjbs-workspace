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
import {formatNumberWithCommas, InputValidation, SingleDatePicker, TD, TH} from "cjbsDSTM";
import { useFormContext, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import {standDate} from "../func/standDate";
import {addDays, subDays} from "date-fns";

const DynamicSumAnlsltstTable = () => {
  const { control, setValue, getValues } = useFormContext();
  const productValue =
    useWatch({
      name: "sample",
      control,
    }) || []; // productValue가 undefined일 경우 빈 배열을 기본값으로 사용

  // console.log("Product Sum Vaule ==>>", productValue);
  const totalCnt = productValue.reduce(
    (sum, item) => sum + (item.sampleSize || 0), // item.supplyPrice가 undefined일 경우 0을 기본값으로 사용
    0
  );
  const totalSupplyPrice = productValue.reduce(
    (sum, item) => sum + (item.supplyPrice || 0), // item.supplyPrice가 undefined일 경우 0을 기본값으로 사용
    0
  );

  const vatValue = totalSupplyPrice * 0.1;
  const supplyPlusVatTotalValue = totalSupplyPrice + vatValue;

  useEffect(() => {
    setValue("totalSupplyPrice", totalSupplyPrice);
    setValue("vat", vatValue);
    setValue("totalPrice", supplyPlusVatTotalValue);
    setValue("totalPriceVal", supplyPlusVatTotalValue);
    setValue("totalCnt", totalCnt);
  }, [setValue, totalCnt, totalSupplyPrice, vatValue, supplyPlusVatTotalValue]);

  const standDate = () => {
    // const now = new Date("2024-03-01");
    const now = new Date();
    const nowDate: number = now.getDate();
    let startDate;
    let endDate;
    // const nowDate= 5;
    console.log('nowDate : ', nowDate)
    let startMonth: number = 0;
    let endMonth: number = 0;
    if(nowDate < 6) {
      startDate = new Date(now.setMonth(now.getMonth()-1));
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth()+2));
      endMonth = endDate.getMonth();

    } else {
      startDate = new Date(now);
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth()+1));
      endMonth = endDate.getMonth();
    }
    console.log('startMonth : ', startMonth);
    console.log('endMonth : ', endMonth);

    return [
      {
        start: subDays(new Date(startDate.setDate(1)), 1),
        end: addDays(new Date(endDate.setDate(5)), 0),
      },
    ];
  };

  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>분석일</TH>
            <TD sx={{ width: "35%" }}>
              <SingleDatePicker
                inputName="anlsDttm"
                required={true}
                includeDateIntervals={standDate()}
              />
            </TD>
            <TH sx={{ width: "15%" }}>총 수량</TH>
            <TD sx={{ width: "35%" }}>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {formatNumberWithCommas(totalCnt)}
                </Typography>
                <Typography variant="body2">개</Typography>
              </Stack>
              <InputValidation
                inputName="totalCnt"
                required={true}
                // errorMessage="연구책임자를 입력해 주세요."
                sx={{ width: "100%", display: "none" }}
              />
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>총 공급가액</TH>
            <TD sx={{ width: "35%" }}>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {formatNumberWithCommas(totalSupplyPrice)}
                </Typography>
                <Typography variant="body2">원</Typography>
              </Stack>
              <InputValidation
                inputName="totalSupplyPrice"
                required={true}
                // errorMessage="아이디(이메일) 입력해 주세요."
                sx={{ width: "100%", display: "none" }}
              />
            </TD>
            <TH sx={{ width: "15%" }}>부가세</TH>
            <TD sx={{ width: "35%" }}>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {/*{formatNumberWithCommas(vatValue)}*/}
                  <NumericFormat
                    value={vatValue}
                    decimalScale={1}
                    thousandSeparator
                    fixedDecimalScale
                    displayType="text"
                  />
                </Typography>
                <Typography variant="body2">원</Typography>
              </Stack>
              <InputValidation
                inputName="vat"
                required={true}
                // errorMessage="아이디(이메일) 입력해 주세요."
                sx={{ width: "100%", display: "none" }}
              />
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>합계금액</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {formatNumberWithCommas(supplyPlusVatTotalValue)}
                </Typography>
                <Typography variant="body2">원</Typography>
              </Stack>
              <InputValidation
                inputName="totalPrice"
                required={true}
                // errorMessage="아이디(이메일) 입력해 주세요."
                sx={{
                  width: "100%",
                  display: "none"
                }}
              />
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicSumAnlsltstTable;
