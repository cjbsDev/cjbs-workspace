import React, { useState } from "react";
import {
  cjbsTheme,
  formatNumberWithCommas,
  ModalContainer,
  ModalTitle,
  TD,
  TH,
} from "cjbsDSTM";
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
import { ModalContainerProps } from "../../../../../../types/modal-container-props";
import MyIcon from "icon/MyIcon";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import CollapsibleRow from "./CollapsibleRow";

const StatementCheckModal = (props: ModalContainerProps) => {
  const { open, onClose, modalWidth } = props;
  // const [collpasibleOpen, setCollpasibleOpen] = useState<boolean>(false);
  const params = useParams();
  const { slug } = params;
  console.log("PARAMS", params);

  const { data } = useSWR(`/agnc/${slug}/prePymtPrice/list`, fetcher, {
    suspense: true,
  });
  console.log("선결제 금액 리스트 ==>>", data);
  const { prePymtPrcsHstrResList, prePymtPrice, price, rmnPrePymtPrice } = data;

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
              {prePymtPrcsHstrResList.map((item) => {
                const {
                  invcId,
                  issuDttm,
                  prcsDate,
                  price,
                  prePymtPrcsHstrList,
                  prePymtPrice,
                  rmnPrePymtPrice,
                } = item;
                return (
                  <CollapsibleRow
                    key={invcId}
                    invcId={invcId}
                    issuDttm={issuDttm}
                    prcsDate={prcsDate}
                    price={price}
                    prePymtPrcsHstrList={prePymtPrcsHstrList}
                    rmnPrePymtPrice={rmnPrePymtPrice}
                    prePymtPrice={prePymtPrice}
                  />
                );
              })}
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
                  {formatNumberWithCommas(prePymtPrice)}
                </TD>
                <TD sx={{ width: 150 }}></TD>
                <TD sx={{ width: 150 }}>{formatNumberWithCommas(price)}</TD>
                <TD sx={{ color: cjbsTheme.palette.warning.main, width: 100 }}>
                  {formatNumberWithCommas(rmnPrePymtPrice)}
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
