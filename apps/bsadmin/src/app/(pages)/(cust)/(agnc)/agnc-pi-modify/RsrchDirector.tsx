import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Stack, TableRow } from "@mui/material";
import { InputValidation, OutlinedButton, TD, TH } from "cjbsDSTM";
import useCenteredPopup from "../../../../hooks/useCenteredPopup";

const RsrchDirector = () => {
  const { setValue, clearErrors, resetField } = useFormContext();
  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/custListPopup?type=agnc`,
    "아이디 검색",
    1100,
    610,
  );

  useEffect(() => {
    window.addEventListener("myCustData", function (e) {
      console.log("myCustData Received data ==>>", e.detail);

      const { custUkey, custNm, ebcEmail } = e.detail;

      setValue("custUkey", custUkey);
      setValue("custNm", custNm);
      setValue("ebcEmail", ebcEmail);

      clearErrors("custNm");
      clearErrors("ebcEmail");
      clearErrors("custUkey");
    });
  }, []);
  return (
    <>
      <TableRow>
        <TH sx={{ width: "15%" }}>연구책임자 아이디</TH>
        <TD sx={{ width: "85%" }} colSpan={5}>
          <Stack direction="row" spacing={0.5} alignItems="flex-start">
            <InputValidation
              disabled={true}
              inputName="ebcEmail"
              errorMessage="연구책임자를 선택해주세요."
              sx={{ width: 600 }}
              required={true}
            />

            <InputValidation
              disabled={true}
              sx={{ display: "none" }}
              inputName="custUkey"
            />

            <OutlinedButton
              size="small"
              buttonName="아이디 검색"
              onClick={openPopup}
            />
          </Stack>
        </TD>
      </TableRow>
      <TableRow>
        <TH sx={{ width: "15%" }}>연구책임자 이름</TH>
        <TD sx={{ width: "85%" }} colSpan={5}>
          <Stack direction="row" spacing={0.5} alignItems="flex-start">
            <InputValidation
              disabled={true}
              required={true}
              inputName="custNm"
              errorMessage="연구책임자를 선택해주세요."
              sx={{ width: 600 }}
            />
          </Stack>
        </TD>
      </TableRow>
    </>
  );
};

export default RsrchDirector;
