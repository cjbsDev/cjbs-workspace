/**
 * 
 * 
 2. 멤버 정보 세팅  // ~17시
    - Load ( 멤버 정보 )  // ok
    - 고객 -> 멤버 설정 ( 추가 )  
      - ">" 버튼 눌렀을 때 "왼쪽에서" 선택한 고객 리스트 가져오기 
      - ">" 버튼 눌렀을 때 오른쪽 테이블에 임의값 추가하기
      - ">" 버튼 눌렀을 때 오른쪽 테이블에 왼쪽 선택한 고객 추가하기
    - 고객 -> 멤버 설정 ( 삭제 )
      - "<" 버튼 눌렀을 때 "오른쪽에서" 선택한 고객 리스트 가져오기 
      - "<" 버튼 눌렀을 때 선택한 고객 리스트 빼기
      - useState 저장

    - 고객 -> 멤버 설정 ( 리더 설정 - 디폴트 1번째 멤버 ) 
    - 고객 -> 멤버 설정 ( 리더 설정 - 라디오 버튼으로 변경 ) // 추후  
    - 등록하기 ( 기본 정보 + 멤버 정보 + 운영 상수값 )
 * 
 * 
 */

import React, { useState, useMemo } from "react";
import {
  cjbsTheme,
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ExcelDownloadButton,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  Title1,
  UnStyledButton,
} from "cjbsDSTM";
import {
  Box,
  Chip,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  Stack,
  useTheme,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
} from "@mui/material";

import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import MyIcon from "icon/myIcon";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconDescBar from "../../../../components/IconDescBar";

interface DataRow {
  id: number;
  member: string;
  isLeader: boolean;
}

const initialData: DataRow[] = [
  { id: 1, member: "John Doe", isLeader: false },
  { id: 2, member: "Jane Smith", isLeader: true },
  { id: 3, member: "Bob Johnson", isLeader: false },
  { id: 4, member: "Alice Williams", isLeader: false },
];

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// https://dummyjson.com/products?limit=10&skip=10
const MemberMngtNewModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [memeberData, setMemberData] = useState<DataRow[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const theme = useTheme();
  const [perPage, setPerPage] = useState(3);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list?page=${pageIndex}&size=${perPage}`,
    fetcher,
    {
      suspense: true,
    }
  );
  // const [totalRows, setTotalRows] = useState(data.pageInfo.totalElements);
  const { register, setValue } = useFormContext();
  const [checked, setChecked] = useState([0]);

  console.log("Modal data", data.data);

  // useMemo will only be created once
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

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newData = memeberData.map((row) => {
      if (row.id === id) {
        return { ...row, isLeader: true };
      } else {
        return { ...row, isLeader: false };
      }
    });
    setMemberData(newData);
  };
  const handleAddRow = () => {
    const newId = memeberData.length + 1;
    const newRow: DataRow = {
      id: newId,
      member: `New Member ${newId}`,
      isLeader: false,
    };
    setMemberData([...memeberData, newRow]);
  };

  const handleDeleteRows = () => {
    const newData = memeberData.filter((row) => !selectedRows.includes(row.id));
    setMemberData(newData);
    setSelectedRows([]);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>멤버 관리</ModalTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={7}>
            <DataTableBase
              data={filteredData}
              columns={columns}
              pointerOnHover
              highlightOnHover
              customStyles={dataTableCustomStyles}
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
            />
          </Grid>
          <Grid item xs={1}>
            <Grid container direction="column" alignItems="center">
              <IconButton>
                <MyIcon icon="cheveron-right" size={24} />
              </IconButton>
              <IconButton>
                <MyIcon icon="cheveron-left" size={24} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ border: `1px solid ${cjbsTheme.palette.grey["400"]}` }}
          >
            {/*<Box*/}
            {/*  sx={{*/}
            {/*    display: "flex",*/}
            {/*    justifyContent: "center",*/}
            {/*    alignItems: "center",*/}
            {/*    height: "100%",*/}
            {/*    width: 200,*/}
            {/*    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  멤버를 추가해주세요.*/}
            {/*</Box>*/}
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <FormControlLabel
                        value="readerYN"
                        control={<Radio size="small" />}
                        label="리더"
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          size="small"
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`Line item ${value + 1}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
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
          <OutlinedButton
            buttonName="취소"
            // onClick={() => router.push("cust-list")}
          />
          <ContainedButton buttonName="확인" />
        </Stack>
      </DialogActions>
    </ModalContainer>
  );
};

export default MemberMngtNewModal;
