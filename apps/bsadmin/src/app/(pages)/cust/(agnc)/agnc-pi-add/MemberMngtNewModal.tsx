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
} from "@mui/material";

import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import MyIcon from "icon/myIcon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconDescBar from "../../../../components/IconDescBar";

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
              {/*
              <Box>

                <Chip
                  icon={
                    <MyIcon
                      icon="profile-circle-fill"
                      size={16}
                      color={theme.palette.primary.main}
                    />
                  }
                  label={"Leader"}
                  size="small"
                  sx={{
                    backgroundColor: "#E6F0FA",
                    color: "#006ECD",
                  }}
                />
              </Box>
               */}
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
              <Box>{row.instNm}</Box>
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
        minWidth: "150px",
      },
    ],
    []
  );

  const filteredData = data.data.custList;
  /*
  const filteredData = data.data.custList.filter(
    (item) =>
      item.agncNm &&
      item.agncNm.toLowerCase().includes(filterText.toLowerCase())
  );
  */

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
                        value="female"
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
