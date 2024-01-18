import React, { useState } from "react";
import { cjbsTheme, ModalContainer, ModalTitle, TD, TH } from "cjbsDSTM";
import {
  Collapse,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";
import MyIcon from "icon/MyIcon";

const StatementCheckModal = (props: ModalContainerProps) => {
  const { open, onClose, modalWidth } = props;
  const [collpasibleOpen, setCollpasibleOpen] = useState<boolean>(false);

  const CollapsibleRow = () => {
    return (
      <>
        <TableRow>
          <TD>1</TD>
          <TD>23-01-10</TD>
          <TD>+ 100,000</TD>
          <TD>23-02-05</TD>
          <TD>- 100,000</TD>
          <TD>0</TD>
          <TD>
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
        <TableRow
          sx={{
            td: {
              backgroundColor: cjbsTheme.palette.grey["50"],
            },
          }}
        >
          <TD colSpan={7} sx={{ p: "0 !important" }}>
            <Collapse in={collpasibleOpen} timeout="auto" unmountOnExit>
              <Table>
                <TableBody
                  sx={{
                    "& th, & td": {
                      p: 1,
                      border: "none",
                      borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    },
                  }}
                >
                  <TableRow>
                    <TD sx={{ width: 50 }}></TD>
                    <TD sx={{ width: 200 }}></TD>
                    <TD sx={{ width: 150 }}></TD>
                    <TD sx={{ width: 150 }}>23-06-29</TD>
                    <TD sx={{ width: 150 }}>-3,000</TD>
                    <TD sx={{ width: 100 }}>10,000</TD>
                    <TD sx={{ width: 50 }}></TD>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TD>
        </TableRow>
        {/*<TableRow*/}
        {/*  sx={{*/}
        {/*    td: {*/}
        {/*      backgroundColor: cjbsTheme.palette.grey["50"],*/}
        {/*    },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <TD></TD>*/}
        {/*  <TD></TD>*/}
        {/*  <TD></TD>*/}
        {/*  <TD>23-10-10</TD>*/}
        {/*  <TD>-100,000</TD>*/}
        {/*  <TD>100,000</TD>*/}
        {/*  <TD></TD>*/}
        {/*</TableRow>*/}
        {/*<TableRow*/}
        {/*  sx={{*/}
        {/*    td: {*/}
        {/*      backgroundColor: cjbsTheme.palette.grey["50"],*/}
        {/*    },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <TD></TD>*/}
        {/*  <TD></TD>*/}
        {/*  <TD></TD>*/}
        {/*  <TD>23-10-10</TD>*/}
        {/*  <TD>-100,000</TD>*/}
        {/*  <TD>100,000</TD>*/}
        {/*  <TD></TD>*/}
        {/*</TableRow>*/}
      </>
    );
  };
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>내역 확인</ModalTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                backgroundColor: cjbsTheme.palette.grey["50"],
                borderTop: `1px solid ${cjbsTheme.palette.common.black}`,
                borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                "& th": {
                  fontWeight: "600",
                  p: 1,
                  border: "none",
                },
              }}
            >
              <TableRow>
                <TH sx={{ width: 50 }}></TH>
                <TH sx={{ width: 200 }}>세금 계산서 발행일</TH>
                <TH sx={{ width: 150 }}>선결제 금액</TH>
                <TH sx={{ width: 150 }}>분석일</TH>
                <TH sx={{ width: 150 }}>분석 비용</TH>
                <TH sx={{ width: 100 }}>남은 금액</TH>
                <TH sx={{ width: 50 }}></TH>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& th, & td": {
                  p: 1,
                  border: "none",
                  borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                },
              }}
            >
              <CollapsibleRow />
            </TableBody>
            <TableFooter
              sx={{
                textAlign: "right",
                "& th, & td": {
                  p: 1,
                  backgroundColor: cjbsTheme.palette.grey["300"],
                  border: "none",
                },
                "& th": {
                  fontWeight: "600",
                },
              }}
            >
              <TableRow>
                <TD sx={{ width: 50 }}></TD>
                <TH sx={{ width: 200 }}>합계</TH>
                <TD sx={{ color: cjbsTheme.palette.primary.main, width: 150 }}>
                  +100,000
                </TD>
                <TD sx={{ width: 150 }}></TD>
                <TD sx={{ width: 150 }}>250,000</TD>
                <TD sx={{ color: cjbsTheme.palette.warning.main, width: 100 }}>
                  150,000
                </TD>
                <TD sx={{ width: 50 }}></TD>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </DialogContent>
    </ModalContainer>
  );
};

export default StatementCheckModal;
