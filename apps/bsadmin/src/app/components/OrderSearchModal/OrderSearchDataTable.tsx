import * as React from "react";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Grid, Stack } from "@mui/material";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  OutlinedButton,
} from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useRecoilState } from "recoil";
import { groupListDataAtom } from "../../recoil/atoms/groupListDataAtom";

const APIPATH = "/anls/itst/order/list";
const OrderSearchDataTable = (props: {
  type: any;
  onClose: any;
  handleOrderChange: any;
}) => {
  const { type, onClose, handleOrderChange } = props;
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data } = useSWR(APIPATH, fetcher, {
    suspense: true,
  });

  console.log("ORDER SEARCH LIST DATA ==>>", data);

  const { control, setValue, clearErrors, resetField } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: "costList",
  });
  console.log("ORDER _____ FIELDS ==>>", fields);

  // [오더] 컬럼세팅
  const columns = useMemo(
    () => [
      {
        name: "No.",
        center: true,
        selector: (row: { orderId: number }) => row.orderId,
        width: "80px",
      },
      // {
      //   name: "ukey",
      //   selector: (row: { orderUkey: string }) => row.orderUkey,
      //   width: "150px",
      // },
      {
        name: "고객",
        allowOverflow: true,
        cell: (row: { custNm: any; custEbcEmail: any }) => (
          <>
            <Stack
              // direction="row"
              // spacing={0.4}
              // alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.custNm ?? "-"}</Box>
              {row.custEbcEmail && <Box>({row.custEbcEmail})</Box>}
            </Stack>
          </>
        ),
        minWidth: "300px",
      },
      {
        name: "거래처(PI)",
        allowOverflow: true,
        cell: (row: { agncNm: any; instNm: any }) => (
          <>
            <Stack
              // direction="row"
              // spacing={0.4}
              // alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.agncNm ?? "-"}</Box>
              {row.instNm && <Box>({row.instNm})</Box>}
            </Stack>
          </>
        ),
      },
      {
        name: "분석종류",
        selector: (row: { anlsTypeVal: string }) => row.anlsTypeVal,
        width: "100px",
        center: true,
      },
      {
        name: "플랫폼",
        selector: (row: { pltfVal: string }) => row.pltfVal,
        // width: "200px",
        allowOverflow: true,
      },
      {
        name: "서비스 타입",
        selector: (row: { srvcTypeVal: string }) => row.srvcTypeVal,
        // width: "100px",
      },
      {
        name: "생산량",
        selector: (row: { depthVal: string }) => row.depthVal,
        // width: "80px",
      },
      {
        name: "선택",
        // width: "90px",
        button: true,
        cell: (row: {
          orderUkey: string;
          agncUkey: string;
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
          telList: string;
          instNm: string;
          agncNm: string;
          isAgncIncl: string;
        }) => {
          const {
            orderUkey,
            agncUkey,
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
            bsnsMngrUkey,
            rmnPrePymtPrice,
            telList,
            instNm,
            agncNm,
            isAgncIncl,
          } = row;

          const agncInstNm = `${row.agncNm} (${row.instNm})`;
          const custEbcNm = `${row.custNm} (${row.custEbcEmail})`;

          // if (isAgncIncl === "N" && type === "agnc-order") {
          //   return null; // 거래처가 있는 고객은 선택 버튼 있으면 안됨.
          // }
          // console.log("agncUkey", agncUkey);

          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("orderUkey", orderUkey);
                setValue("agncUkey", agncUkey);
                setValue("agncNm", agncInstNm);
                setValue("orderId", orderId);
                setValue("pltfMc", pltfMc);
                setValue("pltfValueView", anlsTypeVal + " > " + pltfVal);
                setValue("depthMc", depthMc);
                setValue("depthVal", depthVal);
                setValue("custNm", custEbcNm);
                setValue("bsnsMngrVal", bsnsMngrVal);
                // setValue("bsnsMngrUkey", bsnsMngrUkey);
                setValue(
                  "rmnPrePymtPrice",
                  rmnPrePymtPrice,
                  // .toString()
                  // .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                );
                setValue("anlsTypeMc", anlsTypeMc);
                setValue("costList", []);
                // fields.map((index) => remove(index));

                // setValue("telList", telList);

                // setValue("agncUkey", agncUkey);

                onClose();
                // clearErrors("custNm");
                // clearErrors("ebcEmail");
                // clearErrors("custUkey");
                // clearErrors("agncUkey");
                // clearErrors("agncNm");
                // clearErrors("telList");
                // resetField("costList");

                handleOrderChange(orderUkey);
              }}
            />
          );
        },
      },
    ],
    [clearErrors, onClose, resetField, setValue, type],
  );

  const filteredData = data.anlsItstOrderList.filter(
    (item: any) =>
      (item.orderId &&
        item.orderId
          .toString()
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.agncNm &&
        item.agncNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.instNm &&
        item.instNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.custNm &&
        item.custNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.custEbcEmail &&
        item.custEbcEmail.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.anlsTypeVal &&
        item.anlsTypeVal.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.pltfVal &&
        item.pltfVal.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.srvcTypeVal &&
        item.srvcTypeVal.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.depthVal &&
        item.depthVal.toLowerCase().includes(filterText.toLowerCase())),
  );

  // const filteredData = data.anlsItstOrderList.filter(
  //   item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),;
  // console.log("filteredData", filteredData);

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
    <Box sx={{ display: "grid" }}>
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
    </Box>
  );
};

export default OrderSearchDataTable;
