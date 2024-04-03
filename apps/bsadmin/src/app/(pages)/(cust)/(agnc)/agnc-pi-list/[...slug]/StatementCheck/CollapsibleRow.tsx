import React, { useState } from "react";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { cjbsTheme, formatNumberWithCommas, TD } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";

const CollapsibleRow = ({
  invcId,
  issuDttm,
  prcsDate,
  price,
  prePymtPrice,
  rmnPrePymtPrice,
  prePymtPrcsHstrList,
}) => {
  const [collpasibleOpen, setCollpasibleOpen] = useState<boolean>(false);
  return (
    <>
      <TableRow>
        <TD>{invcId}</TD>
        <TD>{issuDttm}</TD>
        <TD>{formatNumberWithCommas(prePymtPrice)}</TD>
        <TD sx={{ width: 150 }}>{prcsDate}</TD>
        <TD sx={{ width: 150 }}>{formatNumberWithCommas(price)}</TD>
        <TD sx={{ width: 100 }}>{formatNumberWithCommas(rmnPrePymtPrice)}</TD>
        <TD sx={{ width: 50 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setCollpasibleOpen(!collpasibleOpen)}
          >
            {collpasibleOpen ? (
              <MyIcon icon="cheveron-up" size={20} />
            ) : (
              <MyIcon icon="cheveron-down" size={20} />
            )}
          </IconButton>
        </TD>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{
            p: "0 !important",
            border: "none",
          }}
          colSpan={7}
        >
          <Collapse in={collpasibleOpen} timeout="auto" unmountOnExit>
            <Table>
              <TableBody
                sx={{
                  "& th, & td": {
                    p: 0,
                    border: "none",
                    backgroundColor: cjbsTheme.palette.grey["200"],
                  },
                }}
              >
                {prePymtPrcsHstrList.map((item, index) => {
                  const {
                    prcsDate,
                    prcsTypeCode,
                    prcsTypeVal,
                    price,
                    rmnPrePymtPrice,
                  } = item;
                  return (
                    <TableRow key={prcsTypeCode + index.toString()}>
                      <TD sx={{ width: 80 }}></TD>
                      <TD sx={{ width: 200 }}></TD>
                      <TD sx={{ width: 150 }}>{prcsTypeVal}</TD>
                      <TD sx={{ width: 150 }}>{prcsDate}</TD>
                      <TD sx={{ width: 150 }}>
                        {formatNumberWithCommas(price)}
                      </TD>
                      <TD sx={{ width: 100 }}>
                        {formatNumberWithCommas(rmnPrePymtPrice)}
                      </TD>
                      <TD sx={{ width: 50 }}></TD>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
          {/*</TD>*/}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleRow;
