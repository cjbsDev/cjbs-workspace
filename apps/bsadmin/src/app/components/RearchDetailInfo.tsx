import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";

const LazyRearchInfoModal = dynamic(() => import("./RearchInfoModal"), {
  ssr: false,
});

interface RearchDetailInfoProps {
  agncLeaderUkey: string;
}

const RearchDetailInfo = ({ agncLeaderUkey }: RearchDetailInfoProps) => {
  const [showRearchInfoModal, setShowRearchInfoModal] =
    useState<boolean>(false);
  const rearchInfoModalOpen = () => {
    setShowRearchInfoModal(true);
  };
  const rearchInfoModalClose = () => {
    setShowRearchInfoModal(false);
  };
  return (
    <>
      <IconButton onClick={rearchInfoModalOpen}>
        <MyIcon
          icon="memo"
          width={18}
          data-tag="allowRowEvents"
          color="black"
        />
      </IconButton>

      {/*거래처(pi) 정보 모달*/}
      {showRearchInfoModal && (
        <LazyRearchInfoModal
          onClose={rearchInfoModalClose}
          open={showRearchInfoModal}
          modalWidth={800}
          ukey={agncLeaderUkey}
        />
      )}
    </>
  );
};

export default RearchDetailInfo;
