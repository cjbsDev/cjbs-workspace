import React from "react";
import { ModalContainer, ModalTitle } from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";
import { useRecoilState } from "recoil";
import { modalOpenAtom } from "../sampleStpByStpReg/atom";
import Modal from "./modal";
import { resultHistoryModalOpenAtom } from "./atom";

interface ResultHistoryProps {
  sampleUkey: string;
}

const Index = ({ sampleUkey }: ResultHistoryProps) => {
  const [isOpen, setIsOpen] = useRecoilState(
    resultHistoryModalOpenAtom(sampleUkey),
  );
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return <Modal modalWidth={800} onClose={handleClose} open={isOpen} />;
};

export default Index;
