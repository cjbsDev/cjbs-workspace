import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Stack, TableRow } from "@mui/material";
import { ContainedButton, InputValidation, TD, TH } from "cjbsDSTM";
import useCenteredPopup from "../../../../hooks/useCenteredPopup";

const HsptCodeSrchRow = () => {
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
      setValue("hsptUniqueCodeMc", hsptUniqueCodeMc);

      clearErrors(["instNm", "instUniqueCodeMc"]);
    });
  }, []);

  return (
    <>
      <TableRow>
        <TH sx={{ width: "15%" }}>병원명</TH>
        <TD sx={{ width: "85%" }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <InputValidation
              inputName="stockHsptNm"
              InputProps={{
                readOnly: true,
              }}
              required={true}
              errorMessage="병원을 검색해 주세요."
            />
            <ContainedButton
              buttonName="병원 검색"
              size="small"
              onClick={openPopup}
            />
          </Stack>
        </TD>
      </TableRow>
      <TableRow>
        <TH>병원코드</TH>
        <TD>
          <Stack direction="row" spacing={1}>
            <InputValidation
              sx={{ width: 255 }}
              inputName="hsptCode"
              InputProps={{
                readOnly: true,
              }}
              required={true}
              errorMessage="병원코드를 입력해 주세요."
              // maxLength={20}
              // maxLengthErrMsg="20자 이내로 입력해주세요."
            />
            <InputValidation
              sx={{ width: 255, display: "none" }}
              inputName="hsptUniqueCodeMc"
              InputProps={{
                readOnly: true,
                hidden: true,
              }}
              required={true}
              errorMessage="병원유니트코드를 입력해 주세요."
            />
          </Stack>
        </TD>
      </TableRow>
    </>
  );
};

export default HsptCodeSrchRow;
