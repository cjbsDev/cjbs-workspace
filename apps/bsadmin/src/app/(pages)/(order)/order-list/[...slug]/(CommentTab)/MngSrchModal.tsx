import React, { useState, useMemo } from "react";
import {
  cjbsTheme,
  ContainedButton,
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
import { useFormContext } from "react-hook-form";
import { fetcher } from "api";
import { useSetRecoilState } from "recoil";
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

const APIPATH = "/user/search/list";

const MngSrchModal = ({
  onClose,
  open,
  modalWidth,
  selectedMembers,
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

  //console.log("모달 selectedMembers", selectedMembers);
  // [멤버] 정보 세팅
  const [memeberData, setMemberData] = useState<Member[]>(
    selectedMembers ?? initialData,
  );
  const [selectedMemberRows, setSelectedMemberRows] = useState<number[]>([]);
  const { data } = useSWR(APIPATH, fetcher, {
    suspense: true,
  });

  console.log("담당자 조회 DATA", data);

  const { setValue, formState } = useFormContext();
  const setResEmailList = useSetRecoilState(mngEmailListAtom);

  // [고객] 컬럼세팅
  const columns = useMemo(
    () => [
      {
        name: "담당자",
        allowOverflow: true,
        cell: (row) => (
          <>
            <Stack
              // direction="row"
              // spacing={0.4}
              // alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.nm}</Box>
              <Box>{row.email}</Box>
            </Stack>
          </>
        ),
      },
      {
        name: "부서",
        width: "150px",
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

  const filteredData = data;

  const filteredItems = filteredData.filter(
    (item) =>
      item.nm && item.nm.toLowerCase().includes(filterText.toLowerCase()),
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

        let newRow: Member = {
          ukey: row.ukey,
          email: row.email,
          nm: row.nm,
        };

        newMemberDataList.push(newRow);
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
          <OutlinedButton
            buttonName="추가"
            size="small"
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
  const handleRowSelected = (rows: any) => {
    console.log("EREREER", rows);
    setSelectedRows(rows);
  };

  // 고객 추가 후 clear
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>담당자 검색</ModalTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={7}>
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
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15]}
              keyField="uniqueKey"
              key={key}
            />
          </Grid>

          <Grid item xs={5}>
            <Box>
              <Box sx={{ pt: 0.7, pb: 2, textAlign: "right" }}>
                <OutlinedButton
                  buttonName="삭제"
                  size="small"
                  color="warning"
                  endIcon={<MyIcon icon="trash" size={16} />}
                  onClick={handleDeleteRows}
                />
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
                        pt: 1.0,
                        pb: 1.0,
                        fontWeight: 600,
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
                    {memeberData.map((row: any) => (
                      <TableRow key={row.ukey}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            size="small"
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
          pt: 3,
          pb: 3,
          justifyContent: "center",
        }}
      >
        <Stack direction="row" spacing={0.5}>
          <OutlinedButton buttonName="취소" onClick={onClose} />
          <ContainedButton
            buttonName="확인"
            disabled={memeberData.length <= 0}
            onClick={handleMembersInfo}
          />
        </Stack>
      </DialogActions>
    </ModalContainer>
  );
};

export default MngSrchModal;
