import React, { useEffect } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { formatNumberWithCommas, TD, TH } from "cjbsDSTM";
import { useFormContext, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import VatValue from "../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/VatValue";
import TotalPrice from "../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/TotalPrice";
import InputPrice from "../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/InputPrice";

const DynamicSumTableLicense = () => {
  const { control, setValue, getValues, watch } = useFormContext();
  const getPymtInfoCc = watch("pymtInfoCc");
  const productValue =
    useWatch({
      name: "sample",
      control,
    }) || []; // productValue가 undefined일 경우 빈 배열을 기본값으로 사용

  console.log("Product Sum Vaule ==>>", productValue);

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
  useEffect(() => {
    // setValue("totalSupplyPrice", 0);
    // setValue("vat", 0);
    // setValue("totalPrice", 0);
  }, [getPymtInfoCc]);

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH>총 수량</TH>
            <TD>
              {/*totalCnt*/}
              <InputPrice inputName="sampleSize" />
            </TD>
            <TH sx={{ width: "15%" }}>총 공급가액</TH>
            <TD align="right">
              <InputPrice inputName="totalSupplyPrice" />
              {/*<Stack direction="row" spacing={0.5} justifyContent="flex-end">*/}
              {/*  <Typography variant="body2">*/}
              {/*    {formatNumberWithCommas(totalSupplyPrice)}*/}
              {/*  </Typography>*/}
              {/*  <Typography variant="body2">원</Typography>*/}
              {/*</Stack>*/}
            </TD>
            <TH sx={{ width: "15%" }}>부가세</TH>
            <TD align="right">
              {/*<Stack direction="row" spacing={0.5} justifyContent="flex-end">*/}
              {/*  <Typography variant="body2">*/}
              {/*    <NumericFormat*/}
              {/*      value={vatValue}*/}
              {/*      // decimalScale={1}*/}
              {/*      thousandSeparator*/}
              {/*      fixedDecimalScale*/}
              {/*      displayType="text"*/}
              {/*    />*/}
              {/*  </Typography>*/}
              {/*  <Typography variant="body2">원</Typography>*/}
              {/*</Stack>*/}
              <VatValue />
            </TD>
            <TH sx={{ width: "15%" }}>합계금액</TH>
            <TD align="right">
              <TotalPrice />
              {/*<Stack direction="row" spacing={0.5} justifyContent="flex-end">*/}
              {/*  <Typography variant="body2">*/}
              {/*    {formatNumberWithCommas(supplyPlusVatTotalValue)}*/}
              {/*  </Typography>*/}
              {/*  <Typography variant="body2">원</Typography>*/}
              {/*</Stack>*/}
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicSumTableLicense;
