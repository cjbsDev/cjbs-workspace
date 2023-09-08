import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Box, Stack, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme, OutlinedButton } from "cjbsDSTM";

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};
// const gigabyte: number = 1073741824;
const megabyte: number = 1048576;
const FileDropzone = () => {
  const [state, setState] = useState({
    totalFileSize: 0,
    totalFileLen: 0,
  });
  const { setValue, control } = useFormContext();

  const onDrop = (acceptedFiles: File[]) => {
    // 선택한 파일을 폼 데이터에 설정
    setValue("uploadFile", acceptedFiles);

    const acceptedFilesLen = acceptedFiles.length;

    const totalFileSize = acceptedFiles
      .map((item) => item.size)
      .reduce((acc, cur, index) => {
        const sum = acc + cur;
        return sum;
      });

    if (totalFileSize > megabyte * 5) {
      console.log("FAIL1", totalFileSize);
    }

    if (acceptedFilesLen > 30) {
      console.log("FAIL2", acceptedFilesLen);
    }

    setState({
      totalFileSize: totalFileSize,
      totalFileLen: acceptedFilesLen,
    });
  };

  const { acceptedFiles, getRootProps, getInputProps, open, isDragActive } =
    useDropzone({ onDrop, noClick: true, noKeyboard: true });

  return (
    <div>
      <Controller
        name="cover"
        control={control}
        render={({ field }) => (
          <>
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

              <Stack spacing={1}>
                <Box>
                  <MyIcon icon="upload-paper" size={35} />
                </Box>
                <Typography variant="body2">
                  여기에 파일을 끌어다 놓습니다.
                </Typography>
                <Typography variant="body2">
                  컴퓨터에서 파일을 업로드 할 수 도 있습니다.
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
            <Typography>
              선택한 파일 사이즈: {formatBytes(state.totalFileSize)} /{" "}
              {megabyte * 5} Bytes
            </Typography>
            <Typography>
              선택한 파일 개수: {state.totalFileLen}개 / 30개
            </Typography>
          </>
        )}
      />
    </div>
  );
};

export default FileDropzone;
