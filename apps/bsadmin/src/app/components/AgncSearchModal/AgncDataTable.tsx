import React, { useCallback, useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import {
  DataTableBase,
  formatNumberWithCommas,
  OutlinedButton,
} from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";

const AgncDataTable = ({ handleClose }) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const { setValue, clearErrors, watch } = useFormContext();
  const paymentInfoValue = watch("pymtInfoCc");
  const { data } = useSWR(
    `/agnc/list?isRmnPrePymtPriceExist=true&page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log("거래처 검색", data);

  const listData = data.agncList;
  const totalElements = data.pageInfo.totalElements;

  const columns = useMemo(
    () => [
      {
        name: "거래처번호",
        center: true,
        width: "100px",
        selector: (row) => row.agncId,
      },
      {
        name: "거래처",
        selector: (row) => row.agncNm,
      },
      {
        name: "기관",
        selector: (row) => row.instNm,
      },
      {
        name: "선결제금액",
        right: true,
        // omit: true,
        selector: (row) => formatNumberWithCommas(row.rmnPrePymtPrice),
      },
      {
        name: "남은금액",
        right: true,
        selector: (row) => formatNumberWithCommas(row.rmnPrice),
      },
      {
        name: "선택",
        width: "80px",
        center: true,
        cell: (row: {
          agncUkey: string;
          agncNm: string;
          instNm: string;
          brno: string;
          rprsNm: string;
          rmnPrice: number;
          rmnPrePymtPrice: number;
        }) => {
          const {
            agncUkey,
            agncNm,
            rmnPrePymtPrice,
            rmnPrice,
            instNm,
            brno,
            rprsNm,
          } = row;

          const selected = useCallback(() => {
            if (paymentInfoValue === "BS_1914004") {
              setValue("tnsfTargetAgncNm", agncNm);
              setValue("tnsfTargetAgncUkey", agncUkey);
            } else {
              setValue("agncUkey", agncUkey);
              setValue("agncNm", agncNm);
              setValue("instNm", instNm);
              setValue("rmnPrePymtPrice", rmnPrePymtPrice);
              setValue("rmnPrice", rmnPrice);
              setValue("brno", brno);
              setValue("rprsNm", rprsNm);
            }

            clearErrors([
              "agncUkey",
              "agncNm",
              "instNm",
              "rmnPrice",
              "rmnPrePymtPrice",
              "brno",
              "rprsNm",
            ]);

            handleClose();
          }, []);

          return (
            <OutlinedButton size="small" buttonName="선택" onClick={selected} />
          );
        },
      },
    ],
    [setValue, paymentInfoValue, handleClose]
  );

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: React.SetStateAction<number>, page: any) => {
      setSize(newPerPage);
    },
    []
  );

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        data={listData}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationPerPage={15}
        paginationRowsPerPageOptions={[10, 15, 20]}
      />
    </Box>
  );
};

export default AgncDataTable;
