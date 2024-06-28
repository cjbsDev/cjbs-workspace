import React, { useMemo, useState } from "react";
import {
  cjbsTheme,
  DataTableBase,
  formatNumberWithCommas,
  ModalContainer,
  ModalTitle,
  TD,
  TH,
} from "cjbsDSTM";
import {
  Collapse,
  DialogContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ModalContainerProps } from "../../../../../../types/modal-container-props";
import MyIcon from "icon/MyIcon";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import CollapsibleRow from "./CollapsibleRow";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../../components/NoDataView";
import Link from "next/link";

const StatementCheckModal = (props: ModalContainerProps) => {
  const { open, onClose, modalWidth } = props;
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  // const [collpasibleOpen, setCollpasibleOpen] = useState<boolean>(false);
  const params = useParams();
  const { slug } = params;
  console.log("PARAMS", params);

  const { data } = useSWR(
    `/agnc/${slug}/pymt/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("결제 금액 리스트 ==>>", data);
  const { agncPymtList, pageInfo } = data;
  const { totalElements } = pageInfo;
  // const { prePymtPrcsHstrResList, prePymtPrice, price, rmnPrePymtPrice } = data;

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
          return anlsItstId === null && invcId === null ? (
            "-"
          ) : (
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

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>내역 확인</ModalTitle>
      <DialogContent>
        <DataTableBase
          // title={
          //   <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
          //     <Typography variant="subtitle1">결제 처리 내역</Typography>
          //   </Stack>
          // }
          data={agncPymtList}
          columns={columns}
          // onRowClicked={goDetailPage}
          // pointerOnHover
          // highlightOnHover
          customStyles={dataTableCustomStyles3}
          // subHeader
          // subHeaderComponent={subHeaderComponentMemo}
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
        {/*<TableContainer>*/}
        {/*  <Table>*/}
        {/*    <TableHead*/}
        {/*      sx={{*/}
        {/*        backgroundColor: cjbsTheme.palette.grey["50"],*/}
        {/*        borderTop: `1px solid ${cjbsTheme.palette.common.black}`,*/}
        {/*        borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,*/}
        {/*        "& th": {*/}
        {/*          fontWeight: "600",*/}
        {/*          p: 1,*/}
        {/*          border: "none",*/}
        {/*        },*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: 50 }}></TH>*/}
        {/*        <TH sx={{ width: 200 }}>세금 계산서 발행일</TH>*/}
        {/*        <TH sx={{ width: 150 }}>선결제 금액</TH>*/}
        {/*        <TH sx={{ width: 150 }}>분석일</TH>*/}
        {/*        <TH sx={{ width: 150 }}>분석 비용</TH>*/}
        {/*        <TH sx={{ width: 100 }}>남은 금액</TH>*/}
        {/*        <TH sx={{ width: 50 }}></TH>*/}
        {/*      </TableRow>*/}
        {/*    </TableHead>*/}
        {/*    <TableBody*/}
        {/*      sx={{*/}
        {/*        "& th, & td": {*/}
        {/*          p: 1,*/}
        {/*          border: "none",*/}
        {/*          borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,*/}
        {/*        },*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {prePymtPrcsHstrResList.map((item) => {*/}
        {/*        const {*/}
        {/*          invcId,*/}
        {/*          issuDttm,*/}
        {/*          prcsDate,*/}
        {/*          price,*/}
        {/*          prePymtPrcsHstrList,*/}
        {/*          prePymtPrice,*/}
        {/*          rmnPrePymtPrice,*/}
        {/*        } = item;*/}
        {/*        return (*/}
        {/*          <CollapsibleRow*/}
        {/*            key={invcId}*/}
        {/*            invcId={invcId}*/}
        {/*            issuDttm={issuDttm}*/}
        {/*            prcsDate={prcsDate}*/}
        {/*            price={price}*/}
        {/*            prePymtPrcsHstrList={prePymtPrcsHstrList}*/}
        {/*            rmnPrePymtPrice={rmnPrePymtPrice}*/}
        {/*            prePymtPrice={prePymtPrice}*/}
        {/*          />*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </TableBody>*/}
        {/*    <TableFooter*/}
        {/*      sx={{*/}
        {/*        textAlign: "right",*/}
        {/*        "& th, & td": {*/}
        {/*          p: 1,*/}
        {/*          backgroundColor: cjbsTheme.palette.grey["300"],*/}
        {/*          border: "none",*/}
        {/*        },*/}
        {/*        "& th": {*/}
        {/*          fontWeight: "600",*/}
        {/*        },*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <TableRow>*/}
        {/*        <TD sx={{ width: 50 }}></TD>*/}
        {/*        <TH sx={{ width: 200 }}>합계</TH>*/}
        {/*        <TD sx={{ color: cjbsTheme.palette.primary.main, width: 150 }}>*/}
        {/*          {formatNumberWithCommas(prePymtPrice)}*/}
        {/*        </TD>*/}
        {/*        <TD sx={{ width: 150 }}></TD>*/}
        {/*        <TD sx={{ width: 150 }}>{formatNumberWithCommas(price)}</TD>*/}
        {/*        <TD sx={{ color: cjbsTheme.palette.warning.main, width: 100 }}>*/}
        {/*          {formatNumberWithCommas(rmnPrePymtPrice)}*/}
        {/*        </TD>*/}
        {/*        <TD sx={{ width: 50 }}></TD>*/}
        {/*      </TableRow>*/}
        {/*    </TableFooter>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}
      </DialogContent>
    </ModalContainer>
  );
};

export default StatementCheckModal;
