import React from "react";
import {
  Stack,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import { blue, red, grey, green } from "cjbsDSTM/themes/color";
import { cjbsTheme } from "cjbsDSTM";

export const getColumns = (hideDirector: boolean, totalElements: any) => [
  // ... 이전에 ListOrder 컴포넌트 안에 있던 columns 배열의 내용 ...
  {
    name: "No",
    width: "80px",
    center: true,
    sortable: true,
    sortField: "orderId",
    cell: (row: { orderId: number; isFastTrack: string }) => {
      const { orderId, isFastTrack } = row;
      return (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          data-tag="allowRowEvents"
        >
          <Typography variant="body2" data-tag="allowRowEvents">
            {orderId}
          </Typography>

          {isFastTrack === "Y" && (
            <MyIcon icon="fast" size={20} data-tag="allowRowEvents" />
          )}
        </Stack>
      );
    },
  },
  {
    name: "진행 상황",
    center: true,
    width: "100px",
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
    name: "타입",
    // width: "110px",
    center: true,
    // sortable: true,
    selector: (row: { typeVal: string }) => row.typeVal,
  },
  {
    name: "연구책임자",
    minWidth: "220px",
    allowOverflow: false,
    // wrap: true,
    // selector: (row) => "외부 (무료)",
    cell: (row: { custNm: string; custEmail: string }) => {
      const { custNm, custEmail } = row;
      return (
        <Stack data-tag="allowRowEvents">
          <Typography variant="body2" data-tag="allowRowEvents">
            {custNm}
          </Typography>
          <Typography
            variant="body2"
            data-tag="allowRowEvents"
            sx={{
              width: 220,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {custEmail}
          </Typography>
        </Stack>
      );
    },
  },
  {
    name: "거래처",
    minWidth: "220px",
    // selector: (row) => "외부 (무료)",
    cell: (row: { isSpecialMng: string; instNm: string; agncNm: string }) => {
      const { isSpecialMng, instNm, agncNm } = row;
      return (
        <Stack data-tag="allowRowEvents">
          <Box data-tag="allowRowEvents">
            <Stack direction="row" spacing={"2px"} alignItems="center">
              <Typography data-tag="allowRowEvents" variant="body2">
                {agncNm}
              </Typography>
              {isSpecialMng === "Y" && (
                <MyIcon
                  icon="vip-fill"
                  width={15}
                  data-tag="allowRowEvents"
                  color="#FFAB33"
                />
              )}
            </Stack>
          </Box>
          <Typography
            data-tag="allowRowEvents"
            variant="body2"
            sx={{
              width: 220,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            ({instNm})
          </Typography>
        </Stack>
      );
    },
  },
  {
    name: "주문서",
    width: "200px",
    selector: (row: { orshNo: null | string }) =>
      row.orshNo === null ? "-" : row.orshNo,
  },
  {
    name: "샘플종류",
    width: "120px",
    selector: (row: { sampleTypeVal: null | string }) =>
      row.sampleTypeVal === null ? "-" : row.sampleTypeVal,
  },
  {
    name: "분석종류",
    center: true,
    selector: (row: { anlsTypeVal: string }) =>
      row.anlsTypeVal === null ? "-" : row.anlsTypeVal,
  },
  {
    name: "플랫폼",
    width: "200px",
    selector: (row: { pltfVal: null | string }) =>
      row.pltfVal === null ? "-" : row.pltfVal,
  },
  {
    name: "영업담당",
    center: true,
    selector: (row: { bsnsMngrVal: null | string }) =>
      row.bsnsMngrVal === null ? "-" : row.bsnsMngrVal,
  },
  {
    name: "실험담당",
    center: true,
    selector: (row: { expMngrVal: null | string }) =>
      row.expMngrVal === null ? "-" : row.expMngrVal,
  },
  {
    name: "분석담당",
    center: true,
    selector: (row: { anlsMngrVal: null | string }) =>
      row.anlsMngrVal === null ? "-" : row.anlsMngrVal,
  },
  {
    name: "연구담당",
    center: true,
    selector: (row: { prjtMngrVal: null | string }) =>
      row.prjtMngrVal === null ? "-" : row.prjtMngrVal,
  },
  {
    name: "16S 확인",
    sortable: true,
    sortField: "is16S",
    center: true,
    selector: (row: { is16S: null | string }) =>
      row.is16S === null ? "-" : row.is16S,
  },
  {
    name: "DNA반송",
    center: true,
    sortable: true,
    sortField: "isDnaReturn",
    selector: (row: { isDnaReturn: null | string }) =>
      row.isDnaReturn === null ? "-" : row.isDnaReturn,
  },
  {
    name: "샘플반송",
    center: true,
    sortable: true,
    sortField: "isSampleReturn",
    selector: (row: { isSampleReturn: null | string }) =>
      row.isSampleReturn === null ? "-" : row.isSampleReturn,
  },
  {
    name: "오더금액",
    right: true,
    sortable: true,
    sortField: "price",
    selector: (row: { price: number | null }) =>
      row.price === null ? "-" : formatNumberWithCommas(row.price),
  },
  {
    name: "RUN",
    right: true,
    selector: (row: { runList: null | string[] }) =>
      row.runList === null ? "-" : row.runList,
  },
  {
    name: "과제명",
    omit: hideDirector,
    selector: (row: { prjtCodeVal: null | string }) =>
      row.prjtCodeVal === null ? "-" : row.prjtCodeVal,
  },
  {
    name: "연구명",
    omit: hideDirector,
    selector: (row: { prjtDetailCodeVal: null | string }) =>
      row.prjtDetailCodeVal === null ? "-" : row.prjtDetailCodeVal,
  },
  {
    name: "분석 내역서",
    width: "120px",
    right: true,
    sortable: true,
    sortField: "anlsItstCount",
    selector: (row: { anlsItstCount: number }) => row.anlsItstCount,
  },
  {
    name: "샘플 수",
    right: true,
    sortable: true,
    sortField: "sampleCount",
    selector: (row: { sampleCount: number }) => row.sampleCount,
  },
  {
    name: "오더생성일",
    right: true,
    width: "120px",
    sortable: true,
    sortField: "createDttm",
    selector: (row: { createDttm: null | string }) =>
      row.createDttm === null ? "-" : row.createDttm,
  },
  {
    name: "샘플 접수일",
    right: true,
    width: "120px",
    sortable: true,
    sortField: "rcptDttm",
    selector: (row: { rcptDttm: null | string }) =>
      row.rcptDttm === null ? "-" : row.rcptDttm,
  },
  {
    name: "PCR/Lib 완료일",
    right: true,
    width: "150px",
    sortable: true,
    sortField: "libCompDttm",
    allowOverflow: true,
    selector: (row: { libCompDttm: null | string }) =>
      row.libCompDttm === null ? "-" : row.libCompDttm,
  },
  {
    name: "Seq완료일",
    right: true,
    width: "120px",
    sortable: true,
    sortField: "seqCompDttm",
    selector: (row: { seqCompDttm: null | string }) =>
      row.seqCompDttm === null ? "-" : row.seqCompDttm,
  },
  {
    name: "분석 완료일",
    right: true,
    width: "120px",
    sortable: true,
    sortField: "biCompDttm",
    selector: (row: { biCompDttm: null | string }) =>
      row.biCompDttm === null ? "-" : row.biCompDttm,
  },
  {
    name: "완료 통보일",
    right: true,
    width: "120px",
    sortable: true,
    sortField: "ntfcCompDttm",
    selector: (row: { ntfcCompDttm: null | string }) =>
      row.ntfcCompDttm === null ? "-" : row.ntfcCompDttm,
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
];

// const columns = useMemo(
//   () => [
//     {
//       name: "No",
//       width: "80px",
//       center: true,
//       sortable: true,
//       sortField: "orderId",
//       cell: (row: { orderId: number; isFastTrack: string }) => {
//         const { orderId, isFastTrack } = row;
//         return (
//           <Stack
//             direction="row"
//             alignItems="center"
//             spacing={0.5}
//             data-tag="allowRowEvents"
//           >
//             <Typography variant="body2" data-tag="allowRowEvents">
//               {orderId}
//             </Typography>
//
//             {isFastTrack === "Y" && (
//               <MyIcon icon="fast" size={20} data-tag="allowRowEvents" />
//             )}
//           </Stack>
//         );
//       },
//     },
//     {
//       name: "진행 상황",
//       center: true,
//       width: "100px",
//       cell: (row: { orderStatusVal: string }) => {
//         const { orderStatusVal } = row;
//         return (
//           <Chip
//             data-tag="allowRowEvents"
//             label={orderStatusVal}
//             size="small"
//             sx={{
//               backgroundColor:
//                 orderStatusVal === "진행중"
//                   ? blue["50"]
//                   : orderStatusVal === "완료"
//                     ? green["50"]
//                     : orderStatusVal === "취소"
//                       ? red["50"]
//                       : grey["100"],
//               color:
//                 orderStatusVal === "진행중"
//                   ? cjbsTheme.palette.primary.main
//                   : orderStatusVal === "완료"
//                     ? cjbsTheme.palette.success.main
//                     : orderStatusVal === "취소"
//                       ? cjbsTheme.palette.error.main
//                       : cjbsTheme.palette.common.black,
//             }}
//           />
//         );
//       },
//     },
//     {
//       name: "타입",
//       // width: "110px",
//       center: true,
//       // sortable: true,
//       selector: (row: { typeVal: string }) => row.typeVal,
//     },
//     {
//       name: "연구책임자",
//       minWidth: "220px",
//       allowOverflow: false,
//       // wrap: true,
//       // selector: (row) => "외부 (무료)",
//       cell: (row: { custNm: string; custEmail: string }) => {
//         const { custNm, custEmail } = row;
//         return (
//           <Stack data-tag="allowRowEvents">
//             <Typography variant="body2" data-tag="allowRowEvents">
//               {custNm}
//             </Typography>
//             <Typography
//               variant="body2"
//               data-tag="allowRowEvents"
//               sx={{
//                 width: 220,
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {custEmail}
//             </Typography>
//           </Stack>
//         );
//       },
//     },
//     {
//       name: "거래처",
//       minWidth: "220px",
//       // selector: (row) => "외부 (무료)",
//       cell: (row: {
//         isSpecialMng: string;
//         instNm: string;
//         agncNm: string;
//       }) => {
//         const { isSpecialMng, instNm, agncNm } = row;
//         return (
//           <Stack data-tag="allowRowEvents">
//             <Box data-tag="allowRowEvents">
//               <Stack direction="row" spacing={"2px"} alignItems="center">
//                 <Typography data-tag="allowRowEvents" variant="body2">
//                   {agncNm}
//                 </Typography>
//                 {isSpecialMng === "Y" && (
//                   <MyIcon
//                     icon="vip-fill"
//                     width={15}
//                     data-tag="allowRowEvents"
//                     color="#FFAB33"
//                   />
//                 )}
//               </Stack>
//             </Box>
//             <Typography
//               data-tag="allowRowEvents"
//               variant="body2"
//               sx={{
//                 width: 220,
//                 textOverflow: "ellipsis",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               ({instNm})
//             </Typography>
//           </Stack>
//         );
//       },
//     },
//     {
//       name: "주문서",
//       width: "200px",
//       selector: (row: { orshNo: null | string }) =>
//         row.orshNo === null ? "-" : row.orshNo,
//     },
//     {
//       name: "샘플종류",
//       width: "120px",
//       selector: (row: { sampleTypeVal: null | string }) =>
//         row.sampleTypeVal === null ? "-" : row.sampleTypeVal,
//     },
//     {
//       name: "분석종류",
//       center: true,
//       selector: (row: { anlsTypeVal: string }) =>
//         row.anlsTypeVal === null ? "-" : row.anlsTypeVal,
//     },
//     {
//       name: "플랫폼",
//       width: "200px",
//       selector: (row: { pltfVal: null | string }) =>
//         row.pltfVal === null ? "-" : row.pltfVal,
//     },
//     {
//       name: "영업담당",
//       center: true,
//       selector: (row: { bsnsMngrVal: null | string }) =>
//         row.bsnsMngrVal === null ? "-" : row.bsnsMngrVal,
//     },
//     {
//       name: "실험담당",
//       center: true,
//       selector: (row: { expMngrVal: null | string }) =>
//         row.expMngrVal === null ? "-" : row.expMngrVal,
//     },
//     {
//       name: "분석담당",
//       center: true,
//       selector: (row: { anlsMngrVal: null | string }) =>
//         row.anlsMngrVal === null ? "-" : row.anlsMngrVal,
//     },
//     {
//       name: "연구담당",
//       center: true,
//       selector: (row: { prjtMngrVal: null | string }) =>
//         row.prjtMngrVal === null ? "-" : row.prjtMngrVal,
//     },
//     {
//       name: "16S 확인",
//       sortable: true,
//       sortField: "is16S",
//       center: true,
//       selector: (row: { is16S: null | string }) =>
//         row.is16S === null ? "-" : row.is16S,
//     },
//     {
//       name: "DNA반송",
//       center: true,
//       sortable: true,
//       sortField: "isDnaReturn",
//       selector: (row: { isDnaReturn: null | string }) =>
//         row.isDnaReturn === null ? "-" : row.isDnaReturn,
//     },
//     {
//       name: "샘플반송",
//       center: true,
//       sortable: true,
//       sortField: "isSampleReturn",
//       selector: (row: { isSampleReturn: null | string }) =>
//         row.isSampleReturn === null ? "-" : row.isSampleReturn,
//     },
//     {
//       name: "오더금액",
//       right: true,
//       sortable: true,
//       sortField: "price",
//       selector: (row: { price: number | null }) =>
//         row.price === null ? "-" : formatNumberWithCommas(row.price),
//     },
//     {
//       name: "RUN",
//       right: true,
//       selector: (row: { runList: null | string[] }) =>
//         row.runList === null ? "-" : row.runList,
//     },
//     {
//       name: "과제명",
//       omit: hideDirector,
//       selector: (row: { prjtCodeVal: null | string }) =>
//         row.prjtCodeVal === null ? "-" : row.prjtCodeVal,
//     },
//     {
//       name: "연구명",
//       omit: hideDirector,
//       selector: (row: { prjtDetailCodeVal: null | string }) =>
//         row.prjtDetailCodeVal === null ? "-" : row.prjtDetailCodeVal,
//     },
//     {
//       name: "분석 내역서",
//       width: "120px",
//       right: true,
//       sortable: true,
//       sortField: "anlsItstCount",
//       selector: (row: { anlsItstCount: number }) => row.anlsItstCount,
//     },
//     {
//       name: "샘플 수",
//       right: true,
//       sortable: true,
//       sortField: "sampleCount",
//       selector: (row: { sampleCount: number }) => row.sampleCount,
//     },
//     {
//       name: "오더생성일",
//       right: true,
//       width: "120px",
//       sortable: true,
//       sortField: "createDttm",
//       selector: (row: { createDttm: null | string }) =>
//         row.createDttm === null ? "-" : row.createDttm,
//     },
//     {
//       name: "샘플 접수일",
//       right: true,
//       width: "120px",
//       sortable: true,
//       sortField: "rcptDttm",
//       selector: (row: { rcptDttm: null | string }) =>
//         row.rcptDttm === null ? "-" : row.rcptDttm,
//     },
//     {
//       name: "PCR/Lib 완료일",
//       right: true,
//       width: "140px",
//       sortable: true,
//       sortField: "libCompDttm",
//       selector: (row: { libCompDttm: null | string }) =>
//         row.libCompDttm === null ? "-" : row.libCompDttm,
//     },
//     {
//       name: "Seq완료일",
//       right: true,
//       width: "120px",
//       sortable: true,
//       sortField: "seqCompDttm",
//       selector: (row: { seqCompDttm: null | string }) =>
//         row.seqCompDttm === null ? "-" : row.seqCompDttm,
//     },
//     {
//       name: "분석 완료일",
//       right: true,
//       width: "120px",
//       sortable: true,
//       sortField: "biCompDttm",
//       selector: (row: { biCompDttm: null | string }) =>
//         row.biCompDttm === null ? "-" : row.biCompDttm,
//     },
//     {
//       name: "완료 통보일",
//       right: true,
//       width: "120px",
//       sortable: true,
//       sortField: "ntfcCompDttm",
//       selector: (row: { ntfcCompDttm: null | string }) =>
//         row.ntfcCompDttm === null ? "-" : row.ntfcCompDttm,
//     },
//     {
//       name: "메모",
//       width: "80px",
//       center: true,
//       cell: (row: { memo: string }) => {
//         const { memo } = row;
//         return (
//           memo !== null &&
//           memo !== "" && (
//             <Tooltip title={memo} arrow>
//               <IconButton size="small">
//                 <MyIcon icon="memo" size={24} />
//               </IconButton>
//             </Tooltip>
//           )
//         );
//       },
//     },
//   ],
//   [hideDirector, totalElements],
// );
