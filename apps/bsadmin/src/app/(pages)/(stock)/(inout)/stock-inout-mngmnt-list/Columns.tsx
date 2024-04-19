import {
  DeletedButton,
  formatNumberWithCommas,
  formatPhoneNumber,
  OutlinedButton,
} from "cjbsDSTM";
import React from "react";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { DELETE } from "api";
import { toast } from "react-toastify";

export const getColumns = (goModifyPage: (esPrMngUkey: string) => void) => [
  {
    name: "재고ID",
    width: "100px",
    center: true,
    selector: (row: { stockId: number }) => formatNumberWithCommas(row.stockId),
  },
  {
    name: "종류",
    selector: (row: { stockCtgrVal: string }) =>
      row.stockCtgrVal !== null ? row.stockCtgrVal : "-",
    center: true,
  },
  {
    name: "구분",
    selector: (row: { inOut: string }) =>
      row.inOut !== null ? row.inOut : "-",
    center: true,
    cell: (row: { inOut: string }) => {
      return (
        <Chip
          label={row.inOut}
          size="small"
          color={row.inOut === "입고" ? "success" : "warning"}
        />
      );
    },
  },
  {
    name: "품명",
    selector: (row: { stockNm: string }) =>
      row.stockNm !== null ? row.stockNm : "-",
    center: true,
    allowOverflow: true,
  },
  {
    name: "제조사",
    selector: (row: { mkrNm: string }) =>
      row.mkrNm !== null ? row.mkrNm : "-",
    center: true,
    allowOverflow: true,
  },
  {
    name: "규격",
    selector: (row: { stnd: string }) => (row.stnd !== null ? row.stnd : "-"),
    center: true,
  },
  {
    name: "단위",
    selector: (row: { unitVal: string }) =>
      row.unitVal !== null ? row.unitVal : "-",
    center: true,
  },
  {
    name: "Cat.No",
    selector: (row: { catNo: string }) =>
      row.catNo !== null ? row.catNo : "-",
    center: true,
    allowOverflow: true,
  },
  {
    name: "입/출고 수량",
    selector: (row: { stockInOutCnt: number }) =>
      formatNumberWithCommas(row.stockInOutCnt),
    width: "150px",
    center: true,
  },
  {
    name: "잔여 수량",
    selector: (row: { stockCnt: number }) =>
      formatNumberWithCommas(row.stockCnt),
    width: "150px",
    center: true,
  },
  {
    name: "처리일",
    selector: (row: { inOutDttm: string }) =>
      row.inOutDttm !== null ? row.inOutDttm : "-",
    width: "150px",
    center: true,
  },
  {
    name: "관리자",
    selector: (row: { mngrNm: string }) =>
      row.mngrNm !== null ? row.mngrNm : "-",
    width: "150px",
    center: true,
  },
  {
    name: "메모",
    width: "80px",
    center: true,
    cell: (row: { memo: string }) => {
      const { memo } = row;
      return (
        memo !== null &&
        memo !== "" && (
          <Tooltip title={memo} arrow>
            <IconButton size="small">
              <MyIcon icon="memo" size={24} />
            </IconButton>
          </Tooltip>
        )
      );
    },
  },
  {
    width: "80px",
    center: true,
    cell: (row: {
      isCancelButtonStatus: string;
      inOut: string;
      stockInOutUkey: string;
    }) => {
      const { isCancelButtonStatus, inOut, stockInOutUkey } = row;

      const handleDelete = async () => {
        try {
          const res = await DELETE(`/stock/inout/${stockInOutUkey}/out`);
          console.log("Delete 성공 여부", res.success);

          if (res.success) {
            // mutate(`/run/sample/${ukey}?page=1&size=20`);
            toast("삭제 되었습니다.");
          } else {
            toast(res.message);
          }
        } catch (error: any) {
          console.error(
            "입출고 삭제 오류>>>>",
            error.response?.data?.data || error.message,
          );
        } finally {
        }
      };

      return <DeletedButton buttonName="취소" size="small" />;
    },
  },
];
