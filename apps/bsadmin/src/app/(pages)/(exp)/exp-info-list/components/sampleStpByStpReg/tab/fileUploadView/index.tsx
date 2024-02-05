import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import FileDropzone from "./FileDropzone";
import { Form, OutlinedButton } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: object) => {
    setIsLoading(true);
    console.log("File Upload ResData", data);
  };
  return (
    <Box>
      <Form onSubmit={onSubmit}>
        <FileDropzone />

        <Box sx={{ mt: 1 }}>
          <Stack direction="row" justifyContent="center" spacing={1}>
            {/*<OutlinedButton*/}
            {/*  buttonName="취소"*/}
            {/*  onClick={onClose}*/}
            {/*  color="secondary"*/}
            {/*/>*/}
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
              form="runAddForm"
            >
              등록
            </LoadingButton>
          </Stack>
        </Box>
      </Form>
    </Box>
  );
};

export default Index;
