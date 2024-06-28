import React, { useEffect } from "react";
import { InputValidation, OutlinedButton, TD, TH } from "cjbsDSTM";
import { Stack, TableRow } from "@mui/material";
import useCenteredPopup from "../../../../../hooks/useCenteredPopup";
import { useFormContext } from "react-hook-form";

const InstAddRow = () => {
  const { setValue, clearErrors } = useFormContext();
  const { openPopup } = useCenteredPopup(
    `/instListPopup`,
    "기관 검색",
    790,
    620,
  );

  useEffect(() => {
    window.addEventListener("myInstData", function (e) {
      console.log("myInstData Received data:", e.detail);

      const { douzoneCode, instNm, instUniqueCodeMc } = e.detail;

      setValue("instNm", instNm);
      setValue("instUniqueCodeMc", instUniqueCodeMc);

      clearErrors(["instNm", "instUniqueCodeMc"]);
    });
  }, []);
  return (
    <TableRow>
      <TH sx={{ width: "15%" }}>기관명</TH>
      <TD sx={{ width: "85%" }} colSpan={5}>
        <Stack direction="row" spacing={0.5} alignItems="flex-start">
          <InputValidation
            inputName="instNm"
            disabled={true}
            required={true}
            errorMessage="소속기관을 선택해 주세요."
            placeholder="기관명"
            sx={{ width: 600 }}
          />

          <OutlinedButton
            size="small"
            buttonName="기관 검색"
            // onClick={agncSearchModalOpen}
            onClick={openPopup}
          />
        </Stack>
      </TD>
    </TableRow>
  );
};

export default InstAddRow;
