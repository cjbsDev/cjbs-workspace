import React from "react";
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


const ServiceSelectModal = (props) => {
  const { open, onClose, modalWidth } = props;
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>내부 주문서 등록</ModalTitle>
      <DialogContent>
        <Stack spacing={1} alignItems="center" justifyContent="center">
          <Link
            href={{
              pathname: '/orsh-order/in/mtp',
            }}
            style={{width:'100%'}}
          >
            <OutlinedButton buttonName="MTP" size="large" fullWidth />
          </Link>
          <Link
            href={{
              pathname: '/orsh-order/in/shotgun',
            }}
            style={{width:'100%'}}
          >
            <OutlinedButton buttonName="Shotgun" size="large" fullWidth />
          </Link>
          <Link
            href={{
              pathname: '/orsh-order/in/wg',
            }}
            style={{width:'100%'}}
          >
            <OutlinedButton buttonName="WG" size="large" fullWidth/>
          </Link>
          {/*<Link*/}
          {/*  href={{*/}
          {/*    pathname: '/orsh-order/in/rs',*/}
          {/*  }}*/}
          {/*>*/}
            <OutlinedButton buttonName="RS" size="large" fullWidth disabled={true}/>
          {/*</Link>*/}
        </Stack>
      </DialogContent>
      {/*<ModalAction>*/}
      {/*  <ContainedButton buttonName="확인" onClick={onClose} />*/}
      {/*</ModalAction>*/}
    </ModalContainer>
  );
};

export default ServiceSelectModal;
