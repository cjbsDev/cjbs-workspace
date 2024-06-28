import React from "react";
import {
  ContainedButton,
  OutlinedButton,
  ModalAction,
  ModalContainer,
  ModalTitle,
} from "cjbsDSTM";
import { DialogActions, DialogContent, Stack } from "@mui/material";
import Link from "next/link";

const ServiceSelectModal = (props: any) => {
  const { open, onClose, modalWidth } = props;
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>내부 주문서 등록</ModalTitle>
      <DialogContent>
        <Stack spacing={1} alignItems="center" justifyContent="center">
          <Link
            href={{
              pathname: "/orshbs/in/mtp",
            }}
            style={{ width: "100%" }}
          >
            <OutlinedButton buttonName="MTP" size="large" fullWidth />
          </Link>
          <Link
            href={{
              pathname: "/orshbs/in/shotgun",
            }}
            style={{ width: "100%" }}
          >
            <OutlinedButton buttonName="Shotgun" size="large" fullWidth />
          </Link>
          <Link
            href={{
              pathname: "/orshbs/in/wg",
            }}
            style={{ width: "100%" }}
          >
            <OutlinedButton buttonName="WG" size="large" fullWidth />
          </Link>
          <Link
            href={{
              pathname: "/orshbs/in/rs",
            }}
            style={{ width: "100%" }}
          >
            <OutlinedButton buttonName="RS" size="large" fullWidth />
          </Link>
        </Stack>
      </DialogContent>
      {/*<ModalActionGroup>*/}
      {/*  <ContainedButton buttonName="확인" onClick={onClose} />*/}
      {/*</ModalActionGroup>*/}
    </ModalContainer>
  );
};

export default ServiceSelectModal;
