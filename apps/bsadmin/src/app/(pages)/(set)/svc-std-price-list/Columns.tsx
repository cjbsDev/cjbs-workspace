import { OutlinedButton } from "cjbsDSTM";

export const getColumns = (
  goDetailPage: (stndPriceMpngUkey: string) => void,
) => [
  {
    name: "서비스 분류 코드",
    selector: (row: { stndTypeCode: string }) => row.stndTypeCode,
    width: "130px",
    center: true,
  },
  {
    name: "분류",
    selector: (row: { srvcTypeMcVal: string }) => row.srvcTypeMcVal,
    width: "150px",
    center: true,
  },
  {
    name: "분석종류",
    selector: (row: { anlsTypeMcVal: string }) => row.anlsTypeMcVal,
    width: "150px",
    center: true,
  },
  {
    name: "플랫폼",
    selector: (row: { anlsMtMcVal: string }) => row.anlsMtMcVal,
    // width: "300px",
  },
  {
    name: "생산량",
    selector: (row: { prdcSizeMcVal: string }) => row.prdcSizeMcVal,
    width: "80px",
    right: true,
  },
  {
    name: "세부 기준가 개수",
    selector: (row: { stndPriceDetailCnt: string }) => row.stndPriceDetailCnt,
    width: "130px",
    right: true,
  },

  {
    name: "관리",
    cell: (row: { stndPriceMpngUkey: string }) => {
      return (
        <OutlinedButton
          buttonName="관리"
          size="small"
          onClick={() => goDetailPage(row.stndPriceMpngUkey)}
        />
      );
    },
    width: "80px",
    center: true,
    button: true,
  },
];
