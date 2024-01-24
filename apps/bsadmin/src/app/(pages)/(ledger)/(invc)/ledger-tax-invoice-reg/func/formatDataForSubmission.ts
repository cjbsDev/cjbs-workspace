import dayjs from "dayjs";
export function formatDataForSubmission(formData: any, type: string | null) {
  let bodyData = { ...formData };

  bodyData.dpstDttm = dayjs(bodyData.dpstDttm).format("YYYY-MM-DD");
  bodyData.issuDttm = dayjs(bodyData.issuDttm).format("YYYY-MM-DD");

  switch (bodyData.pymtInfoCc) {
    case "BS_1914001":
    case "BS_1914004":
      delete bodyData.productDetailList;
      delete bodyData.dpstPrice;
      delete bodyData.dpstDttm;
      delete bodyData.pyrNm;
      break;
    case "BS_1914003":
      delete bodyData.productDetailList;
      break;
    default:
      break;
  }

  // if (type === 'modify') {
  //   // Custom logic for modify type
  // }

  return bodyData;
}
