import React, { useState } from "react";
import { OutlinedButton } from "cjbsDSTM";
import dynamic from "next/dynamic";
const LazyStatementCheckModal = dynamic(() => import("./StatementCheckModal"), {
  ssr: false,
});

const Index = () => {
  const [statementChkModalOpen, setStatementChkModalOpen] =
    useState<boolean>(false);
  const handleStatementChkModalOpen = () => {
    setStatementChkModalOpen(true);
  };
  const handleStatementChkModalClose = () => {
    setStatementChkModalOpen(false);
  };
  return (
    <>
      <OutlinedButton
        buttonName="내역 확인"
        size="small"
        onClick={handleStatementChkModalOpen}
      />
      {/* 내역 확인 */}
      {statementChkModalOpen && (
        <LazyStatementCheckModal
          open={statementChkModalOpen}
          onClose={handleStatementChkModalClose}
          modalWidth={800}
        />
      )}
    </>
  );
};

export default Index;
