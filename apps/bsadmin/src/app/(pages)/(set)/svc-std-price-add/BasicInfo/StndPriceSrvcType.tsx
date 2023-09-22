"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import axios from "axios";
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
import { cjbsTheme } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";

const apiUrl = `/mngr/stndPrice/srvcType/null/null`;
const StndPriceSrvcType = () => {
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  const srvcTypeList01 = data;
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const [selectValue01, setSelectValue01] = useState<string>("");
  const [selectValue02, setSelectValue02] = useState<number>();
  const [selectValue03, setSelectValue03] = useState<number>();

  const [selectLoading02, setSelectLoading02] = useState<boolean>(false);
  const [selectLoading03, setSelectLoading03] = useState<boolean>(false);

  const [srvcTypeList02, setSrvcTypeList02] = useState([]);
  const [srvcTypeList03, setSrvcTypeList03] = useState([]);

  const { setValue, clearErrors } = useFormContext();

  const handleListItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value: string
  ) => {
    setSelectLoading02(true);
    setSelectedIndex(index);

    console.log("value", value);

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/mngr/stndPrice/srvcType/${value}/null`
      )
      .then((res) => {
        console.log("res", res);
        if (res.data.success) {
          const srvcTypeList02Temp = res.data.data;
          //console.log("SecondSrvcType List DATA ==>>", srvcTypeList02Temp);
          setSrvcTypeList02(srvcTypeList02Temp);
          setSrvcTypeList03([]);
          setSelectValue01(value);
          //setValue("selectValue01", value);
          setSelectLoading02(false);
        } else {
          console.log("SUCCESS FALSE!!...");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleListScndItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value: string,
    selectValue01: string
  ) => {
    setSelectLoading03(true);
    setSelectValue02(index);
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/mngr/stndPrice/srvcType/${selectValue01}/${value}`
      )
      .then((res) => {
        if (res.data.success) {
          const srvcTypeList03s = res.data.data;
          //console.log("ThirdSrvcType List DATA ==>>", srvcTypeList03s);
          setSrvcTypeList03(srvcTypeList03s);
          setSelectLoading03(false);
        } else {
          console.log("SUCCESS FALSE!!...");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        <Typography variant="subtitle2">Breadcrumbs</Typography>
        <Typography variant="subtitle2">Breadcrumbs</Typography>
        <Typography variant="subtitle2">Breadcrumbs</Typography>
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
                      setValue("srvcTypeMc", value);
                      setValue("srvcTypeMcVal", optionName);
                      handleListItemClick(event, index, value);
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
                            setValue("anlsTypeMc", value);
                            setValue("anlsTypeMcVal", optionName);

                            handleListScndItemClick(
                              event,
                              index,
                              value,
                              selectValue01
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
                            setValue("anlsMtMc", value);
                            setValue("anlsMtMcVal", optionName);

                            setSelectValue03(index);
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
