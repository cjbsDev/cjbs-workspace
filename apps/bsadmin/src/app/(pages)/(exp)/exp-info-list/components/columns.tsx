import React from "react";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import ResultHistory from "./resultHistory";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  resultHistoryModalOpenAtom,
  sampleUkeyAtom,
} from "./resultHistory/atom";
import { blue, cjbsTheme, green, grey, red } from "cjbsDSTM";

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
    center: true,
    allowOverflow: true,
    selector: (row, index) => row.orderId,
  },
  {
    name: "Run No",
    width: "100px",
    // sortable: true,
    center: true,
    allowOverflow: true,
    selector: (row) => formatValue(row.runId),
  },
  {
    name: "No",
    width: "60px",
    allowOverflow: true,
    center: true,
    selector: (row) => formatValue(row.turnId),
  },
  {
    name: "샘플번호",
    center: true,
    allowOverflow: true,
    width: "120px",
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
              <MyIcon icon="history" size={18} />
            </IconButton>
          </Stack>
          <ResultHistory sampleUkey={sampleUkey} />
        </>
      );
    },
  },
  {
    name: "상태",
    center: true,
    selector: (row) => row.orderStatusVal,
    cell: (row: { orderStatusVal: string }) => {
      const { orderStatusVal } = row;
      return (
        <Chip
          data-tag="allowRowEvents"
          label={orderStatusVal}
          size="small"
          sx={{
            backgroundColor:
              orderStatusVal === "진행중"
                ? blue["50"]
                : orderStatusVal === "완료"
                  ? green["50"]
                  : orderStatusVal === "취소"
                    ? red["50"]
                    : grey["100"],
            color:
              orderStatusVal === "진행중"
                ? cjbsTheme.palette.primary.main
                : orderStatusVal === "완료"
                  ? cjbsTheme.palette.success.main
                  : orderStatusVal === "취소"
                    ? cjbsTheme.palette.error.main
                    : cjbsTheme.palette.common.black,
          }}
        />
      );
    },
  },
  {
    name: "Type",
    minWidth: "150px",
    wrap: true,
    selector: (row) => formatValue(row.srvcTypeVal),
  },
  {
    name: "분석타입",
    center: true,
    selector: (row) => formatValue(row.anlsTypeVal),
  },
  {
    name: "거래처(PI)",
    minWidth: "250px",
    wrap: true,
    // allowOverflow: true,
    // grow: 2,
    // right: true,
    selector: (row) => row.agncNm,
  },
  {
    name: "연구책임자",
    minWidth: "150px",
    wrap: true,
    center: true,
    selector: (row) => row.rhpiNm,
  },
  {
    name: "샘플명",
    minWidth: "250px",
    wrap: true,
    center: true,
    selector: (row) => formatValue(row.sampleNm),
  },
  {
    name: "대체명",
    minWidth: "250px",
    wrap: true,
    center: true,
    selector: (row) => formatValue(row.altrNm),
  },
  {
    name: "Taxon",
    width: "100px",
    center: true,
    selector: (row) => formatValue(row.taxonVal),
  },
  {
    name: "Source",
    minWidth: "200px",
    wrap: true,
    center: true,
    selector: (row) => formatValue(row.source),
  },
  {
    name: "Memo",
    width: "80px",
    // right: true,
    center: true,
    // selector: (row) => formatValue(row.memo),
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
    name: "실험자1(Prep)",
    width: "140px",
    center: true,
    selector: (row) => (row.prepExpMngrVal === null ? "-" : row.prepExpMngrVal),
  },
  {
    name: "실험자2(Lib)",
    width: "140px",
    center: true,
    selector: (row) => (row.libExpMngrVal === null ? "-" : row.libExpMngrVal),
  },
  {
    name: "실험자3(Seq)",
    width: "140px",
    center: true,
    selector: (row) => (row.seqExpMngrVal === null ? "-" : row.seqExpMngrVal),
  },
  {
    name: "접수날짜",
    width: "120px",
    right: true,
    selector: (row) => (row.rcptDttm === null ? "-" : row.rcptDttm),
  },
  {
    name: "Prep 담당자",
    width: "120px",
    center: true,
    selector: (row) => (row.prepMngrNm === null ? "-" : row.prepMngrNm),
  },
  {
    name: "QC 사용 kit",
    width: "120px",
    center: true,
    selector: (row) => (row.prepUsedKit === null ? "-" : row.prepUsedKit),
  },
  {
    name: "UV conc.(ng/ul)",
    width: "160px",
    // allowOverflow: true,
    right: true,
    selector: (row) => (row.prepUvConc === null ? "-" : row.prepUvConc),
  },
  {
    name: "Qubit onc.(ng/ul)",
    width: "160px",
    right: true,
    selector: (row) => (row.prepQubitConc === null ? "-" : row.prepQubitConc),
  },
  {
    name: "Volume(ul)",
    width: "120px",
    right: true,
    selector: (row) => (row.prepVm === null ? "-" : row.prepVm),
  },
  {
    name: "A260/A280 ratio",
    width: "160px",
    right: true,
    selector: (row) => (row.prepARatio === null ? "-" : row.prepARatio),
  },
  {
    name: "Total amount(ug)",
    width: "160px",
    right: true,
    selector: (row) =>
      row.prepTotalAmount === null ? "-" : row.prepTotalAmount,
  },
  {
    name: "humic 처리여부",
    width: "160px",
    center: true,
    selector: (row) => (row.prepHmc === null ? "-" : row.prepHmc),
  },
  {
    name: "humic 후 농도 (ng/ul)",
    width: "180px",
    right: true,
    selector: (row) => (row.prepHmcDnst === null ? "-" : row.prepHmcDnst),
  },
  {
    name: "QC result",
    width: "120px",
    center: true,
    selector: (row) => (row.prepHmcDnst === null ? "-" : row.prepHmcDnst),
  },
  {
    name: "QC 날짜",
    width: "120px",
    right: true,
    selector: (row) => (row.prepCompDttm === null ? "-" : row.prepCompDttm),
  },
  {
    name: "Lib 담당자",
    width: "120px",
    center: true,
    selector: (row) => (row.libMngrNm === null ? "-" : row.libMngrNm),
  },
  {
    name: "PCR type",
    width: "120px",
    center: true,
    selector: (row) => (row.libPcrType === null ? "-" : row.libPcrType),
  },
  {
    name: "Input amt.(ng)",
    width: "160px",
    right: true,
    selector: (row) => (row.libInputAmt === null ? "-" : row.libInputAmt),
  },
  {
    name: "Dilution Ratio",
    width: "160px",
    right: true,
    selector: (row) => (row.libDltnRatio === null ? "-" : row.libDltnRatio),
  },
  {
    name: "Index 1 (i7)",
    width: "120px",
    right: true,
    selector: (row) => (row.libIndexOne === null ? "-" : row.libIndexOne),
  },
  {
    name: "Index 2 (i5)",
    width: "120px",
    right: true,
    selector: (row) => (row.libIndexTwo === null ? "-" : row.libIndexTwo),
  },
  {
    name: "Picogreen Conc.(ng/ul)",
    width: "200px",
    right: true,
    selector: (row) => (row.libPcgrConc === null ? "-" : row.libPcgrConc),
  },
  {
    name: "pooling vol.(ul)",
    width: "160px",
    right: true,
    selector: (row) => (row.libPlinVol === null ? "-" : row.libPlinVol),
  },
  {
    name: "BA size(bp)",
    width: "120px",
    right: true,
    selector: (row) => (row.libBaSize === null ? "-" : row.libBaSize),
  },
  {
    name: "Tapestation size (bp)",
    width: "180px",
    right: true,
    selector: (row) => (row.libTapst === null ? "-" : row.libTapst),
  },
  {
    name: "Lib QC result",
    width: "120px",
    center: true,
    selector: (row) => (row.libResult === null ? "-" : row.libResult),
  },
  {
    name: "Lib 날짜",
    width: "120px",
    right: true,
    selector: (row) => (row.libCompDttm === null ? "-" : row.libCompDttm),
  },
  {
    name: "Lib comments",
    width: "180px",
    selector: (row) => (row.libComment === null ? "-" : row.libComment),
  },
  {
    name: "Seq 담당자",
    width: "120px",
    center: true,
    selector: (row) => (row.seqMngrNm === null ? "-" : row.seqMngrNm),
  },
  {
    name: "Seq kit 정보",
    minWidth: "200px",
    center: true,
    wrap: true,
    selector: (row) => (row.seqUsedKit === null ? "-" : row.seqUsedKit),
  },
  {
    name: "Seq 장비",
    minWidth: "150px",
    wrap: true,
    center: true,
    selector: (row) => (row.seqMchn === null ? "-" : row.seqMchn),
  },
  {
    name: "Seq 결과",
    width: "120px",
    center: true,
    selector: (row) => (row.seqResult === null ? "-" : row.seqResult),
  },
  {
    name: "생산량 (Gb)",
    width: "120px",
    center: true,
    selector: (row) => (row.seqOutput === null ? "-" : row.seqOutput),
  },
  {
    name: "생산량 raw reads",
    width: "180px",
    center: true,
    selector: (row) =>
      row.seqOutputRawReads === null ? "-" : row.seqOutputRawReads,
  },
  {
    name: "생산량 valid reads",
    width: "180px",
    center: true,
    selector: (row) =>
      row.seqOutputValidReads === null ? "-" : row.seqOutputValidReads,
  },
  {
    name: "재런 여부",
    width: "120px",
    center: true,
    selector: (row) => (row.seqReRunId === null ? "-" : row.seqReRunId),
  },
  {
    name: "Seq 날짜",
    width: "120px",
    right: true,
    selector: (row) => (row.seqCompDttm === null ? "-" : row.seqCompDttm),
  },
  {
    name: "분석 날짜",
    width: "120px",
    right: true,
    selector: (row) => (row.biCompDttm === null ? "-" : row.biCompDttm),
  },
  {
    name: "실험 종류",
    width: "120px",
    center: true,
    selector: (row) => (row.otsRunType === null ? "-" : row.otsRunType),
  },
  {
    name: "업체",
    width: "120px",
    center: true,
    selector: (row) => (row.otsCoNm === null ? "-" : row.otsCoNm),
  },
  {
    name: "Fast track",
    width: "120px",
    center: true,
    selector: (row) => (row.isFastTrack === null ? "-" : row.isFastTrack),
  },
];
