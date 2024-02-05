import React, { useState } from "react";
import { ContainedButton } from "cjbsDSTM";
import RegModal from "./regModal";

const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    console.log("Click!!!");
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

      <RegModal open={isOpen} onClose={handleClose} modalWidth={800} />
    </>
  );
};

export default Index;
