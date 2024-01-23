import React from "react";
import Link from "next/link";
import { ContainedButton, OutlinedButton } from "cjbsDSTM";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import LoadingWhiteSvg from "../../../../../components/LoadingWhiteSvg";

interface ActionBtnsProps {
  isLoading: boolean;
  isDisabled: boolean;
}

const ActionBtns = ({ isLoading, isDisabled }: ActionBtnsProps) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const invcUkey = searchParams.get("invcUkey");
  const { watch } = useFormContext();
  const agncUkeyValue = watch("agncUkey");

  const isTypeBtnName = type === "modify" ? "수정" : "등록";
  const isTypeLink =
    type === "modify"
      ? `/ledger-tax-invoice-list/${invcUkey}`
      : "/ledger-tax-invoice-list";

  return (
    <Stack direction="row" spacing={0.5} justifyContent="center">
      <Link href={isTypeLink}>
        <OutlinedButton size="small" buttonName="목록" />
      </Link>

      {agncUkeyValue !== "" && agncUkeyValue !== undefined && (
        <ContainedButton
          size="small"
          type="submit"
          buttonName={isTypeBtnName}
          endIcon={isLoading ? <LoadingWhiteSvg /> : null}
          disabled={isDisabled}
        />
      )}
    </Stack>
  );
};

export default ActionBtns;
