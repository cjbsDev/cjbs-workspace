"use client";
import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../../../../func/fetcher";
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
import MyIcon from "icon/myIcon";
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

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/stndPrice/srvcType/null/null`;
const StndPriceSrvcType = () => {
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  const firstSrvcTypeLists = data.data;
  const [frstValue, setFrstValue] = useState<string>("");
  const [scndValue, setScndValue] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectedScndIndex, setSelectedScndIndex] = useState<number>();
  const [selectedThrdIndex, setSelectedThrdIndex] = useState<number>();
  const [scndIsLoading, setScndIsLoading] = useState<boolean>(false);
  const [thrdIsLoading, setThrdIsLoading] = useState<boolean>(false);
  const [scndSrvcTypeList, setScndSrvcTypeList] = useState([]);
  const [thrdSrvcTypeList, setThrdSrvcTypeList] = useState([]);

  const handleListItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value: string
  ) => {
    setScndIsLoading(true);
    setSelectedIndex(index);
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/mngr/stndPrice/srvcType/${value}/null`
      )
      .then((res) => {
        if (res.data.success) {
          const scndSrvcTypeLists = res.data.data;
          console.log("SecondSrvcType List DATA ==>>", scndSrvcTypeLists);
          setScndSrvcTypeList(scndSrvcTypeLists);
          setThrdSrvcTypeList([]);
          setFrstValue(value);
          setScndIsLoading(false);
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
    frstValue: string
  ) => {
    setThrdIsLoading(true);
    setSelectedScndIndex(index);
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/mngr/stndPrice/srvcType/${frstValue}/${value}`
      )
      .then((res) => {
        if (res.data.success) {
          const thrdSrvcTypeLists = res.data.data;
          console.log("ThirdSrvcType List DATA ==>>", thrdSrvcTypeLists);
          setThrdSrvcTypeList(thrdSrvcTypeLists);
          setThrdIsLoading(false);
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
          <Grid item xs={4}>
            <List sx={{ p: 0 }}>
              {firstSrvcTypeLists.map((item: any, index: number) => {
                const { optionName, value } = item;
                return (
                  <ListItemButton
                    sx={{
                      color:
                        selectedIndex === index
                          ? cjbsTheme.palette.primary.main
                          : "black",
                    }}
                    selected={selectedIndex === index}
                    onClick={(event) =>
                      handleListItemClick(event, index, value)
                    }
                  >
                    <ListItemText primary={optionName} />
                    <MyIcon icon="cheveron-right" size={20} />
                  </ListItemButton>
                );
              })}
            </List>
          </Grid>

          <Grid item xs={4}>
            {scndSrvcTypeList.length === 0 ? (
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
                {scndIsLoading ? (
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
                    {scndSrvcTypeList.map((item: any, index: number) => {
                      const { optionName, value } = item;
                      return (
                        <ListItemButton
                          selected={selectedScndIndex === index}
                          onClick={(event) =>
                            handleListScndItemClick(
                              event,
                              index,
                              value,
                              frstValue
                            )
                          }
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

          <Grid item xs={4}>
            {thrdSrvcTypeList.length === 0 ? (
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
                {thrdIsLoading ? (
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
                    {thrdSrvcTypeList.map((item: any, index: number) => {
                      const { optionName, value } = item;
                      return (
                        <ListItemButton
                          selected={selectedThrdIndex === index}
                          onClick={() => {
                            console.log("ccccccc");
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

      {/*<Grid*/}
      {/*  container*/}
      {/*  sx={{ border: `1px solid ${grey["400"]}`, alignSelf: "stretch" }}*/}
      {/*>*/}
      {/*  <Grid item xs={4}>*/}
      {/*    <List>*/}
      {/*      {firstSrvcTypeLists.map((item: any, index: number) => {*/}
      {/*        const { optionName, value } = item;*/}
      {/*        return (*/}
      {/*          <ListItemButton*/}
      {/*            selected={selectedIndex === index}*/}
      {/*            onClick={(event) => handleListItemClick(event, index, value)}*/}
      {/*          >*/}
      {/*            <ListItemText primary={optionName} />*/}
      {/*            <ListItemIcon>*/}
      {/*              <MyIcon icon="cheveron-right" size={20} />*/}
      {/*            </ListItemIcon>*/}
      {/*          </ListItemButton>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </List>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={4}>*/}
      {/*    {scndSrvcTypeList.length === 0 ? (*/}
      {/*      <Box*/}
      {/*        sx={{*/}
      {/*          height: "100%",*/}
      {/*          justifyContent: "center",*/}
      {/*          alignItems: "center",*/}
      {/*          display: "flex",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <Typography variant="body2">List Data Empty.</Typography>*/}
      {/*      </Box>*/}
      {/*    ) : (*/}
      {/*      <List>*/}
      {/*        {scndSrvcTypeList.map((item: any, index: number) => {*/}
      {/*          const { optionName, value } = item;*/}
      {/*          return (*/}
      {/*            <ListItemButton*/}
      {/*              selected={selectedScndIndex === index}*/}
      {/*              onClick={(event) =>*/}
      {/*                handleListScndItemClick(event, index, value, frstValue)*/}
      {/*              }*/}
      {/*            >*/}
      {/*              <ListItemText primary={optionName} />*/}
      {/*              <ListItemIcon>*/}
      {/*                <MyIcon icon="cheveron-right" size={20} />*/}
      {/*              </ListItemIcon>*/}
      {/*            </ListItemButton>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </List>*/}
      {/*    )}*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={4}>*/}
      {/*    {thrdSrvcTypeList.length === 0 ? (*/}
      {/*      <Box*/}
      {/*        sx={{*/}
      {/*          height: "100%",*/}
      {/*          justifyContent: "center",*/}
      {/*          alignItems: "center",*/}
      {/*          display: "flex",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <Typography variant="body2">List Data Empty.</Typography>*/}
      {/*      </Box>*/}
      {/*    ) : (*/}
      {/*      <List>*/}
      {/*        {thrdSrvcTypeList.map((item: any, index: number) => {*/}
      {/*          const { optionName, value } = item;*/}
      {/*          return (*/}
      {/*            <ListItemButton*/}
      {/*              selected={selectedThrdIndex === index}*/}
      {/*              // onClick={(event) =>*/}
      {/*              //   handleListScndItemClick(event, index, value, frstValue)*/}
      {/*              // }*/}
      {/*            >*/}
      {/*              <ListItemText primary={optionName} />*/}
      {/*              <ListItemIcon>*/}
      {/*                <MyIcon icon="cheveron-right" size={20} />*/}
      {/*              </ListItemIcon>*/}
      {/*            </ListItemButton>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </List>*/}
      {/*    )}*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
    </Box>
  );
};

export default StndPriceSrvcType;
