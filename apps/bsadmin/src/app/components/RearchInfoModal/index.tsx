import React from "react";
import {
  ErrorContainer,
  Fallback,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SkeletonLoading,
  TD,
  TH,
} from "cjbsDSTM";
import {
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ModalContainerProps } from "../../types/modal-container-props";
import dynamic from "next/dynamic";

interface RearchDetailInfoModalProps extends ModalContainerProps {
  ukey: string;
}

const LazyRearchDetailInfoTable = dynamic(
  () => import("./RearchDetailInfoTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={206} />,
  },
);

const Index = ({
  onClose,
  open,
  modalWidth,
  ukey,
}: RearchDetailInfoModalProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>연구책임자 정보</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyRearchDetailInfoTable ukey={ukey} />
        </ErrorContainer>
        {/*<TableContainer>*/}
        {/*  <Table>*/}
        {/*    <TableBody>*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: "35%" }}>고객 번호</TH>*/}
        {/*        <TD>{ebcId}</TD>*/}
        {/*      </TableRow>*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: "35%" }}>아이디</TH>*/}
        {/*        <TD>{ebcEmail}</TD>*/}
        {/*      </TableRow>*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: "35%" }}>이름</TH>*/}
        {/*        <TD>{nm}</TD>*/}
        {/*      </TableRow>*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: "35%" }}>연락처</TH>*/}
        {/*        <TD>{telList === null ? "-" : telList}</TD>*/}
        {/*      </TableRow>*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: "35%" }}>거래처(PI)</TH>*/}
        {/*        <TD>*/}
        {/*          {agncNm}({instNm})*/}
        {/*        </TD>*/}
        {/*      </TableRow>*/}
        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} color="secondary" />
      </ModalAction>
    </ModalContainer>
  );
};

export default Index;
