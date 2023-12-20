import { Chip } from "@mui/material";
import { OutlinedButton } from "cjbsDSTM";

export const getColumns = (goDetailPage: (topCodeMc: string) => void) => [
  {
    name: "No",
    width: "80px",
    center: true,
    cell: (row: any, index: number) => {
      return index + 1;
    },
  },
  {
    name: "서비스 타입",
    width: "300px",
    selector: (row: { topValue: string }) => row.topValue,
  },
  {
    name: "분석 단계",
    cell: (row: { btmValueList: any }) => {
      return row.btmValueList.length > 0
        ? row.btmValueList.map((item: any) => (
            <Chip
              key={item.btmCodeMc}
              label={item.btmCodeVal}
              size="small"
              sx={{
                border: "1px solid #ADB5BD",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                mr: "8px",
              }}
            />
          ))
        : "등록된 분석 단계가 없습니다.";
    },
  },
  {
    name: "관리",
    width: "80px",
    center: true,
    button: true,
    cell: (row: { topCodeMc: string }) => {
      return (
        <OutlinedButton
          buttonName="관리"
          size="small"
          onClick={() => goDetailPage(row.topCodeMc)}
        />
      );
    },
  },
];
