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
  const formatNumber = (number) => {
    return number.toLocaleString();
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
        selector: (row: { products: string }) => row.products,
      },
      {
        name: "수량",
        selector: (row: { sampleSize: number }) => row.sampleSize,
        width: "150px",
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
