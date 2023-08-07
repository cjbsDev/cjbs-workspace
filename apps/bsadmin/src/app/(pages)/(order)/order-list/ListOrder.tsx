"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  ExcelDownloadButton,
  UnStyledButton,
  OutlinedButton,
  ContainedButton,
  CheckboxGV,
  Form,
  CustomToggleButton,
  cjbsTheme,
} from "cjbsDSTM";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  FormControl,
  FormLabel,
  FormGroup,
  Popover,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { exportCSVData } from "cjbsDSTM";
import { useForm, useWatch } from "react-hook-form";
import Select from "react-select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MyIcon from "icon/myIcon";
import IconDescBar from "../../../components/IconDescBar";
import {
  dataTableCustomStyles,
  dataTableCustomStyles2,
} from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import fetcher from "../../../func/fetcher";
import { useList } from "../../../hooks/useList";
import { MultiCheckbox } from "./MultiCheckbox";
import Link from "next/link";
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
import ResultInSearch from "./ResultInSearch";

const dataRadioGVTest = [
  { value: "Y", optionName: "요청함" },
  { value: "N", optionName: "요청안함" },
];

const ListOrder = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("order", page, perPage);
  console.log("jkjkjkjkj", data);
  const totalElements = data.data.pageInfo.totalElements;
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;

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
                  orderStatusVal === "진행"
                    ? blue["50"]
                    : orderStatusVal === "완료"
                    ? green["50"]
                    : orderStatusVal === "취소"
                    ? red["50"]
                    : grey["100"],
                color:
                  orderStatusVal === "진행"
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
              <Typography data-tag="allowRowEvents" variant="body2">
                <Stack direction="row" spacing={"2px"} alignItems="center">
                  <Box component="span">{agncNm}</Box>
                  {isSpecialMng === "Y" && (
                    <MyIcon
                      icon="vip-fill"
                      width={15}
                      data-tag="allowRowEvents"
                      color="#FFAB33"
                    />
                  )}
                </Stack>
              </Typography>
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

  const filteredData = data.data.orderList.filter(
    (item) =>
      (item.custNm &&
        item.custNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.ebcEmail &&
        item.ebcEmail.toLowerCase().includes(filterText.toLowerCase()))
  );

  console.log("filteredData ==>>", filteredData);

  const dataRadioGVTest = [
    { value: "Y", optionName: "요청함" },
    { value: "N", optionName: "요청안함" },
  ];

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

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <Link href="/order/order-reg">
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
            <IconDescBar freeDisabled={true} reOrder={true} />
            <ExcelDownloadButton downloadUrl={""} />

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
        {/*<Grid item xs={12}>*/}
        {/*  <MultiCheckbox />*/}
        {/*</Grid>*/}
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
