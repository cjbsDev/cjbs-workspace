import React, {useRef, useState} from "react";

import {
  ContainedButton,
  OutlinedButton,
  ModalAction,
  ModalContainer,
  ModalTitle,
} from "cjbsDSTM";
import {
  DialogContent, Stack,
} from "@mui/material";
import TSPreview from "./TSPreview";
import ReactToPrint from "react-to-print";
import LoadingWhiteSvg from "../../../../components/LoadingWhiteSvg";

const PreviewModal = (props: any) => {
  const { open, onClose, modalWidth, viewType, onSubmit } = props;
  const ref = useRef();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>미리보기</ModalTitle>
      <DialogContent>
        <Stack spacing={1} alignItems="center" justifyContent="center" mb={2}>
          {/*<ReactToPrint*/}
          {/*  trigger={() => <OutlinedButton buttonName="인쇄" />}*/}
          {/*  content={() => ref.current}*/}
          {/*/>*/}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <TSPreview ref={ref}/>
        </Stack>
      </DialogContent>
      <ModalAction>
        <ContainedButton buttonName="확인" onClick={onClose} />
      </ModalAction>
    </ModalContainer>
  );
};

export default PreviewModal;