import React, { useState, useMemo, useCallback } from "react";
import {
  cjbsTheme,
  ContainedButton,
  DataTableBase,
  DataTableFilter,
  DeletedButton,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import {
  Box,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";

import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import MyIcon from "icon/MyIcon";
import { toast } from "react-toastify";

interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
  agncNm?: string;
  instNm?: string;
}

const initialData: Member[] = [];

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectedMembers: Member[];
  onMemberSelection: (memeberData: Member[]) => void; // 새로 추가 0627
}

import { fetcher } from "api";
import MemberMngDataTable from "./MemberMngDataTable";
import DeleteBtn from "../../(pages)/(ledger)/(invc)/ledger-tax-invoice-list/components/DeleteBtn";

const MemberMngtNewModal = ({
  onClose,
  open,
  modalWidth,
  selectedMembers,
  onMemberSelection,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // [고객] row 세팅
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [key, setKey] = useState<number>(0); // 특정 조건에서 checkbox 해제 할 때 필요

  // [멤버] 정보 세팅
  const [memeberData, setMemberData] = useState<Member[]>(
    selectedMembers ?? initialData,
  );
  const [selectedMemberRows, setSelectedMemberRows] = useState<number[]>([]);
  // const [page, setPage] = useState<number>(1);
  // const [size, setSize] = useState<number>(15);
  const { data } = useSWR(`/cust/list`, fetcher, {
    suspense: true,
  });
  const { custList } = data;
  // const filteredData = data.custList;
  // console.log("소속연구원 검색 리스트", custList);
  // const totalElements = data.pageInfo.totalElements;

  // [고객] 컬럼세팅
  const columns = useMemo(
    () => [
      {
        name: "고객",
        cell: (row: Member) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.custNm}</Box>
              <Box>{row.ebcEmail}</Box>
            </Stack>
          </>
        ),
        minWidth: "150px",
      },
      {
        name: "거래처(PI)",
        cell: (row: Member) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.agncNm}</Box>
              {row.instNm && <Box>({row.instNm})</Box>}
            </Stack>
          </>
        ),
        minWidth: "150px",
      },
    ],
    [],
  );

  const filteredItems = custList.filter(
    (item) =>
      (item.custNm &&
        item.custNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.agncNm &&
        item.agncNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.ebcEmail &&
        item.ebcEmail.toLowerCase().includes(filterText.toLowerCase())),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    // [멤버 관리] - row 추가
    // const handleAddRow = () => {
    //   // 여기서 왼쪽 데이터를 받아서 넣어야 될듯.
    //   //console.log("handleAddRow-selectedRows", selectedRows);
    //
    //   const newMemberDataList: Member[] = [];
    //   selectedRows.selectedRows.forEach((row: any) => {
    //     // 기존 멤버 확인 후 있다면 추가를 무시함
    //     const existingMember = memeberData.find(
    //       (member) => member.custUkey === row.custUkey,
    //     );
    //     if (existingMember) {
    //       return;
    //     }
    //
    //     if (row.instNm) {
    //       toast("이미 거래처가 있는 고객은 연구원으로 등록 할 수 없습니다.");
    //       return;
    //     }
    //
    //     let newRow: Member = {
    //       custUkey: row.custUkey,
    //       ebcEmail: row.ebcEmail,
    //       custNm: row.custNm,
    //     };
    //
    //     newMemberDataList.push(newRow);
    //     clearSelectedRows(); // 추가 후에 datatable 에 선택된 checkbox 해제
    //   });
    //
    //   setMemberData((prevData) => [...prevData, ...newMemberDataList]);
    // };

    const handleAddRow = () => {
      // 여기서 왼쪽 데이터를 받아서 넣어야 될듯.
      //console.log("handleAddRow-selectedRows", selectedRows);

      const newMemberDataList: Member[] = [];
      let toastShown = false;

      selectedRows.selectedRows.forEach((row: any) => {
        // 기존 멤버 확인 후 있다면 추가를 무시함
        const existingMember = memeberData.find(
          (member) => member.custUkey === row.custUkey,
        );
        if (existingMember) {
          return;
        }

        if (row.instNm) {
          if (!toastShown) {
            toast("이미 거래처가 있는 고객은 연구원으로 등록 할 수 없습니다.");
            toastShown = true;
          }
          return;
        }

        let newRow: Member = {
          custUkey: row.custUkey,
          ebcEmail: row.ebcEmail,
          custNm: row.custNm,
        };

        newMemberDataList.push(newRow);
      });

      clearSelectedRows(); // 추가 후에 datatable 에 선택된 checkbox 해제
      setMemberData((prevData) => [...prevData, ...newMemberDataList]);
    };

    return (
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
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
        <Grid item xs={5} sx={{ pt: 0, textAlign: "right" }}>
          <OutlinedButton
            buttonName="추가"
            size="small"
            // color="secondary"
            endIcon={<MyIcon icon="plus" size={16} />}
            onClick={handleAddRow}
          />
          {/*<Stack direction="row" spacing={2} alignItems="center">*/}
          {/*  <DataCountResultInfo*/}
          {/*    totalCount={data.pageInfo.totalElements}*/}
          {/*  />*/}
          {/*</Stack>*/}
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, selectedRows, memeberData]);

  // [멤버 관리] - 멤버 선택
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    //custUkey: any
    row: any,
  ) => {
    if (event.target.checked) {
      console.log("custUkey", row);
      setSelectedMemberRows([...selectedMemberRows, row.custUkey]);
    } else {
      setSelectedMemberRows(
        selectedMemberRows.filter((rowId) => rowId !== row.custUkey),
      );
    }
  };

  // [멤버 관리] - 선택된 멤버 row 삭제
  const handleDeleteRows = () => {
    const newData = memeberData.filter(
      (row) => !selectedMemberRows.includes(row.custUkey),
    );
    setMemberData(newData);
    setSelectedMemberRows([]);
  };

  // 멤버 데이터 확인
  const handleMembersInfo = () => {
    console.log("memeberData", memeberData);
    //console.log("memeberData stringify", JSON.stringify(memeberData));
    onMemberSelection(memeberData);
    onClose();
  };

  // 고객 선택된 row 정보 확인
  const handleRowSelected = (rows: any) => {
    setSelectedRows(rows);
  };

  // 고객 추가 후 clear
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>소속 연구원 검색</ModalTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            {/*<MemberMngDataTable selectedMembers={selectedMembers} />*/}
            <DataTableBase
              data={filteredItems}
              columns={columns}
              pointerOnHover
              highlightOnHover
              customStyles={dataTableCustomStyles}
              onSelectedRowsChange={handleRowSelected}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              paginationResetDefaultPage={resetPaginationToggle}
              selectableRows={true}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30]}
              keyField="uniqueKey"
              key={key}
              // paginationServer
              // paginationTotalRows={totalElements}
              // onChangeRowsPerPage={handlePerRowsChange}
              // onChangePage={handlePageChange}
            />
          </Grid>

          <Grid item xs={5}>
            <Box>
              <Box sx={{ pt: 0.7, pb: 2, textAlign: "right" }}>
                <DeletedButton
                  buttonName="삭제"
                  endIcon={<MyIcon icon="trash" size={16} />}
                  onClick={handleDeleteRows}
                />
                {/*<OutlinedButton*/}
                {/*  buttonName="삭제"*/}
                {/*  size="small"*/}
                {/*  color="secondary"*/}
                {/*  endIcon={<MyIcon icon="trash" size={16} />}*/}
                {/*  onClick={handleDeleteRows}*/}
                {/*/>*/}
              </Box>
              <TableContainer>
                <Table>
                  <TableHead
                    sx={{
                      borderTop: "1px solid black",
                      backgroundColor: cjbsTheme.palette.grey["50"],
                      // "&.MuiTableHead-root": {
                      //   p: 0,
                      // },
                      ".MuiTableCell-head": {
                        p: 0.3,
                        pt: 1.7,
                        pb: 1.7,
                        fontWeight: 600,
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>멤버</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      ".MuiTableCell-body": {
                        p: 0.3,
                      },
                    }}
                  >
                    {memeberData.map((row: any) => (
                      <TableRow key={row.custUkey}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            size="small"
                            checked={selectedMemberRows.includes(row.custUkey)}
                            onChange={(event) =>
                              handleCheckboxChange(event, row)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5}>
                            <Box>{row.custNm}</Box>
                            <Box>({row.ebcEmail})</Box>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          pt: 3,
          pb: 3,
          justifyContent: "center",
        }}
      >
        <Stack direction="row" spacing={0.5}>
          <OutlinedButton buttonName="취소" onClick={onClose} />
          <ContainedButton buttonName="확인" onClick={handleMembersInfo} />
        </Stack>
      </DialogActions>
    </ModalContainer>
  );
};

export default MemberMngtNewModal;
