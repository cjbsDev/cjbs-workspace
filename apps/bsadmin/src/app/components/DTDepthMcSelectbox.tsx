// DT : DynamicTable DTDepthMcSelectbox
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext, useWatch } from "react-hook-form";
import { Typography } from "@mui/material";
import { SelectBox } from "cjbsDSTM";

interface InputNameProps {
  inputName: string;
  fieldName: string;
  control: any;
  index: number;
}

const DTDepthMcSelectbox = ({
  inputName,
  fieldName,
  control,
  index,
}: InputNameProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  const anlsTypeMc = productValue[index]?.anlsTypeMc;

  // 'anlsTypeMc'가 'BS_0100006006'일 때만 API 호출
  const { data, error, isValidating } = useSWR(
    anlsTypeMc === "BS_0100006006"
      ? `/code/list/shortly/value?topValue=Depth%28GB%29&midValue=none`
      : null,
    fetcher,
  );

  if (error) return <Typography>오류 발생: {error.message}</Typography>;
  if (isValidating) return <Typography>로딩 중...</Typography>;
  const options = anlsTypeMc === "BS_0100006006" && data ? data : [];

  // SelectBox 컴포넌트를 항상 보여주되, anlsTypeMc가 'BS_0100006006'이 아닐 경우 비활성화 상태로 설정
  return (
    <SelectBox
      inputName={inputName}
      options={options}
      disabled={anlsTypeMc !== "BS_0100006006"}
      sx={{ width: "100%" }}
    />
  );
};

export default DTDepthMcSelectbox;
