import React, { useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { Box, Stack, Grid, Typography } from "@mui/material";
import { DataTableBase } from "cjbsDSTM";

interface ProdDetailProps {
  productDetailList: string;
}

const ProdDetailList: React.FC<ProdDetailProps> = ({ productDetailList }) => {
  const filteredData = productDetailList;
  console.log("filteredData", filteredData);

  const formatNumber = (number: number | string) => {
    if (number === undefined || number === null) {
      return number; // undefined나 null일 경우
    }
    const num = typeof number === "string" ? parseFloat(number) : number;
    if (isNaN(num)) {
      return number; // 숫자로 변환할 수 없는 경우
    }
    return num.toLocaleString();
  };

  const columns = useMemo(
    () => [
      {
        name: "",
        cell: (row, index) => index + 1,
        width: "50px",
      },
      {
        name: "품명",
        selector: (row: { product: string }) => row.product,
        cell: (row) => row.product,
      },
      {
        name: "수량",
        selector: (row: { sampleSize: number }) => row.sampleSize,
        width: "100px",
        right: true,
        cell: (row) => formatNumber(row.sampleSize),
      },
      {
        name: "단가",
        selector: (row: { unitPrice: number }) => row.unitPrice,
        width: "250px",
        right: true,
        cell: (row) => formatNumber(row.unitPrice),
      },
      {
        name: "공급가액",
        selector: (row: { supplyPrice: number }) => row.supplyPrice,
        width: "250px",
        right: true,
        cell: (row) => formatNumber(row.supplyPrice),
      },

      {
        name: "할인율",
        selector: (row: { dscntPctg: number }) => row.dscntPctg,
        width: "100px",
        right: true,
        cell: (row) => row.dscntPctg ?? "%",
      },
      {
        name: "포함사항",
        selector: (row: { inclMemo: string }) => row.inclMemo,
        cell: (row) => (
          <Typography style={{ whiteSpace: "pre-line" }}>
            {row.inclMemo}
          </Typography>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ mb: 5 }}>
      <DataTableBase
        title={
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">
              품목
              {filteredData && " (총 " + filteredData.length + "건)"}
            </Typography>
          </Stack>
        }
        data={filteredData}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        pagination={false}
        selectableRows={false}
      />
    </Box>
  );
};

export default ProdDetailList;
