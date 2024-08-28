import React from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import { useResultObject } from "../../../../../../components/KeywordSearch/useResultObject";
import { OutlinedButton } from "cjbsDSTM";
// import { defaultValues } from "../../../../(ledger)/(invc)/ledger-tax-invoice-reg/func/defaultValues";

interface ResetBtnProps {
  onClose: () => void;
}

interface ResultObject {
  dateTypeCc: string;
  startDttm: string;
  endDttm: string;
  orderId: string;
  keyword: string;
  orderStatusCc: string;
}

const ResetBtn = ({ onClose }: ResetBtnProps) => {
  const { reset, resetField } = useFormContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [resultObject] = useResultObject() as [ResultObject, unknown];
  // console.log("RESET BTN ==>>", resultObject);

  const handleReset = () => {
    const strArr = Object.keys(resultObject);

    const keysToDelete = ["anlsTypeMc"];

    const filteredstrArrData = strArr.filter(
      (item) => !keysToDelete.includes(item),
    );

    // console.log("#########BBBBBBBBBBBBBBBBB", filteredstrArrData);
    //
    // console.log("strArr", strArr);
    const params = new URLSearchParams(searchParams.toString());
    filteredstrArrData.map((item) => params.delete(`${item}`));
    resetField("dateTypeCc", { defaultValue: "" });
    resetField("startDttm", { defaultValue: null });
    resetField("endDttm", { defaultValue: null });
    resetField("orderId", { defaultValue: "" });
    resetField("keyword", { defaultValue: "" });
    resetField("orderStatusCc", { defaultValue: "" });
    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  return (
    <OutlinedButton onClick={handleReset} buttonName="초기화" size="small" />
  );
};

export default ResetBtn;
