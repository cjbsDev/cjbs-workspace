import React from "react";
import Link from "next/link";
import { ContainedButton, OutlinedButton } from "cjbsDSTM";
import LoadingSvg from "public/svg/loading_wh.svg";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface ActionBtnsProps {
  isLoading: boolean;
}

const ActionBtns = ({ isLoading }: ActionBtnsProps) => {
  const { watch, getValues } = useFormContext();
  const agncUkeyValue = watch("agncUkey");

  return (
    <Stack direction="row" spacing={0.5} justifyContent="center">
      <Link href="/tax-invoice-list">
        <OutlinedButton size="small" buttonName="목록" />
      </Link>

      {agncUkeyValue !== "" && agncUkeyValue !== undefined && (
        <ContainedButton
          size="small"
          type="submit"
          buttonName="저장"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      )}
    </Stack>
  );
};

export default ActionBtns;
