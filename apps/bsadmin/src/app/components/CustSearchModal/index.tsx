import React, { useState, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ErrorContainer,
  Fallback,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import {
  Box,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const LazyCustSearchDataTable = dynamic(() => import("./CustSearchDataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  type?: string;
}

// /cust/list?page=${pageIndex}&size=${perPage}
// const APIPATH = "/cust/list";

const CustSearchModal = ({
  onClose,
  open,
  modalWidth,
  type,
}: ModalContainerProps) => {
  // const [filterText, setFilterText] = useState("");
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const { data } = useSWR(APIPATH, fetcher, {
  //   suspense: true,
  // });
  // const { setValue, clearErrors, resetField } = useFormContext();
  //
  // // [고객] 컬럼세팅
  // const columns = useMemo(
  //   () => [
  //     {
  //       name: "고객 번호",
  //       selector: (row: { ebcUid: number }) => row.ebcUid,
  //       width: "100px",
  //     },
  //     {
  //       name: "아이디",
  //       selector: (row: { ebcEmail: string }) => row.ebcEmail,
  //     },
  //     {
  //       name: "이름",
  //       selector: (row: { custNm: string }) => row.custNm,
  //       width: "100px",
  //     },
  //
  //     {
  //       name: "소속 거래처(PI)",
  //       cell: (row: { agncNm: any; instNm: any }) => (
  //         <>
  //           <Stack
  //             direction="row"
  //             spacing={0.4}
  //             alignItems="center"
  //             useFlexGap
  //             flexWrap="wrap"
  //           >
  //             <Box>{row.agncNm ?? "-"}</Box>
  //             {row.instNm && <Box>({row.instNm})</Box>}
  //           </Stack>
  //         </>
  //       ),
  //       minWidth: "150px",
  //     },
  //     {
  //       name: "선택",
  //       cell: (row: {
  //         custUkey: string;
  //         custNm: string;
  //         ebcEmail: string;
  //         telList: string;
  //         agncUkey: string;
  //         agncNm: string;
  //         instNm: string;
  //       }) => {
  //         const { agncUkey, custUkey, custNm, ebcEmail, telList } = row;
  //         const agncInstNm = `${row.agncNm}(${row.instNm})`;
  //
  //         if (agncUkey && type === "agnc") {
  //           return null; // 거래처가 있는 고객은 선택 버튼 있으면 안됨.
  //         }
  //         return (
  //           <OutlinedButton
  //             size="small"
  //             buttonName="선택"
  //             onClick={() => {
  //               setValue("custUkey", custUkey);
  //               setValue("custNm", custNm);
  //               setValue("ebcEmail", ebcEmail);
  //               setValue("telList", telList);
  //
  //               if (type === "order") {
  //                 setValue("agncNm", agncInstNm);
  //                 setValue("agncUkey", agncUkey);
  //               }
  //
  //               onClose();
  //               clearErrors("custNm");
  //               clearErrors("ebcEmail");
  //               clearErrors("custUkey");
  //               clearErrors("agncUkey");
  //               clearErrors("agncNm");
  //               clearErrors("telList");
  //               resetField("checkTest7");
  //             }}
  //           />
  //         );
  //       },
  //     },
  //   ],
  //   [clearErrors, onClose, resetField, setValue, type]
  // );
  //
  // //console.log("data.custList", data.custList);
  // const filteredData = data.custList;
  //
  // const subHeaderComponentMemo = React.useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText("");
  //     }
  //   };
  //
  //   return (
  //     <Grid container>
  //       <Grid item xs={5} sx={{ pt: 0 }}>
  //         <Stack direction="row" spacing={2} alignItems="center">
  //           <DataCountResultInfo totalCount={data.pageInfo.totalElements} />
  //         </Stack>
  //       </Grid>
  //       <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
  //         <Stack
  //           direction="row"
  //           spacing={1}
  //           sx={{ mb: 1.5 }}
  //           alignItems="center"
  //         >
  //           <DataTableFilter
  //             onFilter={(e: {
  //               target: { value: React.SetStateAction<string> };
  //             }) => setFilterText(e.target.value)}
  //             onClear={handleClear}
  //             filterText={filterText}
  //           />
  //         </Stack>
  //       </Grid>
  //     </Grid>
  //   );
  // }, [filterText, resetPaginationToggle, data.pageInfo.totalElements]);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>고객 검색</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCustSearchDataTable onClose={onClose} type={type} />
        </ErrorContainer>
        {/*<DataTableBase*/}
        {/*  data={filteredData}*/}
        {/*  columns={columns}*/}
        {/*  pointerOnHover*/}
        {/*  highlightOnHover*/}
        {/*  customStyles={dataTableCustomStyles}*/}
        {/*  subHeader*/}
        {/*  subHeaderComponent={subHeaderComponentMemo}*/}
        {/*  paginationResetDefaultPage={resetPaginationToggle}*/}
        {/*  selectableRows={false}*/}
        {/*  // paginationServer*/}
        {/*  // paginationTotalRows={5}*/}
        {/*  // onChangePage={(page, totalRows) => console.log(page, totalRows)}*/}
        {/*  // onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>*/}
        {/*  //   console.log(currentRowsPerPage, currentPage)*/}
        {/*  // }*/}
        {/*  paginationPerPage={10}*/}
        {/*  paginationRowsPerPageOptions={[5, 10, 15]}*/}
        {/*/>*/}
      </DialogContent>
    </ModalContainer>
  );
};

export default CustSearchModal;
