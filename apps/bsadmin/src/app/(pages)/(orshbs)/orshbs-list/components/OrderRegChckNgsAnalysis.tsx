import React from "react";
import { useSession } from "next-auth/react";
import useArrayContainsCharacter from "../../../../hooks/useArrayContainsCharacter";
import { Divider } from "@mui/material";
import { ContainedButton } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";

const OrderRegChckNgsAnalysis = ({ row }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const authority = session?.authorities;
  const containsChar = useArrayContainsCharacter(authority, ["NGS_ANALYSIS"]);
  console.log("NGS_ANALYSIS 체크 ==>>", containsChar);

  const goLinkOrderPage = (row: {
    orshUkey: string;
    srvcTypeAbb: string;
    isOrderStatus: string;
    anlsTypeAbb: string;
  }) => {
    const orshUkey = row.orshUkey;
    const srvcTypeAbb = row.srvcTypeAbb;
    const isOrderStatus = row.isOrderStatus;
    const anlsTypeAbb = row.anlsTypeAbb;
    router.push(
      `/order-reg?orshUkey=${orshUkey}&orshType=intn&from=/orshbs-list&srvcTypeAbb=${srvcTypeAbb}&isOrderStatus=${isOrderStatus}&anlsTypeAbb=${anlsTypeAbb}`,
    );
  };

  if (!containsChar) return null;

  return (
    <>
      <Divider orientation="vertical" variant="middle" flexItem />
      <ContainedButton
        buttonName="+오더등록"
        size="small"
        onClick={() => goLinkOrderPage(row)}
      />
    </>
  );
};

export default OrderRegChckNgsAnalysis;
