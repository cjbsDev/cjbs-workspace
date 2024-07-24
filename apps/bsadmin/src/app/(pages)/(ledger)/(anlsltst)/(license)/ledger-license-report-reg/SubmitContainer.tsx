import React from "react";
import Link from "next/link";
import { ContainedButton, OutlinedButton } from "cjbsDSTM";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormContext, useWatch } from "react-hook-form";

const SubmitContainer = () => {
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { isDirty, isValid, isSubmitting, dirtyFields },
  } = useFormContext();
  const fieldArrayName = "costList";
  const productValue =
    useWatch({
      name: fieldArrayName,
      control,
    }) || []; // productValue가 undefined일 경우 빈 배열을 기본값으로 사용

  console.log("ALL Values ==>>", getValues());

  if (productValue.length === 0) {
    return null;
  }
  return (
    <Stack direction="row" spacing={0.5} justifyContent="center">
      <Link href="/ledger-analysis-report-list">
        <OutlinedButton size="small" buttonName="목록" />
      </Link>

      {/*<ContainedButton*/}
      {/*  size="small"*/}
      {/*  type="submit"*/}
      {/*  buttonName="저장"*/}
      {/*  // endIcon={isLoading ? <LoadingWhiteSvg /> : null}*/}
      {/*/>*/}

      <LoadingButton
        loading={isSubmitting}
        variant="contained"
        type="submit"
        size="small"
      >
        등록
      </LoadingButton>
    </Stack>
  );
};

export default SubmitContainer;
