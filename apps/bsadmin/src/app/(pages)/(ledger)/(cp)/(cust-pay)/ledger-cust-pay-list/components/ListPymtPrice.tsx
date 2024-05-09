"use client";
import * as React from "react";
import { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  Title1,
  ContainedButton,
  cjbsTheme,
  FileDownloadBtn,
  green,
  red,
  grey,
  TH,
  TD,
  formatNumberWithCommas,
} from "cjbsDSTM";
import { blue } from "cjbsDSTM/themes/color";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Collapse,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Chip,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import { useSearchParams } from "next/navigation";
import KeywordSearch from "../../../../../../components/KeywordSearch";
import NoDataView from "../../../../../../components/NoDataView";
import dynamic from "next/dynamic";
import { ExpanderComponentProps } from "react-data-table-component";
import Link from "next/link";

const ListPymtPrice = (props: any) => {
  const agncUkey = props.agncUkey;
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const searchParams = useSearchParams();

  const resultObject: any = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  // /agnc/{agncUkey}/pymt/list

  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/agnc/${agncUkey}/pymt/list${result}&page=${page}&size=${size}`
      : `/agnc/${agncUkey}/pymt/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("PAYMENT LIST DATA", data);

  const { agncPymtList, pageInfo } = data;
  const { totalElements } = pageInfo;

  const prePymtPrcsHstrResList = data.prePymtPrcsHstrResList;
  // const totalElements = data.pageInfo.totalElements;
  const rmnPrePymtPrice = data.rmnPrePymtPrice;
  const price = data.price;
  const prePymtPrice = data.prePymtPrice;

  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: "처리일",
        selector: (row) => row.prcsDttm,
      },
      {
        name: "구분",
        selector: (row) => row.costType,
      },
      {
        name: "상세 구분",
        selector: (row) => row.costTypeDetail,
      },
      {
        name: "금액",
        right: true,
        selector: (row) => formatNumberWithCommas(row.price),
        cell: (row) => {
          return (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={0.5}
            >
              <Typography variant="body2">
                {formatNumberWithCommas(row.price)}
              </Typography>
              <Typography variant="body2">원</Typography>
            </Stack>
          );
        },
      },
      {
        name: "번호",
        width: "100px",
        right: true,
        // sortable: true,
        selector: (row) => row.anlsItstId,
        cell: (row) => {
          // /ledger-license-report-list/ETqJma
          const { anlsItstId, anlsItstUkey, invcId, invcUkey } = row;
          const path =
            anlsItstId !== null
              ? `/ledger-license-report-list/${anlsItstUkey}`
              : `/ledger-tax-invoice-list/${invcUkey}`;
          const id = anlsItstId !== null ? anlsItstId : invcId;
          return (
            <Link href={path}>
              <Typography variant="body2" color="primary">
                {id}
              </Typography>
            </Link>
          );
        },
      },
    ],
    [],
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={12} sx={{ mt: 0 }}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ minWidth: "48px", textAlign: "center" }}></TH>
                  <TH sx={{ width: "20%", textAlign: "center" }}>합계</TH>
                  <TD sx={{ width: "20%", textAlign: "center" }}>
                    {/*{prePymtPrice*/}
                    {/*  .toString()*/}
                    {/*  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                  </TD>
                  <TD sx={{ width: "20%", textAlign: "center" }}>-</TD>
                  <TD sx={{ width: "20%", textAlign: "center" }}>
                    {/*{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                  </TD>
                  <TD sx={{ width: "20%", textAlign: "center", color: "red" }}>
                    {/*{rmnPrePymtPrice*/}
                    {/*  .toString()*/}
                    {/*  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }, [totalElements, result]);

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  interface Row {
    prePymtPrcsHstrList: any;
  }
  interface Props extends ExpanderComponentProps<Row> {
    // currently, props that extend ExpanderComponentProps must be set to optional.
    // someTitleProp?: string;
  }
  // const ExpandableRowComponent: React.FC<Props> = ({ data }) => {
  //   return (
  //     <>
  //       <TableContainer>
  //         <Table aria-label="simple table" size="small">
  //           <TableBody>
  //             {data.prePymtPrcsHstrList.map((item: any, index: number) => (
  //               <TableRow
  //                 key={index}
  //                 sx={{
  //                   border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
  //                   backgroundColor: blue["50"],
  //                 }}
  //               >
  //                 <TableCell sx={{ minWidth: "48px" }}></TableCell>
  //                 <TableCell width={"40%"} align="right">
  //                   <Typography variant="body2">{item.prcsTypeVal}</Typography>
  //                 </TableCell>
  //                 <TableCell
  //                   width={"20%"}
  //                   align="center"
  //                   sx={{
  //                     borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
  //                   }}
  //                 >
  //                   <Typography variant="body2">{item.prcsDate}</Typography>
  //                 </TableCell>
  //                 <TableCell
  //                   width={"20%"}
  //                   align="center"
  //                   sx={{
  //                     borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
  //                   }}
  //                 >
  //                   <Typography variant="body2">
  //                     {item.price
  //                       .toString()
  //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  //                   </Typography>
  //                 </TableCell>
  //                 <TableCell
  //                   width={"20%"}
  //                   align="center"
  //                   sx={{
  //                     borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
  //                   }}
  //                 >
  //                   <Typography variant="body2">
  //                     {item.rmnPrePymtPrice
  //                       .toString()
  //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  //                   </Typography>
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </>
  //   );
  // };

  return (
    <>
      <DataTableBase
        title={
          <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
            <Typography variant="subtitle1">결제 처리 내역</Typography>
          </Stack>
        }
        data={agncPymtList}
        columns={columns}
        // onRowClicked={goDetailPage}
        // pointerOnHover
        // highlightOnHover
        customStyles={dataTableCustomStyles3}
        // subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        // expandableRows
        // expandableRowsComponent={ExpandableRowComponent}
        // expandableIcon={{
        //   collapsed: <MyIcon icon="plus" size={16} />,
        //   expanded: <MyIcon icon="minus" size={16} />,
        // }}
        // expandOnRowDoubleClicked={true}
      />
    </>
  );
};

export default ListPymtPrice;
