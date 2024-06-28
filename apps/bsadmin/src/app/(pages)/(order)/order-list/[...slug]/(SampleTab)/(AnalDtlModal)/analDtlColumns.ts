export const columns = [
  {
    name: "샘플번호",
    center: true,
    selector: (row) => row.sampleId,
  },
  {
    name: "샘플명",
    allowOverflow: true,
    selector: (row) => row.sampleNm,
  },
  {
    name: "서비스 타입",
    center: true,
    selector: (row) => row.srvcTypeVal,
  },
  {
    name: "접수",
    center: true,
    selector: (row) => row.sampleStatusRes.rcptStatusVal,
    // width: "75px",
  },
  {
    name: "QC",
    center: true,
    selector: (row) => row.sampleStatusRes.qcStatusVal,
    // width: "75px",
  },
  {
    name: "LIB",
    center: true,
    selector: (row) => row.sampleStatusRes.libStatusVal,
    // width: "75px",
  },
  {
    name: "Seq",
    center: true,
    selector: (row) => row.sampleStatusRes.seqStatusVal,
    // width: "75px",
  },
  {
    name: "BI",
    center: true,
    selector: (row) => row.sampleStatusRes.biStatusVal,
    // width: "75px",
  },
  {
    name: "통보",
    center: true,
    selector: (row) => row.sampleStatusRes.ntfcStatusVal,
    // width: "75px",
  },
  {
    name: "분석내역서",
    center: true,
    selector: (row) => (row.isAnlsItst === "Y" ? "생성" : "-"),
  },
];
