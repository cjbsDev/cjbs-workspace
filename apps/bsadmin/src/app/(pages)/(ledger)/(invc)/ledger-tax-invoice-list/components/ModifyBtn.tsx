import React from "react";
import { OutlinedButton } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import dayjs from "dayjs";
import { toast } from "react-toastify";

interface ModifyBtnProps {
  invcUkey: string;
  agncUkey: string;
  issuDttm: string;
}
const ModifyBtn = ({ invcUkey, agncUkey, issuDttm }: ModifyBtnProps) => {
  const router = useRouter();
  const handleModify = () => {
    // const date1 = dayjs(new Date());
    // const date2 = dayjs(issuDttm);
    // const isAfter = date1.isAfter(date2);
    // console.log("date1이 date2보다 이후인가?", isAfter);

    // const currentMonth = dayjs().format("YYYY-MM");
    // const issuMonth = dayjs(issuDttm).format("YYYY-MM");
    // if (currentMonth !== issuMonth) {
    //   toast("당월에만 등록 및 수정이 가능합니다.");
    // } else {
    //   router.push(
    //     `/ledger-tax-invoice-reg?type=modify&invcUkey=${invcUkey}&agncUkey=${agncUkey}`,
    //   );
    // }

    router.push(
      `/ledger-tax-invoice-reg?type=modify&invcUkey=${invcUkey}&agncUkey=${agncUkey}`,
    );
  };

  return (
    <OutlinedButton size="small" buttonName="수정" onClick={handleModify} />
  );
};

export default ModifyBtn;
