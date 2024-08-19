import React, { useState } from "react";
import { OutlinedButton } from "cjbsDSTM";
import dynamic from "next/dynamic";
const LazyMngSrchModal = dynamic(() => import("./MngSrchModal"), {
  ssr: false,
  // loading: () => <SkeletonLoading height={270} />,
});

const MngSrchBtn = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <OutlinedButton
        buttonName="담당자 조회"
        size="small"
        onClick={handleModalOpen}
        sx={{ mr: 1.5 }}
      />

      {isOpen && (
        <LazyMngSrchModal
          open={isOpen}
          onClose={handleModalClose}
          modalWidth={1000}
        />
      )}
    </>
  );
};

export default MngSrchBtn;
