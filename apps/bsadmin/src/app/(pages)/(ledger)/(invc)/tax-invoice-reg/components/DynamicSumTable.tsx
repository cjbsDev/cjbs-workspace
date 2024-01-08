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

const DynamicSumTable = () => {
  const { control, setValue } = useFormContext();
  const productValue = useWatch({
    name: "invcProductDetailList",
    control,
  });

  console.log("Product Sum Vaule ==>>", productValue);

  const totalSupplyPrice = productValue.reduce(
    (sum, item) => sum + item.supplyPrice,
    0,
  );

  // console.log("Total Supply Price", totalSupplyPrice);

  const vatValue = totalSupplyPrice * 0.1;
  const supplyPlusVatTotalValue = totalSupplyPrice + vatValue;

  useEffect(() => {
    setValue("totalSupplyPrice", totalSupplyPrice);
    setValue("vat", vatValue);
    setValue("totalPrice", supplyPlusVatTotalValue);
  }, [setValue, totalSupplyPrice, vatValue, supplyPlusVatTotalValue]);

  // useEffect(() => {
  //   if (totalSupplyPrice > 0 && vatValue > 0 && supplyPlusVatTotalValue > 0) {
  //     setValue("totalSupplyPrice", totalSupplyPrice);
  //     setValue("vat", vatValue);
  //     setValue("totalPrice", supplyPlusVatTotalValue);
  //   }
  // }, [setValue, totalSupplyPrice, vatValue, supplyPlusVatTotalValue]);

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
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
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {/*{formatNumberWithCommas(vatValue)}*/}
                  <NumericFormat
                    value={vatValue}
                    decimalScale={1}
                    fixedDecimalScale
                    displayType="text"
                  />
                </Typography>
                <Typography variant="body2">원</Typography>
              </Stack>
            </TD>
            <TH sx={{ width: "15%" }}>합계금액</TH>
            <TD align="right">
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Typography variant="body2">
                  {formatNumberWithCommas(supplyPlusVatTotalValue)}
                </Typography>
                <Typography variant="body2">원</Typography>
              </Stack>
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicSumTable;
