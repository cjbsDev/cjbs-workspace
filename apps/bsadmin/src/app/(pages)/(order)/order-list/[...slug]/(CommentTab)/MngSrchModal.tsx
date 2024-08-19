import React, { useState, useMemo, useEffect } from "react";
import {
  cjbsTheme,
  ContainedButton,
  DataTableBase,
  DataTableFilter,
  ModalContainer,
  ModalNoneTextTitle,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import {
  Box,
  Checkbox,
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
  Typography,
} from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import MyIcon from "icon/MyIcon";
import { useFormContext } from "react-hook-form";
import { fetcher } from "api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mngEmailListAtom } from "../../../../../recoil/atoms/mngEmailListAtom";

interface Member {
  ukey: string;
  email: string;
  nm: string;
  auth: string;
  departVal: string;
}

const initialData: Member[] = [];

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectedMembers: Member[];
  // onMemberSelection: (memeberData: Member[]) => void; // 새로 추가 0627
}

// const APIPATH = "/user/search/list";

const MngSrchModal = ({
  onClose,
  open,
  modalWidth,
  selectedMembers,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // [고객] row 세팅
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [key, setKey] = useState<number>(0); // 특정 조건에서 checkbox 해제 할 때 필요

  //console.log("모달 selectedMembers", selectedMembers);
  // [멤버] 정보 세팅
  const [memeberData, setMemberData] = useState<Member[]>(
    selectedMembers ?? initialData,
  );
  const [selectedMemberRows, setSelectedMemberRows] = useState<number[]>([]);

  const { data } = useSWR("/user/search/list", fetcher, {
    suspense: true,
  });
  console.log("담당자 조회 DATA", data);

  const { setValue, formState } = useFormContext();
  const [resEmailList, setResEmailList] = useRecoilState(mngEmailListAtom);

  console.log("이미 선택된 리스트 ==>>", resEmailList);

  // [고객] 컬럼세팅
  const columns = useMemo(
    () => [
      {
        name: "담당자",
        // allowOverflow: true,
        selector: (row) => row.nm,
        cell: (row) => (
          <>
            <Stack useFlexGap flexWrap="wrap">
              <Box>{row.nm}</Box>
              <Box>{row.email}</Box>
            </Stack>
          </>
        ),
      },
      {
        name: "부서",
        // width: "150px",
        selector: (row) => row.departVal,
        cell: (row) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.departVal}</Box>
            </Stack>
          </>
        ),
      },
    ],
    [],
  );

  const filteredItems = data.filter(
    (item) =>
      (item.nm && item.nm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.departVal &&
        item.departVal.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase())),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    // [멤버 관리] - row 추가
    const handleAddRow = () => {
      // 여기서 왼쪽 데이터를 받아서 넣어야 될듯.
      //console.log("handleAddRow-selectedRows", selectedRows);

      const newMemberDataList: Member[] = [];
      selectedRows.selectedRows.forEach((row: any) => {
        // 기존 멤버 확인 후 있다면 추가를 무시함
        const existingMember = memeberData.find(
          (member) => member.ukey === row.ukey,
        );
        if (existingMember) {
          return;
        }

        // if (row.nm) {
        //   toast("이미 거래처가 있는 고객은 연구원으로 등록 할 수 없습니다.");
        //   return;
        // }

        let newRow: { ukey: any; email: any; nm: any } = {
          ukey: row.ukey,
          email: row.email,
          nm: row.nm,
        };

        newMemberDataList.push(newRow as Member);
        clearSelectedRows(); // 추가 후에 datatable 에 선택된 checkbox 해제
      });

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
          {/*<OutlinedButton*/}
          {/*  buttonName="추가"*/}
          {/*  size="small"*/}
          {/*  endIcon={<MyIcon icon="plus" size={16} />}*/}
          {/*  onClick={handleAddRow}*/}
          {/*/>*/}
          {/*<Stack direction="row" spacing={2} alignItems="center">*/}
          {/*  <DataCountResultInfo*/}
          {/*    totalCount={data.pageInfo.totalElements}*/}
          {/*  />*/}
          {/*</Stack>*/}
        </Grid>
      </Grid>
    );
  }, [filterText, selectedRows]);

  // [멤버 관리] - 멤버 선택
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    //custUkey: any
    row: any,
  ) => {
    if (event.target.checked) {
      console.log("custUkey", row);
      setSelectedMemberRows([...selectedMemberRows, row.ukey]);
    } else {
      setSelectedMemberRows(
        selectedMemberRows.filter((rowId) => rowId !== row.ukey),
      );
    }
  };

  // [멤버 관리] - 선택된 멤버 row 삭제
  const handleDeleteRows = () => {
    const newData = memeberData.filter(
      (row) => !selectedMemberRows.includes(row.ukey),
    );
    setMemberData(newData);
    setSelectedMemberRows([]);
  };

  const handelAllDeleteRows = () => {
    setMemberData([]);
  };

  // 멤버 데이터 확인
  const handleMembersInfo = () => {
    console.log("memeberData", typeof memeberData);
    //console.log("memeberData stringify", JSON.stringify(memeberData));
    // onMemberSelection(memeberData);

    setValue("rcpnEmailList", memeberData);
    setResEmailList((prevData) => [...prevData, ...memeberData]);
    onClose();
  };

  // 고객 선택된 row 정보 확인
  const handleRowSelected = (selectedRows: any) => {
    console.log("고객 선택된 row 정보 확인", selectedRows);
    setSelectedRows(selectedRows);
  };

  // 고객 추가 후 clear
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setKey((prevKey) => prevKey + 1);
  };

  const contextActions = React.useMemo(() => {
    const handleSelectedAdd = () => {
      setMemberData(selectedRows.selectedRows);
    };

    const handleSelectedClear = () => {
      setToggleCleared(!toggleCleared);
    };

    return (
      <Stack direction="row" spacing={1}>
        <ContainedButton
          buttonName="추가"
          size="small"
          onClick={handleSelectedAdd}
          startIcon={<MyIcon icon="plus" size={16} />}
        />
        <OutlinedButton
          buttonName="초기화"
          size="small"
          onClick={handleSelectedClear}
        />
      </Stack>
    );
  }, [filteredItems, selectedRows, memeberData, toggleCleared]);

  const rowDisabled = (row) => {
    return resEmailList.some((list) => list.ukey === row.ukey);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalNoneTextTitle onClose={onClose} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <DataTableBase
              title={<Typography variant="title3">담당자 검색</Typography>}
              data={filteredItems}
              columns={columns}
              contextActions={contextActions}
              clearSelectedRows={toggleCleared}
              pointerOnHover
              highlightOnHover
              selectableRowsHighlight
              customStyles={dataTableCustomStyles}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              fixedHeader
              fixedHeaderScrollHeight={`380px`}
              paginationResetDefaultPage={resetPaginationToggle}
              selectableRows
              selectableRowsComponent={Checkbox}
              selectableRowDisabled={rowDisabled}
              onSelectedRowsChange={handleRowSelected}
              pagination
              paginationPerPage={15}
              paginationRowsPerPageOptions={[10, 15, 25]}
              // keyField="uniqueKey"
              // key={key}
            />
          </Grid>

          <Grid item xs={5}>
            <Box>
              <Box sx={{ pt: 7.8, pb: 2.5, textAlign: "right" }}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <OutlinedButton
                    buttonName="삭제"
                    size="small"
                    color="warning"
                    startIcon={<MyIcon icon="trash" size={16} />}
                    onClick={handleDeleteRows}
                    disabled={memeberData.length === 0}
                  />
                  <ContainedButton
                    buttonName="전체 삭제"
                    size="small"
                    color="warning"
                    startIcon={<MyIcon icon="trash" size={16} />}
                    onClick={handelAllDeleteRows}
                    disabled={memeberData.length === 0}
                  />
                </Stack>
              </Box>
              <TableContainer
                sx={{
                  maxHeight: 380,
                  backgroundColor: cjbsTheme.palette.grey.A100,
                }}
              >
                <Table stickyHeader>
                  <TableHead
                    sx={{
                      borderTop: "1px solid black",
                      backgroundColor: cjbsTheme.palette.grey["200"],
                      // "&.MuiTableHead-root": {
                      //   p: 0,
                      // },
                      ".MuiTableCell-head": {
                        p: 0.3,
                        pt: 1.0,
                        pb: 1.0,
                        fontWeight: 600,
                      },
                      ".MuiTableCell-stickyHeader": {
                        backgroundColor: cjbsTheme.palette.grey[800],
                        color: "white",
                        height: 44,
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>받는 사람</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      ".MuiTableCell-body": {
                        p: 0.3,
                      },
                    }}
                  >
                    {memeberData.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          sx={{ height: 350, textAlign: "center" }}
                        >
                          추가된 담당자가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}
                    {memeberData.map((row: any) => (
                      <TableRow key={row.ukey}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            // size="small"
                            checked={selectedMemberRows.includes(row.ukey)}
                            onChange={(event) =>
                              handleCheckboxChange(event, row)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5}>
                            <Box>{row.nm}</Box>
                            <Box>({row.email})</Box>
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
          pt: 0,
          pb: 3,
          justifyContent: "center",
        }}
      >
        <Stack direction="row" spacing={0.5}>
          <OutlinedButton buttonName="취소" onClick={onClose} size="small" />
          <ContainedButton
            buttonName="확인"
            disabled={memeberData.length <= 0}
            onClick={handleMembersInfo}
            size="small"
          />
        </Stack>
      </DialogActions>
    </ModalContainer>
  );
};

export default MngSrchModal;
