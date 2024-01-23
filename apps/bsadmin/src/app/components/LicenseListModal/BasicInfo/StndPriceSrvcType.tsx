"use client";
import React, { useCallback, useState } from "react";
import useSWR from "swr";
import { fetcher, GET } from "api";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import axios from "axios";
import { grey } from "cjbsDSTM/themes/color";
import {cjbsTheme, ContainedButton} from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

// const apiUrl = `/mngr/stndPrice/srvcType/null/null`;
const apiUrl = `/mngr/stndPrice/srvcType/BS_0100005002/null`;
const StndPriceSrvcType = (props: any) => {
  const { type, handlePlatformChange, onClose } = props;

  const apiUrl = `/mngr/stndPrice/srvcType/${type}/null`;

  const [selectedIndex, setSelectedIndex] = useState<number>();

  const [selectValue01, setSelectValue01] = useState<string>("BS_0100005002");
  const [selectValue02, setSelectValue02] = useState<number>();
  const [selectValue02OptionNm, setSelectValue02OptionNm] = useState<string>();
  const [selectValue03, setSelectValue03] = useState<number>();

  const [selectLoading02, setSelectLoading02] = useState<boolean>(false);
  const [selectLoading03, setSelectLoading03] = useState<boolean>(false);

  // const [srvcTypeList02, setSrvcTypeList02] = useState([]);
  const [srvcTypeList03, setSrvcTypeList03] = useState([]);

  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  // const srvcTypeList01 = data;
  const srvcTypeList02 = data;
  //console.log("SecondSrvcType List DATA ==>>", srvcTypeList02Temp);

  const { setValue, clearErrors } = useFormContext();

  const handleListScndItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value: string,
    selectValue01: string,
  ) => {
    setSelectLoading03(true);
    setSelectValue02(index);

    try {
      const res = await GET(
        `/mngr/stndPrice/srvcType/${selectValue01}/${value}`,
      );

      if (res.success) {
        const srvcTypeList03s = res.data;
        //console.log("ThirdSrvcType List DATA ==>>", srvcTypeList03s);
        setSrvcTypeList03(srvcTypeList03s);
        setSelectLoading03(false);
      } else {
        console.log("SUCCESS FALSE!!...");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  const handleSelectButtonClick = (selectItem: any) => {
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"+ selectValue02OptionNm, selectItem);
    onClose();
    setValue("pltfValueView", selectValue02OptionNm + ' > ' + selectItem.optionName);
    setValue("pltfMc", selectItem.value);
    handlePlatformChange("test");
  };

  return (
    <Box>
      <Grid container sx={{marginY:0.5}}>
        <Grid item xs={5}
          sx={{
            backgroundColor: grey["100"],
            border: `1px solid ${grey["400"]}`,
            // borderRight: '0px',
            borderBottom: "none",
            p: "16px 16px",
            color: "black",
          }}
        >
          분석종류
        </Grid>
        <Grid item xs={5}
          sx={{
            backgroundColor: grey["100"],
            border: `1px solid ${grey["400"]}`,
            borderLeft: '0px',
            borderBottom: "none",
            p: "16px 16px",
            color: "black",
          }}
        >
          플랫폼
        </Grid>
        <Grid item xs={2}
          sx={{
            backgroundColor: grey["100"],
            border: `1px solid ${grey["400"]}`,
            borderLeft: '0px',
            borderBottom: "none",
            p: "6px 16px",
            color: "black",
          }}
        >
        </Grid>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="stretch"
          spacing={0}
          sx={{ width: "100%", border: `1px solid ${grey["400"]}` }}
        >

          {/* 1차 : anlsTypeMc / anlsTypeMcVal */}
          <Grid item xs={5}>
            {srvcTypeList02.length === 0 ? (
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  p: 2,
                  height: "100%",
                }}
              >
                <Typography variant="body2">List Data Empty.</Typography>
              </Box>
            ) : (
              <>
                {selectLoading02 ? (
                  <Box
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <CircularProgress size={20} />
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {srvcTypeList02.map((item: any, index: number) => {
                      const { optionName, value } = item;
                      return (
                        <ListItemButton
                          key={value}
                          selected={selectValue02 === index}
                          onClick={(event) => {
                            console.log("2 : " + optionName + " / " + value);
                            setValue("anlsTypeMc", value);
                            setValue("anlsTypeMcVal", optionName);
                            setSelectValue02OptionNm(optionName);

                            handleListScndItemClick(
                              event,
                              index,
                              value,
                              selectValue01,
                            );
                          }}
                        >
                          <ListItemText primary={optionName} />
                          <MyIcon icon="cheveron-right" size={20} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                )}
              </>
            )}
          </Grid>

          {/* 2차 : anlsMtMc / anlsMtMcVal */}
          <Grid item xs={5}>
            {srvcTypeList03.length === 0 ? (
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  height: "100%",
                }}
              >
                <Typography variant="body2">List Data Empty.</Typography>
              </Box>
            ) : (
              <>
                {selectLoading03 ? (
                  <Box
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <CircularProgress size={20} />
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {srvcTypeList03.map((item: any, index: number) => {
                      const { optionName, value } = item;
                      return (
                        <ListItemButton
                          key={value}
                          // selected={selectValue03 === index}
                          // onClick={() => {
                          //   console.log("3 : " + optionName + " / " + value);
                          //   setValue("anlsMtMc", value);
                          //   setValue("anlsMtMcVal", optionName);
                          //
                          //   setSelectValue03(index);
                          // }}
                        >
                          <ListItemText primary={optionName} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                )}
              </>
            )}
          </Grid>

          {/* 3차 : anlsMtMc / anlsMtMcVal */}
          <Grid item xs={2}>
            {srvcTypeList03.length === 0 ? (
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  height: "100%",
                }}
              >
                <Typography variant="body2">List Data Empty.</Typography>
              </Box>
            ) : (
              <>
                {selectLoading03 ? (
                  <Box
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <CircularProgress size={20} />
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {srvcTypeList03.map((item: any, index: number) => {
                      const { optionName, value } = item;
                      return (
                        <ListItemButton
                          key={value}
                          // selected={selectValue03 === index}
                          // onClick={() => {
                          //   console.log("3 : " + optionName + " / " + value);
                          //   setValue("anlsMtMc", value);
                          //   setValue("anlsMtMcVal", optionName);
                          //
                          //   setSelectValue03(index);
                          // }}
                          sx={{ paddingY: "7px", justifyContent: "center" }}
                        >
                          {/*<ListItemText primary={*/}
                            <ContainedButton
                              // type="submit"
                              size="medium"
                              buttonName="선택"
                              onClick={() => {
                                handleSelectButtonClick(item);
                              }}
                              sx={{ m:0 }}
                            />
                          {/*} />*/}
                        </ListItemButton>
                      );
                    })}
                  </List>
                )}
              </>
            )}
          </Grid>
        </Stack>
      </Grid>
    </Box>
  );
};

export default StndPriceSrvcType;
