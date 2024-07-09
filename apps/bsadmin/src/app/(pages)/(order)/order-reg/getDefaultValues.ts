export const getDefaultValues = (orshType: any, orshExtrData: any) => {
  let defaultValues = {};
  let commonValues = {};

  // 공통 속성
  if (orshExtrData !== "NO_DATA") {
    console.log("NO_DATA!@!@");
    commonValues = {
      // 연구책임자 정보
      ebcEmail: orshExtrData.custInfo.rhpiEbcEmail,
      custNm: orshExtrData.custInfo.rhpiNm,
      custUkey: orshExtrData.custInfo.custUkey,
      agncUkey: orshExtrData.custInfo.agncUkey,
      telList: orshExtrData.aplcInfo.aplcTel,
      rhpiNm: orshExtrData.custInfo.rhpiNm,
      agncNm: orshExtrData.custInfo.agncNm,
      // 주문 정보
      mailRcpnList: orshExtrData.orderInfo.mailRcpnList,
      addEmailList: orshExtrData.orderInfo.addEmailList,
      srvcTypeMc: orshExtrData.orderInfo.srvcTypeMc,
      anlsTypeMc: orshExtrData.orderInfo.anlsTypeMc,
      platformMc: orshExtrData.orderInfo.pltfMc,
      taxonBCnt: orshExtrData.orderInfo.taxonBCnt,
      taxonECnt: orshExtrData.orderInfo.taxonECnt,
      taxonACnt: orshExtrData.orderInfo.taxonACnt,
      orderTypeCc: "BS_0800001",
      reqReturnList: orshExtrData.orderInfo.reqReturnList,
      //   신청인 정보
      ordrAplcNm: orshExtrData.aplcInfo.aplcNm,
      ordrAplcEmail: orshExtrData.aplcInfo.aplcEmail,
      ordrAplcTel: orshExtrData.aplcInfo.aplcTel,
      //   추가 정보
      isCheck16s: orshExtrData.addInfo.is16S,
      bsnsMngrUkey: orshExtrData.addInfo.bsnsMngrUkey,
      memo: orshExtrData.addInfo.memo,
    };
  }
  // const commonValues = {
  //   // 연구책임자 정보
  //   ebcEmail: orshExtrData.custInfo.rhpiEbcEmail,
  //   custNm: orshExtrData.custInfo.rhpiNm,
  //   custUkey: orshExtrData.custInfo.custUkey,
  //   agncUkey: orshExtrData.custInfo.agncUkey,
  //   telList: orshExtrData.aplcInfo.aplcTel,
  //   rhpiNm: orshExtrData.custInfo.rhpiNm,
  //   agncNm: orshExtrData.custInfo.agncNm,
  //   // 주문 정보
  //   mailRcpnList: orshExtrData.orderInfo.mailRcpnList,
  //   addEmailList: orshExtrData.orderInfo.addEmailList,
  //   srvcTypeMc: orshExtrData.orderInfo.srvcTypeMc,
  //   anlsTypeMc: orshExtrData.orderInfo.anlsTypeMc,
  //   platformMc: orshExtrData.orderInfo.pltfMc,
  //   taxonBCnt: orshExtrData.orderInfo.taxonBCnt,
  //   taxonECnt: orshExtrData.orderInfo.taxonECnt,
  //   taxonACnt: orshExtrData.orderInfo.taxonACnt,
  //   orderTypeCc: "BS_0800001",
  //   reqReturnList: orshExtrData.orderInfo.reqReturnList,
  //   //   신청인 정보
  //   ordrAplcNm: orshExtrData.aplcInfo.aplcNm,
  //   ordrAplcEmail: orshExtrData.aplcInfo.aplcEmail,
  //   ordrAplcTel: orshExtrData.aplcInfo.aplcTel,
  //   //   추가 정보
  //   isCheck16s: orshExtrData.addInfo.is16S,
  //   bsnsMngrUkey: orshExtrData.addInfo.bsnsMngrUkey,
  //   memo: orshExtrData.addInfo.memo,
  // };

  if (orshType === "extr") {
    defaultValues = {
      ...commonValues,
      // 추가 고유 속성
      price: orshExtrData.addInfo.price,
    };
  } else if (orshType === "intn") {
    defaultValues = {
      ...commonValues,
      // 추가 고유 속성
      prjtCodeMc: orshExtrData.projectInfo.prjtCodeMc,
      prjcNm: orshExtrData.projectInfo.prjtCodeVal,
      prjtDetailCodeMc: orshExtrData.projectInfo.prjtDetailCodeMc,
      rstFileRcpnEmail: orshExtrData.orderInfo.rstFileRcpnEmail,
    };
  } else {
    defaultValues = {
      // ...commonValues,
      srvcTypeMc: "BS_0100007003",
      anlsTypeMc: "BS_0100006004",
      pltfMc: "BS_0100008001",
      taxonBCnt: 0,
      taxonECnt: 0,
      taxonACnt: 0,
      price: 0,
      mailRcpnList: ["agncLeaderRcpn", "ordrAplcRcpn"],
      orderTypeCc: "BS_0800001",
      isCheck16s: "N",
    };
  }

  return defaultValues;
};
