import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";

const LazyAgncInfoModal = dynamic(() => import("./AgncInfoModal"), {
  ssr: false,
});

interface AgncDetailInfoProps {
  agncUkey: string;
}

const AgncDetailInfo = ({ agncUkey }: AgncDetailInfoProps) => {
  const [showAgncInfoModal, setShowAgncInfoModal] = useState<boolean>(false);
  const handleAgncInfoModalOpen = () => {
    setShowAgncInfoModal(true);
  };
  const handleAgncInfoModalClose = () => {
    setShowAgncInfoModal(false);
  };
  return (
    <>
      <IconButton onClick={handleAgncInfoModalOpen}>
        <MyIcon
          icon="memo"
          width={18}
          data-tag="allowRowEvents"
          color="black"
        />
      </IconButton>

      {/*거래처(pi) 정보 모달*/}
      {showAgncInfoModal && (
        <LazyAgncInfoModal
          onClose={handleAgncInfoModalClose}
          open={showAgncInfoModal}
          modalWidth={800}
          ukey={agncUkey}
        />
      )}
    </>
  );
};

export default AgncDetailInfo;
