import React from "react";
import AdminPublishInfoModifyBtn from "./AdminPublishInfoModifyBtn";
import AdminPublishInfoModifyModal from "./AdminPublishInfoModifyModal";
import { useRecoilState } from "recoil";
import { adminPublishInfoModifyAtom } from "./atom";

const Index = () => {
  const [showIs, setShowIs] = useRecoilState(adminPublishInfoModifyAtom);
  return (
    <>
      <AdminPublishInfoModifyBtn />
      <AdminPublishInfoModifyModal
        onClose={() => setShowIs(false)}
        open={showIs}
        modalWidth={440}
      />
    </>
  );
};

export default Index;
