import * as React from "react";

import {
  ContainedButton,
  OutlinedButton,
  ModalAction,
  ModalContainer,
  ModalTitle,
} from "cjbsDSTM";
import {
  DialogActions,
  DialogContent, Stack,
} from "@mui/material";
import Link from "next/link";


const CategorySelectModal = (props: any) => {
  const { open, onClose, modalWidth } = props;
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>서비스 분류</ModalTitle>
      <DialogContent>
        <Stack spacing={1} alignItems="center" justifyContent="center">
          <Link
            href={{
              pathname: '/ledger-analysis-report-reg',
            }}
            style={{width:'100%'}}
          >
            <OutlinedButton buttonName="Analysis" size="large" fullWidth />
          </Link>
          <Link
            href={{
              pathname: '/ledger-license-report-reg',
            }}
            style={{width:'100%'}}
          >
            <OutlinedButton buttonName="License" size="large" fullWidth />
          </Link>
        </Stack>
      </DialogContent>
      {/*<ModalAction>*/}
      {/*  <ContainedButton buttonName="확인" onClick={onClose} />*/}
      {/*</ModalAction>*/}
    </ModalContainer>
  );
};

export default CategorySelectModal;
