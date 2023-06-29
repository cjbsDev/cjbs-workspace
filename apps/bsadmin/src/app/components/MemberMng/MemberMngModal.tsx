import React, { useState, useMemo } from "react";
import {
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import {
  Box,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Radio,
  Stack,
  useTheme,
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
import MyIcon from "icon/myIcon";

interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
  isAcs: string;
  isLeader: string;
  isLeaderFlag: boolean;
}

const initialData: Member[] = [];

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectedMembers: Member[];
  onMemberSelection: (memeberData: Member[]) => void; // 새로 추가 0627
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MemberMngtNewModal = ({
  onClose,
  open,
  modalWidth,
  selectedMembers,
  onMemberSelection,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  /**
   * 고객 ( 왼쪽 테이블 )
   * 멤버 거래처의 구성원 ( 오른쪽 테이블 )
   *
   */

  // [고객] row 세팅
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [key, setKey] = useState<number>(0); // 특정 조건에서 checkbox 해제 할 때 필요

  console.log("모달 selectedMembers", selectedMembers);
  // [멤버] 정보 세팅
  const [memeberData, setMemberData] = useState<Member[]>(
    selectedMembers ?? initialData
  );
  const [selectedMemberRows, setSelectedMemberRows] = useState<number[]>([]);

  const [perPage, setPerPage] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list?page=${pageIndex}&size=${perPage}&isAcs=Y`,
    fetcher,
    {
      suspense: true,
    }
  );

  // [고객] 컬럼세팅
  const columns = useMemo(
    () => [
      {
        name: "고객",
        cell: (row: { custNm: any; ebcEmail: any }) => (
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
        cell: (row: { agncNm: any; instNm: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.agncNm}</Box>
              <Box>({row.instNm})</Box>
            </Stack>
          </>
        ),
        minWidth: "150px",
      },

      {
        name: "상태",
        cell: (row: { isAcs: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.isAcs == "Y" ? "사용" : "차단"}</Box>
            </Stack>
          </>
        ),
        width: "80px",
      },
    ],
    []
  );
  const filteredData = data.data.custList;

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
            <DataCountResultInfo
              totalCount={data.data.pageInfo.totalElements}
            />
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
  }, [filterText, resetPaginationToggle]);

  // [멤버 관리] - 멤버 선택
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    custUkey: any
  ) => {
    if (event.target.checked) {
      setSelectedMemberRows([...selectedMemberRows, custUkey]);
    } else {
      setSelectedMemberRows(
        selectedMemberRows.filter((rowId) => rowId !== custUkey)
      );
    }
  };

  // [멤버 관리] - row 추가
  const handleAddRow = () => {
    // 여기서 왼쪽 데이터를 받아서 넣어야 될듯.
    console.log("handleAddRow-selectedRows", selectedRows);

    // memeberData 체크해서 leader 가 없다면 리더로 체크
    let hasLeaderValue: boolean = memeberData.some(
      (row) => row.isLeader === "Y"
    );

    const newMemberDataList: Member[] = [];
    selectedRows.selectedRows.forEach((row: any) => {
      // 기존 멤버 확인 후 있다면 추가를 무시함
      const existingMember = memeberData.find(
        (member) => member.custUkey === row.custUkey
      );
      if (existingMember) {
        return;
      }

      let newRow: Member = {
        custUkey: row.custUkey,
        ebcEmail: row.ebcEmail,
        custNm: row.custNm,
        isAcs: row.isAcs,
        isLeader: "N",
        isLeaderFlag: false,
      };

      // [리더 체크] 기존 memberData 를 체크해서 리더가 없으면 첫번째 멤버를 리더로 설정
      if (!hasLeaderValue) {
        newRow.isLeader = "Y";
        newRow.isLeaderFlag = true;
        hasLeaderValue = true;
      }

      newMemberDataList.push(newRow);
      clearSelectedRows(); // 추가 후에 datatable 에 선택된 checkbox 해제
    });

    setMemberData((prevData) => [...prevData, ...newMemberDataList]);
  };

  // [멤버 관리] - 선택된 멤버 row 삭제
  const handleDeleteRows = () => {
    const newData = memeberData.filter(
      (row) => !selectedMemberRows.includes(row.custUkey)
    );
    // console.log("newData", newData);
    // 반영될 데이터를 체크해서 리더가 없다면 첫번째 값을 리더로 설정한다.
    let hasLeaderValue: boolean = newData.some(
      (row: any) => row.isLeader === "Y"
    );
    if (!hasLeaderValue) {
      if (newData.length > 0) {
        newData[0].isLeader = "Y";
        newData[0].isLeaderFlag = true;
      }
    }

    setMemberData(newData);
    setSelectedMemberRows([]);
  };

  // 멤버 관리 - 리더 변경
  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    custUkey: string
  ) => {
    const newData = memeberData.map((row) => {
      if (row.custUkey === custUkey) {
        return { ...row, isLeader: "Y", isLeaderFlag: true };
      } else {
        return { ...row, isLeader: "N", isLeaderFlag: false };
      }
    });

    console.log("newData // ", newData);
    setMemberData(newData);
    //selectedRows
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
    console.log("rows", rows);
    setSelectedRows(rows);
  };

  // 고객 추가 후 clear
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>고객 검색</ModalTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={7}>
            <DataTableBase
              data={filteredData}
              columns={columns}
              pointerOnHover
              highlightOnHover
              customStyles={dataTableCustomStyles}
              onSelectedRowsChange={handleRowSelected}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              paginationResetDefaultPage={resetPaginationToggle}
              selectableRows={true}
              paginationServer
              paginationTotalRows={5}
              onChangePage={(page, totalRows) => console.log(page, totalRows)}
              onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
                console.log(currentRowsPerPage, currentPage)
              }
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15]}
              keyField="uniqueKey" // Set a unique key field for re-rendering
              key={key} // Use the key for re-rendering DataTable
            />
          </Grid>
          <Grid item xs={1}>
            <Grid container direction="column" alignItems="center">
              <IconButton onClick={handleAddRow}>
                <MyIcon icon="cheveron-right" size={24} />
              </IconButton>
              <IconButton onClick={handleDeleteRows}>
                <MyIcon icon="cheveron-left" size={24} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>연구원</TableCell>
                      <TableCell>리더</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {memeberData.map((row: any) => (
                      <TableRow key={row.custUkey}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedMemberRows.includes(row.custUkey)}
                            onChange={(event) =>
                              handleCheckboxChange(event, row.custUkey)
                            }
                          />
                        </TableCell>
                        <TableCell>{row.custNm}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Radio
                              checked={row.isLeaderFlag || false}
                              onChange={(event) =>
                                handleRadioChange(event, row.custUkey)
                              }
                            />
                          </Box>
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
