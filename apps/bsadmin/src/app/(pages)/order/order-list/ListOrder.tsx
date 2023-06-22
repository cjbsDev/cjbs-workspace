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
} from "cjbsDSTM";
import { Box, Stack, Grid, Typography, Chip } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListOrder = () => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const columns = useMemo(
    () => [
      {
        name: "No",
        selector: (row) => row.id,
        cell: (row) => {
          return (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2">{row.id}</Typography>
              <MyIcon icon="re" size={20} />
              <MyIcon icon="fast" size={20} />
            </Stack>
          );
        },
      },
      {
        name: "진행 상황",
        cell: (row) => {
          return (
            <Chip
              label={row.category}
              size="small"
              color={
                row.category === "smartphones"
                  ? "primary"
                  : row.category === "laptops"
                  ? "success"
                  : row.category === "skincare"
                  ? "error"
                  : "default"
              }
            />
          );
        },
      },
      {
        name: "Title",
        selector: (row) => row.title,
      },
      {
        name: "Description",
        selector: (row) => row.description,
      },
      {
        name: "Brand",
        selector: (row) => row.brand,
      },
      {
        name: "Price",
        selector: (row) => row.price,
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
  const { data } = useSWR("https://dummyjson.com/products", fetcher, {
    suspense: true,
  });
  const { register, control, handleSubmit } = useForm();

  const filteredData = data.products.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
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
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={20} />
            <UnStyledButton buttonName="오더 등록" />
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
