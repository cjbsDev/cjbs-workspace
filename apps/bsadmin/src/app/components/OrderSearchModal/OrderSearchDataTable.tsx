import * as React from "react";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { Box, Grid, Stack } from "@mui/material";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  OutlinedButton,
} from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const APIPATH = "/anls/itst/order/list";
const OrderSearchDataTable = (props: { type: any; onClose: any; handleOrderChange: any; }) => {
  const { type, onClose, handleOrderChange } = props;
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data } = useSWR(APIPATH, fetcher, {
    suspense: true,
  });
  const { setValue, clearErrors, resetField } = useFormContext();

  // [오더] 컬럼세팅
  const columns = useMemo(
    () => [
      {
        name: "No.",
        selector: (row: { orderId: number }) => row.orderId,
        width: "70px",
      },
      {
        name: "ukey",
        selector: (row: { orderUkey: string }) => row.orderUkey,
        width: "150px",
      },
      {
        name: "고객",
        cell: (row: { custNm: any; custEbcEmail: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.custNm ?? "-"}</Box>
              {row.custEbcEmail && <Box>({row.custEbcEmail})</Box>}
            </Stack>
          </>
        ),
        minWidth: "120px",
      },
      {
        name: "거래처(PI)",
        cell: (row: { agncNm: any; instNm: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.agncNm ?? "-"}</Box>
              {row.instNm && <Box>({row.instNm})</Box>}
            </Stack>
          </>
        ),
        minWidth: "120px",
      },
      {
        name: "분석종류",
        selector: (row: { anlsTypeVal: string }) => row.anlsTypeVal,
        width: "100px",
      },
      {
        name: "플랫폼",
        selector: (row: { pltfVal: string }) => row.pltfVal,
        width: "200px",
      },
      {
        name: "서비스 타입",
        selector: (row: { srvcTypeVal: string }) => row.srvcTypeVal,
        width: "100px",
      },
      {
        name: "생산량",
        selector: (row: { depthVal: string }) => row.depthVal,
        width: "80px",
      },
      {
        name: "선택",
        width: "90px",
        cell: (row: {
          orderUkey: string;
          orderId: number;
          pltfMc: string;
          anlsTypeVal: string;
          anlsTypeMc: string;
          pltfVal: string;
          depthMc: string;
          depthVal: string;
          custNm: string;
          custEbcEmail: string;
          bsnsMngrVal: string;
          rmnPrePymtPrice: number;

          agncUkey: string;
          telList: string;
          instNm: string;
          agncNm: string;
          isAgncIncl: string;
        }) => {
          const {
            orderUkey,
            orderId,
            pltfMc,
            anlsTypeVal,
            anlsTypeMc,
            pltfVal,
            depthMc,
            depthVal,
            custNm,
            custEbcEmail,
            bsnsMngrVal,
            rmnPrePymtPrice,

            agncUkey,
            telList,
            instNm,
            agncNm,
            isAgncIncl,
          } = row;

          const agncInstNm = `${row.agncNm}(${row.instNm})`;
          const custEbcNm = `${row.custNm}(${row.custEbcEmail})`;

          if (agncUkey && type === "agnc") {
            return null; // 거래처가 있는 고객은 선택 버튼 있으면 안됨.
          }

          if (isAgncIncl === "N" && type === "agnc-order") {
            return null; // 거래처가 있는 고객은 선택 버튼 있으면 안됨.
          }

          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("orderUkey", orderUkey);
                setValue("orderId", orderId);
                setValue("pltfMc", pltfMc);
                setValue("pltfValueView", anlsTypeVal + ' > ' + pltfVal);
                setValue("depthMc", depthMc);
                setValue("depthVal", depthVal);
                setValue("custNm", custEbcNm);
                setValue("bsnsMngrVal", bsnsMngrVal);
                setValue("rmnPrePymtPrice", rmnPrePymtPrice);
                setValue("anlsTypeMc", anlsTypeMc);


                setValue("telList", telList);
                setValue("agncNm", agncInstNm);
                setValue("agncUkey", agncUkey);


                onClose();
                clearErrors("custNm");
                clearErrors("ebcEmail");
                clearErrors("custUkey");
                clearErrors("agncUkey");
                clearErrors("agncNm");
                clearErrors("telList");
                resetField("checkTest7");

                handleOrderChange(orderUkey);
              }}
            />
          );
        },
      },
    ],
    [clearErrors, onClose, resetField, setValue, type]
  );

  //console.log("data.custList", data.custList);
  const filteredData = data.anlsItstOrderList;

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
            <DataCountResultInfo totalCount={data.pageInfo.totalElements} />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
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
  }, [filterText, resetPaginationToggle, data.pageInfo.totalElements]);

  return (
    <DataTableBase
      data={filteredData}
      columns={columns}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      selectableRows={false}
      // paginationServer
      // paginationTotalRows={5}
      // onChangePage={(page, totalRows) => console.log(page, totalRows)}
      // onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
      //   console.log(currentRowsPerPage, currentPage)
      // }
      paginationPerPage={10}
      paginationRowsPerPageOptions={[5, 10, 15]}
    />
  );
};

export default OrderSearchDataTable;
