"use client";

import React, { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  ContainedButton,
  cjbsTheme,
  FileDownloadBtn,
  OutlinedButton,
} from "cjbsDSTM";
import { Box, Stack, Grid, Typography, Chip } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import IconDescBar from "../../../components/IconDescBar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
import Link from "next/link";
import { blue, red, grey, green } from "cjbsDSTM/themes/color";
import ResultInSearch from "./ResultInSearch";
import { useSWRConfig } from "swr";
const ListOrder = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("order", page, perPage);
  console.log("DATA", data);
  const totalElements = data.pageInfo.totalElements;
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { mutate } = useSWRConfig();

  const columns = useMemo(
    () => [
      {
        name: "No",
        width: "120px",
        sortable: true,
        // selector: (row) => row.orderId,
        cell: (row) => {
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
              {/*{isFastTrack === "Y" && (*/}
              {/*  <MyIcon icon="re" size={20} data-tag="allowRowEvents" />*/}
              {/*)}*/}
            </Stack>
          );
        },
      },
      {
        name: "진행 상황",
        width: "105px",
        sortable: true,
        cell: (row) => {
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
        width: "110px",
        sortable: true,
        selector: (row) => row.typeVal,
      },
      {
        name: "고객",
        width: "200px",
        // selector: (row) => "외부 (무료)",
        cell: (row) => {
          const { custNm, custEmail } = row;
          return (
            <Stack data-tag="allowRowEvents">
              <Typography variant="body2" data-tag="allowRowEvents">
                {custNm}
              </Typography>
              <Typography variant="body2" data-tag="allowRowEvents">
                {custEmail}
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "거래처",
        width: "170px",
        // selector: (row) => "외부 (무료)",
        cell: (row) => {
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
              <Typography data-tag="allowRowEvents" variant="body2">
                ({instNm})
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "거래처",
        width: "170px",
        // selector: (row) => "외부 (무료)",
        cell: (row) => {
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
              <Typography data-tag="allowRowEvents" variant="body2">
                ({instNm})
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "거래처",
        width: "170px",
        // selector: (row) => "외부 (무료)",
        cell: (row) => {
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
              <Typography data-tag="allowRowEvents" variant="body2">
                ({instNm})
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "거래처",
        width: "170px",
        // selector: (row) => "외부 (무료)",
        cell: (row) => {
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
              <Typography data-tag="allowRowEvents" variant="body2">
                ({instNm})
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "샘플종류",
        width: "120px",
        selector: (row) => (row.sampleType === null ? "-" : row.sampleType),
      },
      {
        name: "16S 확인",
        selector: (row) => row.is16S,
      },
      {
        name: "DNA반송",
        selector: (row) => row.isDnaReturn,
      },
      {
        name: "샘플반송",
        selector: (row) => row.isSampleReturn,
      },
      {
        name: "오더금액",
        selector: (row) =>
          row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "Rating",
        selector: (row) => row.rating,
      },
      {
        name: "Stock",
        selector: (row) => row.stock,
      },
    ],
    []
  );

  const filteredData = data.orderList.filter(
    (item) =>
      (item.custNm &&
        item.custNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.ebcEmail &&
        item.ebcEmail.toLowerCase().includes(filterText.toLowerCase()))
  );

  // console.log("filteredData ==>>", filteredData);

  const goDetailPage = (row: any) => {
    const path = row.orderUkey;
    router.push("/order-list/" + path);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const newDataChange = () => {
      mutate(`/order/list?page=${page}&size=${perPage}`, [
        {
          orderId: 168,
          orderUkey: "3dBRGV",
          orshId: 47,
          orshNo: "NMT202309-43251",
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "좋아요",
          custEmail: "yangkyu.choi@cj.net",
          agncNm: "좋아요 좋아굿",
          instNm: "부경대학교",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008001",
          pltfVal: "illumina MiSeq 2x250",
          bsnsMngrVal: "윤영업",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "N",
          isSampleReturn: "N",
          price: 0,
          runList: null,
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 2,
          createDttm: "2023-09-15",
          rcptDttm: null,
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "",
        },
        {
          orderId: 167,
          orderUkey: "gLBY4R",
          orshId: 46,
          orshNo: "NMT202309-87280",
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "좋아요",
          custEmail: "yangkyu.choi@cj.net",
          agncNm: "좋아요 좋아굿",
          instNm: "부경대학교",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008001",
          pltfVal: "illumina MiSeq 2x250",
          bsnsMngrVal: "윤영업",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "N",
          isSampleReturn: "N",
          price: 0,
          runList: null,
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 2,
          createDttm: "2023-09-15",
          rcptDttm: null,
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "memo",
        },
        {
          orderId: 166,
          orderUkey: "kRup5e",
          orshId: null,
          orshNo: null,
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800002",
          typeVal: "무료",
          custNm: "신지연",
          custEmail: "jyshin222@cj.net",
          agncNm: "야호2",
          instNm: "농촌진흥청 국립농업과학원",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008001",
          pltfVal: "illumina MiSeq 2x250",
          bsnsMngrVal: "이영업",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "Y",
          isSampleReturn: "N",
          price: 2222,
          runList: null,
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 2,
          createDttm: "2023-09-14",
          rcptDttm: null,
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "",
        },
        {
          orderId: 165,
          orderUkey: "wmSGcq",
          orshId: null,
          orshNo: null,
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "신지연",
          custEmail: "jyshin222@cj.net",
          agncNm: "야호2",
          instNm: "농촌진흥청 국립농업과학원",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008001",
          pltfVal: "illumina MiSeq 2x250",
          bsnsMngrVal: "김영업",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "Y",
          isSampleReturn: "N",
          price: 223,
          runList: ["2"],
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 350,
          createDttm: "2023-09-06",
          rcptDttm: null,
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "",
        },
        {
          orderId: 164,
          orderUkey: "qQ4Ke5",
          orshId: 1,
          orshNo: "CJCJ012321-1231",
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "서형석",
          custEmail: "hyungseok.seo@chunlab.com",
          agncNm: "하하거래처",
          instNm: "수정테스트",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008006",
          pltfVal: "Illumina NextSeq 2x150",
          bsnsMngrVal: "김영업",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "N",
          isSampleReturn: "N",
          price: 0,
          runList: ["2"],
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 2,
          createDttm: "2023-09-01",
          rcptDttm: null,
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "memo",
        },
        {
          orderId: 163,
          orderUkey: "z1XrhG",
          orshId: 33,
          orshNo: "NMT202308-21302",
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "좋아요",
          custEmail: "yangkyu.choi@cj.net",
          agncNm: "좋아요 좋아굿",
          instNm: "부경대학교",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008006",
          pltfVal: "Illumina NextSeq 2x150",
          bsnsMngrVal: "신영업",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "N",
          isSampleReturn: "N",
          price: 0,
          runList: null,
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 1,
          createDttm: "2023-09-01",
          rcptDttm: null,
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "memo",
        },
        {
          orderId: 162,
          orderUkey: "buJWYU",
          orshId: 28,
          orshNo: "NMT202308-18380",
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "신지연",
          custEmail: "jyshin221@cj.net",
          agncNm: "하하하하Go",
          instNm: "엔터바이오",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008004",
          pltfVal: "MTP Premium Add-on 2",
          bsnsMngrVal: "윤영업",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "N",
          isSampleReturn: "N",
          price: 0,
          runList: null,
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 1,
          createDttm: "2023-08-29",
          rcptDttm: "2023-08-04",
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "메모 입니다~~~~~~~~~~~~~~~",
        },
        {
          orderId: 151,
          orderUkey: "QDsUmB",
          orshId: null,
          orshNo: null,
          isFastTrack: "Y",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "윤성미2",
          custEmail: "test1234562@cj.net",
          agncNm: "첫번째친구",
          instNm: "유비텍(UBTech)",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008004",
          pltfVal: "MTP Premium Add-on 2",
          bsnsMngrVal: "Test",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "Y",
          isSampleReturn: "N",
          price: 1242321,
          runList: null,
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 1,
          createDttm: "2023-08-16",
          rcptDttm: null,
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "윤성미 TEST",
        },
        {
          orderId: 150,
          orderUkey: "RUKLpH",
          orshId: null,
          orshNo: null,
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "윤성미2",
          custEmail: "test1234562@cj.net",
          agncNm: "첫번째친구",
          instNm: "유비텍(UBTech)",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008004",
          pltfVal: "MTP Premium Add-on 2",
          bsnsMngrVal: "Test",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "Y",
          isSampleReturn: "N",
          price: 1242321,
          runList: ["2"],
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 9,
          createDttm: "2023-08-16",
          rcptDttm: "2023-07-04",
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "메모 입니다~~~~~~~~~~~~~~~",
        },
        {
          orderId: 149,
          orderUkey: "ARu6Cj",
          orshId: null,
          orshNo: null,
          isFastTrack: "N",
          orderStatusCc: "BS_0802001",
          orderStatusVal: "미접수",
          intnExtrClCc: "BS_0805002",
          intnExtrClVal: "영업용(외부)",
          typeCc: "BS_0800001",
          typeVal: "일반",
          custNm: "윤성미2",
          custEmail: "test1234562@cj.net",
          agncNm: "첫번째친구",
          instNm: "유비텍(UBTech)",
          isSpecialMng: "N",
          sampleType: null,
          anlsTypeMc: "BS_0100006004",
          anlsTypeVal: "MTP",
          pltfMc: "BS_0100008004",
          pltfVal: "MTP Premium Add-on 2",
          bsnsMngrVal: "Test",
          expMngrVal: null,
          anlsMngrVal: null,
          prjtMngrVal: null,
          is16S: "N",
          isDnaReturn: "Y",
          isSampleReturn: "N",
          price: 1242321,
          runList: null,
          prjtCodeMc: null,
          prjtCode: null,
          prjtCodeVal: null,
          prjtDetailCodeMc: null,
          prjtDetailCode: null,
          prjtDetailCodeVal: null,
          anlsInstCount: 0,
          sampleCount: 3,
          createDttm: "2023-08-16",
          rcptDttm: "2023-09-03",
          libCompDttm: null,
          seqCompDttm: null,
          biCompDttm: null,
          ntfcCompDttm: null,
          memo: "메모 입니다~~~~~~~~~~~~~~~",
        },
      ]);
    };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <Link href="/order-reg">
              <ContainedButton buttonName="오더 등록" size="small" />
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            {/*<OutlinedButton buttonName="NewData" onClick={newDataChange} />*/}

            <IconDescBar freeDisabled={true} reOrder={true} />

            <FileDownloadBtn exportUrl="/order/list/download" iconName="xls3" />

            <DataTableFilter
              onFilter={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
            <ResultInSearch />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, checked]);

  const handlePageChange = (page: number) => {
    // console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    // console.log("Row change.....", newPerPage, page);
    setPage(page);
    setPerPage(newPerPage);
  };

  return (
    <DataTableBase
      title={<Title1 titleName="오더 관리" />}
      data={filteredData}
      columns={columns}
      onRowClicked={goDetailPage}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      selectableRows={false}
      pagination
      paginationServer
      paginationTotalRows={totalElements}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

export default ListOrder;
