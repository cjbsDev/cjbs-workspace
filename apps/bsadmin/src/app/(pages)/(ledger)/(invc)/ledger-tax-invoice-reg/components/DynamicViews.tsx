import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import PaymentDynamicInfo from "./PaymentDynamicInfo";
import PblshrInst from "./PblshrInst";
import EtcInfo from "./EtcInfo";
import AgncSearchModal from "../../../../../components/AgncSearchModal";
import InstSearchModal from "../../../../../components/InstSearchModal";
import { useRecoilState } from "recoil";
import { agncModalShowAtom, instModalShowAtom } from "../atom";
import DynamicSumTable2 from "./DynamicSumTable2";
import DynamicTable from "../../../../../components/DynamicTable";
import DynamicSumTable from "../../../../../components/DynamicSumTable";

const DynamicViews = () => {
  const { watch, getValues } = useFormContext();
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useRecoilState(agncModalShowAtom);
  const [showInstSearchModal, setShowInstSearchModal] =
    useRecoilState(instModalShowAtom);

  const agncUkeyValue = watch("agncUkey");
  const paymentInfoValue = watch("pymtInfoCc");

  console.log("ERERERERERERER", agncUkeyValue);

  const handleAgncSearchModalClose = useCallback(() => {
    console.log("TTTTTTTTTTTTTT");
    setShowAgncSearchModal(false);
  }, []);

  const handleInstSearchModalClose = useCallback(() => {
    setShowInstSearchModal(false);
  }, []);

  if (agncUkeyValue === "" || agncUkeyValue === undefined) {
    return (
      <AgncSearchModal
        onClose={handleAgncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={800}
      />
    );
  }

  return (
    <>
      {/* 결제정보 */}
      <PaymentDynamicInfo />

      {/* 품명 */}
      {paymentInfoValue === "BS_1914002" && (
        <>
          <DynamicTable />
          <DynamicSumTable />
        </>
      )}

      {paymentInfoValue !== "BS_1914002" && <DynamicSumTable2 />}

      {/* 발행처 정보 */}
      <PblshrInst />

      {/* 기타정보 */}
      <EtcInfo />

      <AgncSearchModal
        onClose={handleAgncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={800}
      />

      <InstSearchModal
        onClose={handleInstSearchModalClose}
        open={showInstSearchModal}
        modalWidth={1000}
      />
    </>
  );
};

export default DynamicViews;
