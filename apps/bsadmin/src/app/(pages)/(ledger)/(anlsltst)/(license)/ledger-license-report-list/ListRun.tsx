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
} from "cjbsDSTM";
import {
  blue,
} from "cjbsDSTM/themes/color";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  Tooltip,
  IconButton, Collapse, TableContainer, Table, TableBody, TableCell, TableRow,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "api";
import { usePathname, useSearchParams } from "next/navigation";
import KeywordSearch from "../../../../../components/KeywordSearch";
import NoDataView from "../../../../../components/NoDataView";
import dynamic from "next/dynamic";
import { ExpanderComponentProps } from "react-data-table-component";
import ResultInSearch from "./ResultInSearch";
import CategorySelectModal from "./CategorySelectModal";
import {bold} from "next/dist/lib/picocolors";

const LazyRunAddModal = dynamic(() => import("./RunAddModal"), {
  ssr: false,
});

const ListRun = () => {
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
      ? `/anls/itst/list${result}&page=${page}&size=${size}`
      : `/anls/itst/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);
  const anlsItstList = data.anlsItstList;
  const totalElements = data.pageInfo.totalElements;
  const totalPrice = data.totalPrice;
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [serviceSelectModalOpen, setServiceSelectModalOpen] = useState<boolean>(false);

  const handleServiceSelectOpen = () => {
    setServiceSelectModalOpen(true);
  };
  const handleServiceSelectModalClose = () => {
    setServiceSelectModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        name: "No",
        width: "80px",
        center: true,
        // sortable: true,
        selector: (row, index) => row.anlsItstId,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">거래처(PI)</Typography></Stack>,
        width: "300px",
        // sortable: true,
        // selector: (row : {agncNm: string; instNm: string}) => row.agncNm,
        cell: (row) => {
          const { instNm, agncNm } = row;
          return (
            <Stack data-tag="allowRowEvents">
              <Box data-tag="allowRowEvents">
                <Stack direction="row" spacing={"2px"} alignItems="center">
                  <Typography data-tag="allowRowEvents" variant="body2">
                    {agncNm}
                  </Typography>
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
        name: "거래처 번호",
        width: "100px",
        center: true,
        // sortable: true,
        selector: (row, index) => row.agncId,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">연구책임자</Typography></Stack>,
        width: "250px",
        // sortable: true,
        // selector: (row) => row.custNm,
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
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">영업 담당자</Typography></Stack>,
        width: "160px",
        // sortable: true,
        selector: (row) => row.bsnsMngrNm,
      },
      {
        name: "분류",
        center: true,
        selector: (row) => row.srvcCtgrVal,
      },
      {
        name: "분석종류",
        center: true,
        selector: (row) => row.anlsTypeVal,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">플랫폼</Typography></Stack>,
        width: "300px",
        selector: (row) => row.pltfVal,
      },
      {
        name: "분석일",
        width: "120px",
        center: true,
        selector: (row) => row.anlsDttm,
      },
      // {
      //   name: "Kit",
      //   width: "120px",
      //   selector: (row) => (row.kitVal === null ? "-" : row.kitVal),
      // },
      {
        name: "수량",
        width: "80px",
        center: true,
        selector: (row) => row.totalCnt,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">총 공급가액</Typography></Stack>,
        width: "140px",
        right: true,
        selector: (row) => row.totalSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">부가세</Typography></Stack>,
        width: "120px",
        right: true,
        selector: (row) => row.vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">합계금액</Typography></Stack>,
        width: "150px",
        right: true,
        selector: (row) => row.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "정산",
        center: true,
        cell: (row: { isSettled: string }) => {
          const { isSettled } = row;
          return (
            isSettled === "N" ? (
              <ContainedButton
                buttonName="발행 요청"
                size="small"
                onClick={() => goTaxInvoicePage(row)}
              />
            ) : ('완료')
          );
        },
        width: "140px",
      },
    ],
    []
  );

  const goDetailPage = (row: any) => {
    const path = row.anlsItstUkey;
    const srvcCtgrVal = row.srvcCtgrVal;
    // console.log(path);
    // console.log(srvcCtgrVal);
    if(srvcCtgrVal === "Analysis") {
      router.push("/ledger-analysis-report-list/" + path);
    } else if (srvcCtgrVal === "License") {
      alert('준비중...')
      // router.push("/ledger-license-report-list/" + path);
    }
  };

  // 발행요청
  const goTaxInvoicePage = (row: any) => {
    const anlsItstUkey = row.anlsItstUkey;
    const agncUkey = row.agncUkey;
    console.log("anlsItstUkey", anlsItstUkey);
    console.log("agncUkey", agncUkey);
    // router.push(`/ledger-tax-invoice-reg?type=anlsltst&anlsItstUkey${anlsItstUkey}=agncUkey=${agncUkey}`);
  };

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={12} sx={{mt: 0}}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 0.5 }}
            alignItems="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <DataCountResultInfo totalCount={totalElements} />

              <Typography variant="body2" sx={{ width: "max-content", pb: '2px' }}>
                {" / "}총 누적 금액{" "}
                <Box
                  component="b"
                  sx={{ fontSize: 18, color: cjbsTheme.palette.primary.main, }}
                >
                  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Box>{" "}
                원
              </Typography>

              <ContainedButton
                buttonName="분석 내역서 등록"
                size="small"
                onClick={() => handleServiceSelectOpen()}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <FileDownloadBtn
                exportUrl={`/anls/itst/list/download${result}`}
                iconName="xls3"
              />
              <KeywordSearch />
              <ResultInSearch/>
            </Stack>
          </Stack>
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
    anlsItstCostList;
    // supplyPrice: number;
    // totalPrice: number;
    // vat: number;
    // srvcTypeVal: string;
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
              {data.anlsItstCostList.map((item, index) => (
                index === 0 ? (
                  <TableRow
                    key={index}
                    sx={{
                      // '&:last-child td, &:last-child th': { border: 0 },
                      // '&:nth-of-type(even)': { backgroundColor: cjbsTheme.palette.action.hover, },
                      border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                      backgroundColor: blue["50"],
                    }}
                  >
                    <TableCell width={'1138px'} align="center" rowSpan={10}>
                      <Typography variant="body2">분석비용</Typography>
                    </TableCell>
                    <TableCell width={'420px'} align="left" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.srvcTypeVal}</Typography>
                    </TableCell>
                    <TableCell width={'80px'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.sampleSize}</Typography>
                    </TableCell>
                    <TableCell width={'140px'} align="right" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.supplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </TableCell>
                    <TableCell width={'120px'} align="right" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </TableCell>
                    <TableCell width={'150px'} align="right" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </TableCell>
                    <TableCell width={'140px'} align="left" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}} rowSpan={10}>
                      <Stack spacing={1} justifyContent="center" alignItems="center">
                        <Typography variant="body2">
                          남은금액
                        </Typography>
                        <Typography variant="body2">
                          {data.rmnPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ):(
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: blue["50"],
                      border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    }}
                  >
                    <TableCell width={'420px'} align="left" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.srvcTypeVal}</Typography>
                    </TableCell>
                    <TableCell width={'80px'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.sampleSize}</Typography>
                    </TableCell>
                    <TableCell width={'140px'} align="right" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.supplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </TableCell>
                    <TableCell width={'120px'} align="right" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </TableCell>
                    <TableCell width={'150px'} align="right" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                      <Typography variant="body2">{item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </TableCell>
                  </TableRow>
                )
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
            <Title1 titleName="분석 내역서" />
          </Stack>
        }
        data={anlsItstList}
        columns={columns}
        onRowClicked={goDetailPage}
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

      <CategorySelectModal
        open={serviceSelectModalOpen}
        onClose={handleServiceSelectModalClose}
        modalWidth={500}
      />
    </>
  );
};

export default ListRun;
