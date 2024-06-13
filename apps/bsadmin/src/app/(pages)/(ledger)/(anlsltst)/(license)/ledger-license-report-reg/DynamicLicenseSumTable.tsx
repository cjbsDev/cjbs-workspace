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
import InputPrice from "./InputPrice";
import VatValue from "./VatValue";
import TotalPrice from "./TotalPrice";

const DynamicLicenseSumTable = () => {
  const { control, setValue, getValues, watch } = useFormContext();
  const productValue =
    useWatch({
      name: "sample",
      control,
    }) || []; // productValue가 undefined일 경우 빈 배열을 기본값으로 사용

  // console.log("Product Sum Vaule ==>>", productValue);

  const totalSupplyPrice = productValue.reduce(
    (sum, item) => sum + (item.supplyPrice || 0), // item.supplyPrice가 undefined일 경우 0을 기본값으로 사용
    0,
  );

  const vatValue = Math.round(totalSupplyPrice * 0.1);
  const supplyPlusVatTotalValue = totalSupplyPrice + vatValue;

  // useEffect(() => {
  //   setValue("totalSupplyPrice", totalSupplyPrice);
  //   setValue("vat", vatValue);
  //   setValue("totalPrice", supplyPlusVatTotalValue);
  // }, [setValue, totalSupplyPrice, vatValue, supplyPlusVatTotalValue]);

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
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

export default DynamicLicenseSumTable;
