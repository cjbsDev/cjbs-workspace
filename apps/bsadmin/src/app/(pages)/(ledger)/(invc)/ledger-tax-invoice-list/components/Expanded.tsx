import React from "react";
import { Box, Typography } from "@mui/material";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";

const Expanded = ({ data }) => {
  const { invcDetailList } = data;
  console.log("Expanded Value ==>>", invcDetailList);
  const footerTotalQuty = invcDetailList
    .map((item: { quty: number }) => item.quty)
    .reduce((acc: number, cur: number) => acc + cur, 0);
  const footerTotalSupplyPrice = invcDetailList
    .map((item: { totalSupplyPrice: number }) => item.totalSupplyPrice)
    .reduce((acc: number, cur: number) => acc + cur, 0);
  const footerTotalVat = invcDetailList
    .map((item: { vat: number }) => item.vat)
    .reduce((acc: number, cur: number) => acc + cur, 0);
  const footerTotalPrice = invcDetailList
    .map((item: { totalPrice: number }) => item.totalPrice)
    .reduce((acc: number, cur: number) => acc + cur, 0);

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        backgroundColor: cjbsTheme.palette.grey["100"],
      }}
    >
      <TableContainer
        sx={{
          backgroundColor: "white",
          border: `1px solid ${cjbsTheme.palette.grey["300"]}`,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>품명</TableCell>
              <TableCell align="right">수량</TableCell>
              <TableCell align="right">공급가액</TableCell>
              <TableCell align="right">부가세</TableCell>
              <TableCell align="right">금액</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invcDetailList.map(
              (item: {
                products: string;
                quty: number;
                totalPrice: number;
                totalSupplyPrice: number;
                vat: number;
                invcProductsUkey: string;
              }) => {
                const {
                  products,
                  quty,
                  totalPrice,
                  totalSupplyPrice,
                  vat,
                  invcProductsUkey,
                } = item;
                return (
                  <TableRow key={invcProductsUkey}>
                    <TableCell>{products}</TableCell>
                    <TableCell align="right">{quty}</TableCell>
                    <TableCell align="right">
                      {formatNumberWithCommas(totalSupplyPrice)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberWithCommas(vat)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberWithCommas(totalPrice)}
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ backgroundColor: cjbsTheme.palette.grey["200"] }}>
              <TableCell align="right" sx={{ color: "black" }}>
                <Typography variant="body2">총 합계</Typography>
              </TableCell>
              <TableCell align="right" sx={{ color: "black" }}>
                <Typography variant="body2">
                  {formatNumberWithCommas(footerTotalQuty)}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ color: "black" }}>
                <Typography variant="body2">
                  {formatNumberWithCommas(footerTotalSupplyPrice)}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ color: "black" }}>
                <Typography variant="body2">
                  {formatNumberWithCommas(footerTotalVat)}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ color: "black" }}>
                <Typography variant="body2">
                  {formatNumberWithCommas(footerTotalPrice)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Expanded;
