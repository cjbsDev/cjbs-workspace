"use client";
import * as React from "react";
import { useMemo } from "react";
import {
    DataCountResultInfo,
    DataTableBase,
    Title1,
    ContainedButton,
    cjbsTheme,
    FileDownloadBtn, green, red, grey, TH, TD,
} from "cjbsDSTM";
import {
  blue,
} from "cjbsDSTM/themes/color";
import {
    Box,
    Stack,
    Grid,
    Typography,
    Collapse,
    TableContainer, Table, TableBody, TableCell, TableRow, Chip,
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

  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/agnc/${agncUkey}/prePymtPrice/list${result}&page=${page}&size=${size}`
      : `/agnc/${agncUkey}/prePymtPrice/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);
  const prePymtPrcsHstrResList = data.prePymtPrcsHstrResList;
  const totalElements = data.pageInfo.totalElements;
  const rmnPrePymtPrice = data.rmnPrePymtPrice;
  const price = data.price;
  const prePymtPrice = data.prePymtPrice;

  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const columns = useMemo(
    () => [
      {
        name: "",
        width: "5%",
        center: true,
        // sortable: true,
        selector: (row, index) => row.invcId,
      },
      {
        name: "발행일자",
        width: "14.5%",
        center: true,
        // sortable: true,
        selector: (row, index) => row.issuDttm,
      },
      {
        name: "선결제 금액",
        width: "19.4%",
        center: true,
        // sortable: true,
        selector: (row, index) => row.prePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "사용일(분석일)",
        width: "19.4%",
        center: true,
        // sortable: true,
        selector: (row, index) => row.prcsDate,
      },
      {
        name: "사용 금액",
        width: "19.4%",
        center: true,
        // sortable: true,
        selector: (row, index) => row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "남은 선결제 금액",
        width: "19.4%",
        center: true,
        // sortable: true,
        cell: (row: { rmnPrePymtPrice: string }) => {
          const { rmnPrePymtPrice } = row;
          return (
              <Typography variant="body2" sx={{color: "#EF151E"}}>{rmnPrePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
          );
        },
      },
    ],
    []
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={12} sx={{mt: 0}}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ minWidth: "48px", textAlign: "center" }}></TH>
                  <TH sx={{ width: "20%", textAlign: "center" }}>합계</TH>
                  <TD sx={{ width: "20%", textAlign: "center" }}>
                    {prePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TD>
                  <TD sx={{ width: "20%", textAlign: "center" }}>
                    -
                  </TD>
                  <TD sx={{ width: "20%", textAlign: "center" }}>
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TD>
                  <TD sx={{ width: "20%", textAlign: "center", color: "red" }}>
                    {rmnPrePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
  const ExpandableRowComponent: React.FC<Props> = ({data}) => {
    // console.log(">>>>>>>>>>>", data);
    return (
      <>
        <TableContainer>
          <Table aria-label="simple table" size="small">
            <TableBody>
              {data.prePymtPrcsHstrList.map((item:any, index:number) => (
                <TableRow
                  key={index}
                  sx={{
                    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    backgroundColor: blue["50"],
                  }}
                >
                  <TableCell sx={{minWidth:'48px'}}>
                  </TableCell>
                  <TableCell width={'40%'} align="right">
                    <Typography variant="body2">{item.prcsTypeVal}</Typography>
                  </TableCell>
                  <TableCell width={'20%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                    <Typography variant="body2">{item.prcsDate}</Typography>
                  </TableCell>
                  <TableCell width={'20%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                    <Typography variant="body2">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                  </TableCell>
                  <TableCell width={'20%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                    <Typography variant="body2">{item.rmnPrePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <>
      <DataTableBase
        title={
          <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
            <Typography variant="subtitle1">선결제 처리 내역</Typography>
          </Stack>
        }
        data={prePymtPrcsHstrResList}
        columns={columns}
        // onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        expandableRows
        expandableRowsComponent={ExpandableRowComponent}
        expandableIcon={{ collapsed: <MyIcon icon="plus" size={16} />, expanded: <MyIcon icon="minus" size={16} />}}
        // expandOnRowDoubleClicked={true}
      />
    </>
  );
};

export default ListPymtPrice;
