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
} from "cjbsDSTM";
import { Box, Stack, Grid, Typography, Chip } from "@mui/material";
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

const ListOrder = () => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("order", page, perPage);
  // const { data } = useSWR("https://dummyjson.com/products", fetcher, {
  //   suspense: true,
  // });
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
              {isFastTrack === "Y" && (
                <MyIcon icon="re" size={20} data-tag="allowRowEvents" />
              )}
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
              label={"미접수"}
              size="small"
              color={
                orderStatusVal === "샘플 미접수"
                  ? "secondary"
                  : orderStatusVal === "laptops"
                  ? "success"
                  : orderStatusVal === "skincare"
                  ? "error"
                  : "default"
              }
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
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const { register, control, handleSubmit } = useForm();

  // const filteredData = data.products.filter(
  //   (item) =>
  //     item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  // );
  const filteredData = data.data.orderList.filter(
    (item) =>
      (item.custNm &&
        item.custNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.ebcEmail &&
        item.ebcEmail.toLowerCase().includes(filterText.toLowerCase()))
  );

  console.log("filteredData ==>>", filteredData);

  const goDetailPage = (row) => {
    const path = row.title;
    router.push("/order/order-list/" + path.toString());
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
            <DataCountResultInfo totalCount={20} />
            <OutlinedButton
              buttonName="오더 등록"
              size="small"
              color="secondary"
              onClick={() => router.push("/order/order-reg")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ p: 0, m: 0 }}
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              sx={{
                ".MuiFormControlLabel-label": {
                  fontSize: 14,
                  pt: 0.2,
                },
              }}
              label="내가 등록한 오더만 보기"
            />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <IconDescBar freeDisabled={true} />
            <ExcelDownloadButton downloadUrl={""} />
            <DataTableFilter
              onFilter={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, checked]);

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
    />
  );
};

export default ListOrder;
