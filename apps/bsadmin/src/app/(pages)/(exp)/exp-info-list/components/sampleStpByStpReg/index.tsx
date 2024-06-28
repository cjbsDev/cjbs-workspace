import React, { useState } from "react";
import { ContainedButton } from "cjbsDSTM";
import RegModal from "./regModal";
import { useRecoilState } from "recoil";
import { modalOpenAtom } from "./atom";

const Index = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useRecoilState(modalOpenAtom);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ContainedButton
        buttonName="샘플 단계 등록"
        size="small"
        onClick={handleModalOpen}
      />

      <RegModal open={isOpen} onClose={handleClose} modalWidth={1000} />
    </>
  );
};

export default Index;
