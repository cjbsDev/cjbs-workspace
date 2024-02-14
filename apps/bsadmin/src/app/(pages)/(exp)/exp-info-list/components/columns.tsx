import React from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import ResultHistory from "./resultHistory";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  resultHistoryModalOpenAtom,
  sampleUkeyAtom,
} from "./resultHistory/atom";

const useSampleCell = (sampleUkey: string) => {
  const [isOpen, setIsOpen] = useRecoilState(
    resultHistoryModalOpenAtom(sampleUkey),
  );
  const setSampleUkey = useSetRecoilState(sampleUkeyAtom);

  const handleModalOpen = () => {
    setIsOpen(true);
    setSampleUkey(sampleUkey);
  };

  return { handleModalOpen, isOpen };
};

const formatValue = (value: string) => (value === null ? "-" : value);

export const Columns = () => [
  {
    name: "Order",
    width: "80px",
    // sortable: true,
    // center: true,
    selector: (row, index) => row.orderId,
  },
  {
    name: "Run No",
    width: "80px",
    // sortable: true,
    selector: (row) => formatValue(row.runId),
  },
  {
    name: "No",
    width: "80px",
    // sortable: true,
    // center: true,
    selector: (row) => formatValue(row.turnId),
  },
  {
    name: "샘플번호",
    // sortable: true,
    // selector: (row: { sampleId: number }) => row.sampleId,
    cell: (row: { sampleId: number; sampleUkey: string }) => {
      const { sampleId, sampleUkey } = row;
      const { handleModalOpen } = useSampleCell(sampleUkey);

      return (
        <>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">{sampleId}</Typography>
            <IconButton size="small" onClick={handleModalOpen}>
              <MyIcon icon="arrow-clockwise" size={18} />
            </IconButton>
          </Stack>
          <ResultHistory sampleUkey={sampleUkey} />
        </>
      );
    },
  },
  {
    name: "상태",
    selector: (row) => row.orderStatusVal,
  },
  {
    name: "Type",
    selector: (row) => formatValue(row.srvcTypeVal),
  },
  {
    name: "분석타입",
    selector: (row) => formatValue(row.anlsTypeVal),
  },
  {
    name: "거래처(PI)",
    width: "120px",
    right: true,
    selector: (row) => row.agncNm,
  },
  {
    name: "연구책임자",
    // width: "100px",
    // right: true,
    selector: (row) => row.rhpiNm,
  },
  {
    name: "샘플명",
    width: "100px",
    center: true,
    selector: (row) => formatValue(row.sampleNm),
  },
  {
    name: "대체명",
    width: "120px",
    right: true,
    selector: (row) => formatValue(row.altrNm),
  },
  {
    name: "Taxon",
    width: "120px",
    right: true,
    selector: (row) => formatValue(row.taxonVal),
  },
  {
    name: "Source",
    width: "120px",
    right: true,
    selector: (row) => formatValue(row.source),
  },
  {
    name: "Memo",
    width: "120px",
    right: true,
    selector: (row) => formatValue(row.memo),
  },
  {
    name: "실험자1",
    width: "120px",
    right: true,
    selector: (row) => (row.prepExpMngrVal === null ? "-" : row.prepExpMngrVal),
  },
  {
    name: "실험자2",
    width: "120px",
    right: true,
    selector: (row) => (row.libExpMngrVal === null ? "-" : row.libExpMngrVal),
  },
  {
    name: "실험자3",
    width: "120px",
    right: true,
    selector: (row) => (row.seqExpMngrVal === null ? "-" : row.seqExpMngrVal),
  },
  {
    name: "접수날짜",
    width: "120px",
    right: true,
    selector: (row) => (row.rcptDttm === null ? "-" : row.rcptDttm),
  },
];
