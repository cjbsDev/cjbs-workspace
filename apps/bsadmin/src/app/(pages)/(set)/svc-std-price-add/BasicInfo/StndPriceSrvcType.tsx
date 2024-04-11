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
import { grey } from "cjbsDSTM/themes/color";
import { cjbsTheme } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";

const apiUrl = `/mngr/stndPrice/srvcType/null/null`;
const StndPriceSrvcType = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [breadcrumbsData, setBreadcrumbsData] = useState<Array<string>>([]);
  const [selectValue01, setSelectValue01] = useState<string>("");
  const [selectValue02, setSelectValue02] = useState<number>();
  const [selectValue03, setSelectValue03] = useState<number>();
  const [selectLoading02, setSelectLoading02] = useState<boolean>(false);
  const [selectLoading03, setSelectLoading03] = useState<boolean>(false);
  const [srvcTypeList02, setSrvcTypeList02] = useState([]);
  const [srvcTypeList03, setSrvcTypeList03] = useState([]);
  const { setValue } = useFormContext();

  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  const srvcTypeList01 = data;

  const updateBreadcrumbs = (level, value) => {
    let newBreadcrumbs = [...breadcrumbsData];
    newBreadcrumbs = newBreadcrumbs.slice(0, level);
    newBreadcrumbs.push(value);
    setBreadcrumbsData(newBreadcrumbs);
  };

  const handleListItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value: string,
    optionName: string,
  ) => {
    setSelectLoading02(true);
    setSelectedIndex(index);
    updateBreadcrumbs(0, optionName);

    try {
      const res = await GET(`/mngr/stndPrice/srvcType/${value}/null`);
      if (res.success) {
        setSrvcTypeList02(res.data);
        setSrvcTypeList03([]);
        setSelectValue01(value);
        setValue("srvcTypeMc", value);
        setValue("srvcTypeMcVal", optionName);
      } else {
        console.log("SUCCESS FALSE!!...");
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setSelectLoading02(false);
    }
  };

  const handleListScndItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value: string,
    selectValue01: string,
    optionName: string,
  ) => {
    setSelectLoading03(true);
    setSelectValue02(index);
    updateBreadcrumbs(1, optionName);

    try {
      const res = await GET(
        `/mngr/stndPrice/srvcType/${selectValue01}/${value}`,
      );
      if (res.success) {
        setSrvcTypeList03(res.data);
        setValue("anlsTypeMc", value);
        setValue("anlsTypeMcVal", optionName);
      } else {
        console.log("SUCCESS FALSE!!...");
      }
    } catch (error) {
      console.error("request failed:", error);
    } finally {
      setSelectLoading03(false);
    }
  };

  const handleListThrdItemClick = (
    index: number,
    value: string,
    optionName: string,
  ) => {
    setSelectValue03(index);
    updateBreadcrumbs(2, optionName);
    setValue("anlsMtMc", value);
    setValue("anlsMtMcVal", optionName);
  };

  return (
    <Box>
      <Breadcrumbs
        sx={{
          backgroundColor: grey["100"],
          border: `1px solid ${grey["400"]}`,
          borderBottom: "none",
          p: "6px 16px",
          color: "black",
        }}
        separator=">"
      >
        {breadcrumbsData.length === 0 ? (
          <Typography variant="subtitle2" color="secondary">
            No Selected.
          </Typography>
        ) : (
          breadcrumbsData.map((text, index) => (
            <Typography key={index} variant="subtitle2">
              {text}
            </Typography>
          ))
        )}
      </Breadcrumbs>
      <Grid container>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="stretch"
          spacing={0}
          sx={{ width: "100%", border: `1px solid ${grey["400"]}` }}
        >
          {/* 1차 : srvcTypeMc / srvcTypeMcVal */}
          <Grid item xs={4}>
            <List sx={{ p: 0 }}>
              {srvcTypeList01.map((item: any, index: number) => {
                const { optionName, value } = item;
                return (
                  <ListItemButton
                    key={value}
                    sx={{
                      color:
                        selectedIndex === index
                          ? cjbsTheme.palette.primary.main
                          : "black",
                    }}
                    selected={selectedIndex === index}
                    onClick={(event) => {
                      console.log("1 : " + optionName + " / " + value);
                      handleListItemClick(event, index, value, optionName);
                    }}
                  >
                    <ListItemText primary={optionName} />
                    <MyIcon icon="cheveron-right" size={20} />
                  </ListItemButton>
                );
              })}
            </List>
          </Grid>

          {/* 2차 : anlsTypeMc / anlsTypeMcVal */}
          <Grid item xs={4}>
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
                            handleListScndItemClick(
                              event,
                              index,
                              value,
                              selectValue01,
                              optionName,
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

          {/* 3차 : anlsMtMc / anlsMtMcVal */}
          <Grid item xs={4}>
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
                          selected={selectValue03 === index}
                          onClick={() => {
                            console.log("3 : " + optionName + " / " + value);
                            handleListThrdItemClick(index, value, optionName);
                          }}
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
        </Stack>
      </Grid>
    </Box>
  );
};

export default StndPriceSrvcType;
