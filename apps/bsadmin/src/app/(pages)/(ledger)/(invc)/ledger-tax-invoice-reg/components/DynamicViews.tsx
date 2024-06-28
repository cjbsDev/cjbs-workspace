import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import PaymentDynamicInfo from "./PaymentDynamicInfo";
import PblshrInst from "./PblshrInst";
import EtcInfo from "./EtcInfo";
import AgncSearchModal from "../../../../../components/AgncSearchModal";
import InstSearchModal from "../../../../../components/InstSearchModal";
import { useRecoilState } from "recoil";
import { agncModalShowAtom, instModalShowAtom } from "../atom";
import DynamicTable from "../../../../../components/DynamicTable";
import DynamicSumTable from "../../../../../components/DynamicSumTable";
import PublicationInfo from "./PublicationInfo";
import DynamicSumTable2 from "./DynamicSumTable2";
import DynamicSumTable4 from "./DynamicSumTable4";
import DynamicSumTable3 from "./DynamicSumTable3";

const DynamicViews = () => {
  const { watch, getValues } = useFormContext();
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useRecoilState(agncModalShowAtom);
  const [showInstSearchModal, setShowInstSearchModal] =
    useRecoilState(instModalShowAtom);

  const agncUkeyValue = watch("agncUkey");
  const paymentInfoValue = watch("pymtInfoCc");

  // console.log("ERERERERERERER", agncUkeyValue);

  const handleAgncSearchModalClose = useCallback(() => {
    // console.log("TTTTTTTTTTTTTT");
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
      {/* 결제 정보 */}
      <PaymentDynamicInfo />

      {/* 계산서 */}
      {paymentInfoValue === "BS_1914002" && (
        <>
          <DynamicTable />
          <DynamicSumTable />
        </>
      )}

      {/* card */}
      {paymentInfoValue === "BS_1914001" && <DynamicSumTable2 />}

      {/* invoice */}
      {paymentInfoValue === "BS_1914003" && <DynamicSumTable3 />}

      {/* 이관 */}
      {paymentInfoValue === "BS_1914004" && <DynamicSumTable4 />}

      {/* 발행처 정보 */}
      <PblshrInst />

      {/* 발행 정보 */}
      {/*<PublicationInfo />*/}

      {/* 기타 정보 */}
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
