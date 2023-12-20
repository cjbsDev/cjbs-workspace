import { OutlinedButton } from "cjbsDSTM";
import React from "react";

export const getColumns = (goModifyPage: (esPrMngUkey: string) => void) => [
  {
    name: "No",
    cell: (row: any, index: number) => {
      return index + 1;
    },
    width: "80px",
    center: true,
  },
  {
    name: "분석종류",
    selector: (row: { anlsTypeMcVal: string }) => row.anlsTypeMcVal,
    width: "150px",
  },
  {
    name: "품명",
    selector: (row: { prNm: string }) => row.prNm,
    width: "340px",
  },
  {
    name: "포함 사항",
    selector: (row: { inclInfo: string }) => row.inclInfo,
    wrap: true,
    cell: (row: { inclInfo: string }) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {row.inclInfo ? (
          row.inclInfo.split("\n").map((item, index) => (
            <React.Fragment key={index}>
              {item}
              <br />
            </React.Fragment>
          ))
        ) : (
          <span>-</span>
        )}
      </div>
    ),
  },
  {
    name: "관리",
    cell: (row: { esPrMngUkey: string }) => {
      return (
        <OutlinedButton
          buttonName="관리"
          size="small"
          onClick={() => goModifyPage(row.esPrMngUkey)}
        />
      );
    },
    width: "80px",
    center: true,
    button: true,
  },
];
