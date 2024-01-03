import React from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { InputValidation, TD, TH } from "cjbsDSTM";
import { useFormContext, useWatch } from "react-hook-form";

const DynamicSumTable = () => {
  const { control, watch } = useFormContext();
  const productValue = useWatch({
    name: "detailList",
    control,
  });

  console.log("Product Sum Vaule ==>>", productValue);

  // Helper function to parse the number and remove commas
  // const parseNumber = (str) => parseInt(str.replace(/,/g, ""), 10);
  //
  // // Calculating the total sum for each field
  // const totalQuantity = productValue.reduce(
  //   (sum, item) => sum + parseNumber(item.qnty),
  //   0,
  // );
  // const totalUnitPrice = productValue.reduce(
  //   (sum, item) => sum + parseNumber(item.unitPrice),
  //   0,
  // );
  // const totalSupplyPrice = productValue.reduce(
  //   (sum, item) => sum + parseNumber(item.supplyPrice),
  //   0,
  // );
  //
  // console.log(`Total Quantity: ${totalQuantity}`);
  // console.log(`Total Unit Price: ${totalUnitPrice}`);
  // console.log(`Total Supply Price: ${totalSupplyPrice}`);

  // const totalQuantity = productValue.reduce(
  //   (total, item) => Number(total) + Number(item.qnty),
  //   0,
  // );
  //
  // const totalSupplyPrice = productValue.reduce(
  //   (total, item) => Number(total) + Number(item.supplyPrice),
  //   0,
  // );
  //
  // const totalUnitPrice = productValue.reduce(
  //   (total, item) => Number(total) + Number(item.unitPrice),
  //   0,
  // );
  //
  // console.log("총 수량", totalQuantity);
  // console.log("총 공급가액", totalSupplyPrice);
  // console.log("총 수량", totalUnitPrice);

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "10%" }}>총 공급가액</TH>
            <TD sx={{ width: "23%" }}>
              {/*<InputValidation*/}
              {/*  inputName="totalSupplyPrice"*/}
              {/*  required={true}*/}
              {/*  errorMessage="dsssdfsdf"*/}
              {/*  InputProps={{*/}
              {/*    readOnly: true,*/}
              {/*  }}*/}
              {/*  disabled={true}*/}
              {/*/>*/}
            </TD>
            <TH sx={{ width: "10%" }}>부가세</TH>
            <TD sx={{ width: "23%" }}>
              {/*<InputValidation*/}
              {/*  inputName="totalPrice"*/}
              {/*  required={true}*/}
              {/*  errorMessage="dsssdfsdf"*/}
              {/*  InputProps={{*/}
              {/*    readOnly: true,*/}
              {/*  }}*/}
              {/*  disabled={true}*/}
              {/*/>*/}
            </TD>
            <TH sx={{ width: "10%" }}>합계금액</TH>
            <TD sx={{ width: "23%" }}>
              {/*<InputValidation*/}
              {/*  inputName="totalPrice"*/}
              {/*  required={true}*/}
              {/*  errorMessage="dsssdfsdf"*/}
              {/*  InputProps={{*/}
              {/*    readOnly: true,*/}
              {/*  }}*/}
              {/*  disabled={true}*/}
              {/*/>*/}
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicSumTable;
