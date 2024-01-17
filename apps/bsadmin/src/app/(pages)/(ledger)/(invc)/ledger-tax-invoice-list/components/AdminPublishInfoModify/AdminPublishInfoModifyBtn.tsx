import React, { useCallback } from "react";
import { ContainedButton } from "cjbsDSTM";
import { useRecoilState } from "recoil";
import { adminPublishInfoModifyAtom } from "./atom";

const AdminPublishInfoModifyBtn = () => {
  const [showIs, setShowIs] = useRecoilState(adminPublishInfoModifyAtom);
  const handleAdminPublishInfoModifyModalOpen = useCallback(() => {
    setShowIs(true);
  }, []);

  return (
    <ContainedButton
      buttonName="발행 정보 변경"
      size="small"
      onClick={handleAdminPublishInfoModifyModalOpen}
    />
  );
};

export default AdminPublishInfoModifyBtn;
