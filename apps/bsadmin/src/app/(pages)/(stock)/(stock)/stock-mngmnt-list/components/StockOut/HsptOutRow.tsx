import React, { useEffect } from "react";
import { ContainedButton, InputValidation, TD, TH } from "cjbsDSTM";
import { Box, Stack, TableRow } from "@mui/material";
import { useFormContext } from "react-hook-form";
import useCenteredPopup from "../../../../../../hooks/useCenteredPopup";

const HsptOutRow = () => {
  const { setValue, clearErrors } = useFormContext();
  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/hsptListPopup`,
    "병원 거래 검색",
    800,
    620,
  );

  useEffect(() => {
    window.addEventListener("myHsptData", function (e) {
      console.log("myHsptData Received data:", e.detail);

      const { hsptCode, hsptNm, hsptUniqueCodeMc } = e.detail;

      setValue("stockHsptNm", hsptNm);
      setValue("hsptCode", hsptCode);
      setValue("stockHsptUkey", hsptUniqueCodeMc);

      clearErrors(["stockHsptNm", "hsptCode", "stockHsptUkey"]);
    });
  }, []);

  return (
    <TableRow>
      <TH>출고병원</TH>
      <TD>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box sx={{ width: 60 }}>
            <InputValidation
              inputName="hsptCode"
              InputProps={{
                readOnly: true,
              }}
              required={true}
              errorMessage="코드 필요"
            />
          </Box>

          <Box>
            <InputValidation
              inputName="stockHsptNm"
              InputProps={{
                readOnly: true,
              }}
              required={true}
              errorMessage="병원을 검색해 주세요."
            />
          </Box>

          <ContainedButton
            buttonName="병원 검색"
            size="small"
            onClick={openPopup}
          />
        </Stack>
      </TD>
    </TableRow>
  );
};

export default HsptOutRow;
