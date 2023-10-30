import React from "react";

const AnalDtlColumns = React.memo(() => {
  return [
    {
      name: "샘플번호",
      selector: (row) => row.sampleId,
    },
    {
      name: "샘플명",
      selector: (row) => row.sampleNm,
    },
    {
      name: "서비스 타입",
      selector: (row) => row.srvcTypeVal,
    },
    {
      name: "접수",
      selector: (row) => row.sampleStatusRes.rcptStatusVal,
      width: "75px",
    },
    {
      name: "QC",
      selector: (row) => row.sampleStatusRes.qcStatusVal,
      width: "75px",
    },
    {
      name: "LIB",
      selector: (row) => row.sampleStatusRes.libStatusVal,
      width: "75px",
    },
    {
      name: "Seq",
      selector: (row) => row.sampleStatusRes.seqStatusVal,
      width: "75px",
    },
    {
      name: "BI",
      selector: (row) => row.sampleStatusRes.biStatusVal,
      width: "75px",
    },
    {
      name: "통보",
      selector: (row) => row.sampleStatusRes.ntfcStatusVal,
      width: "75px",
    },
    {
      name: "분석내역서",
      selector: (row) => (row.isAnlsInst === "Y" ? "생성" : "-"),
    },
  ];
});

export default AnalDtlColumns;
