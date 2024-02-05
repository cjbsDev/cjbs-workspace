import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme, OutlinedButton } from "cjbsDSTM";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
// import { isDisabledAtom } from "../../../../../recoil/atoms/modalAtom";

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};
// const gigabyte: number = 1073741824;
const megabyte: number = 1048576;
const maxFileMB: number = 9;
const maxFileAdd: number = 30;
const FileDropzone = () => {
  // const setIsDis = useSetRecoilState(isDisabledAtom);
  const [state, setState] = useState({
    totalFileSize: 0,
    totalFileLen: 0,
  });
  const { register, getValues, setValue, control, formState, resetField } =
    useFormContext();
  const { errors } = formState;

  const onDrop = (acceptedFiles: File[], fileRejections: File[]) => {
    console.log("acceptedFiles", acceptedFiles);
    // console.log("fileRejections", fileRejections);
    // 선택한 파일을 폼 데이터에 설정
    const acceptedFilesLen = acceptedFiles.length;

    const totalFileSize = acceptedFiles
      .map((item) => item.size)
      .reduce((acc, cur, index) => {
        const sum = acc + cur;
        return sum;
      });

    if (totalFileSize > megabyte * maxFileMB) {
      console.log("FAIL1", totalFileSize);
      toast(`업로드한 파일은 최대${maxFileMB}MB를 넘을 수 없습니다.`);
      resetField("uploadFile");
      setState({
        totalFileSize: 0,
        totalFileLen: 0,
      });
    }

    if (acceptedFilesLen > maxFileAdd) {
      console.log("FAIL2", acceptedFilesLen);
      toast(`${maxFileAdd}개를 넘을 수 없습니다.`);
      resetField("uploadFile");
      setState({
        totalFileSize: 0,
        totalFileLen: 0,
      });
    }

    if (
      totalFileSize <= megabyte * maxFileMB &&
      acceptedFilesLen <= maxFileAdd
    ) {
      setValue("uploadFile", acceptedFiles);
      // setIsDis(false);
      setState({
        totalFileSize: totalFileSize,
        totalFileLen: acceptedFilesLen,
      });
    }
  };

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    open,
    isDragActive,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div>
      <Controller
        name="coverUploadFile"
        control={control}
        render={({ field }) => (
          <>
            <Grid container>
              <Grid item xs={6}>
                <Box
                  {...getRootProps({ className: "dropzone" })}
                  sx={{
                    py: 7,
                    textAlign: "center",
                    border: `1px dashed ${cjbsTheme.palette.grey["400"]}`,
                  }}
                >
                  <input
                    {...getInputProps()}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />

                  <Stack spacing={0.8}>
                    <Box>
                      <MyIcon icon="upload-paper" size={35} />
                    </Box>
                    <Typography variant="body2">
                      여기에 파일을 끌어다 놓습니다.
                    </Typography>
                    <Typography variant="body2">
                      컴퓨터에서 파일을 업로드할 수도 있습니다.
                    </Typography>
                  </Stack>
                  <OutlinedButton
                    color="secondary"
                    sx={{ color: "black", mt: 1 }}
                    buttonName="파일 선택"
                    size="small"
                    onClick={open}
                    startIcon={<MyIcon icon="plus" size={14} />}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  px: 2,
                  // py: 1,
                }}
              >
                <Typography variant="subtitle1">Upload Files</Typography>

                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: cjbsTheme.palette.grey["50"],
                  }}
                >
                  {acceptedFiles.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 177,
                      }}
                    >
                      <Typography variant="body2">No Files.</Typography>
                    </Box>
                  ) : (
                    <List
                      sx={{
                        overflowY: "auto",
                        height: 177,
                      }}
                    >
                      {acceptedFiles.map((item: File) => {
                        return (
                          <ListItem
                            disablePadding
                            key={item.name}
                            sx={{
                              // borderBottom: `1px solid ${cjbsTheme.palette.grey["300"]}`,
                              px: 1.5,
                            }}
                          >
                            <ListItemText
                              primary={
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="body1">
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: cjbsTheme.palette.text.secondary,
                                    }}
                                  >
                                    {formatBytes(item.size)}
                                    {/*{item.size*/}
                                    {/*  .toString()*/}
                                    {/*  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +*/}
                                    {/*  " bytes"}*/}
                                  </Typography>
                                </Stack>
                              }
                              primaryTypographyProps={{
                                sx: {
                                  fontSize: 13,
                                },
                              }}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </Box>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{ mt: 0.5 }}
                >
                  <Stack spacing={1} direction="row">
                    <Stack
                      direction="row"
                      divider={<Box sx={{ fontSize: 14 }}>&#47;</Box>}
                      spacing={0.3}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: cjbsTheme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        {formatBytes(state.totalFileSize)}
                      </Typography>
                      <Typography variant="body2">{maxFileMB}MB</Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      divider={<Box sx={{ fontSize: 14 }}>&#47;</Box>}
                      spacing={0.3}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: cjbsTheme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        {state.totalFileLen}개
                      </Typography>
                      <Typography variant="body2">{maxFileAdd}개</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      />
    </div>
  );
};

export default FileDropzone;
