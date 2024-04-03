import React, { useState } from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
const LazyAgncInfoModal = dynamic(() => import("./AgncInfoModal"), {
  ssr: false,
});

const InstInfo = () => {
  const [agncInfoModalOpen, setAgncInfoModalOpen] = useState<boolean>(false);
  const handleAgncInfoModalOpen = () => {
    setAgncInfoModalOpen(true);
  };
  const handleAgncInfoModalClose = () => {
    setAgncInfoModalOpen(false);
  };
  return (
    <>
      <IconButton size="small" onClick={handleAgncInfoModalOpen}>
        <MyIcon icon="memo" size={20} />
      </IconButton>

      {/* 기관 정보 모달 */}
      {agncInfoModalOpen && (
        <LazyAgncInfoModal
          open={agncInfoModalOpen}
          onClose={handleAgncInfoModalClose}
          modalWidth={800}
        />
      )}
    </>
  );
};

export default InstInfo;
