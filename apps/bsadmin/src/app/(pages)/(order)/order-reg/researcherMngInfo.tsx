import React, { useEffect } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { InputValidation, OutlinedButton, TD, TH } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useCenteredPopup from "../../../hooks/useCenteredPopup";
import { useSearchParams } from "next/navigation";

const ResearcherMngInfo = () => {
  const searchParams = useSearchParams();
  const orshType = searchParams.get("orshType");
  console.log("orshType", orshType);
  const { setValue, clearErrors, resetField } = useFormContext();
  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/custListPopup?type=order`,
    "고객 검색",
    1000,
    590,
  );

  useEffect(() => {
    window.addEventListener("myCustData", function (e) {
      console.log("Received data:", e.detail);

      const {
        custUkey,
        custNm,
        telList,
        ebcEmail,
        agncInstNm,
        agncUkey,
        instNm,
        agncNm,
        type,
      } = e.detail;
      console.log("ebcEmail&&&&&&&&&&&&&&", ebcEmail);

      // setValue("custUkey", custUkey);
      // setValue("custNm", custNm);
      setValue("ebcEmail", ebcEmail);
      // setValue("telList", telList);

      setValue("custUkey", custUkey);
      setValue("custNm", custNm);
      setValue("ebcEmail", ebcEmail);
      setValue("telList", telList);

      if (type === "order") {
        setValue("agncNm", agncInstNm);
        setValue("agncUkey", agncUkey);
      }

      if (type === "agnc-order") {
        setValue("ebcEmail", ebcEmail);
        setValue("rhpiNm", custNm);
        setValue("rhpiTel", telList);
        setValue("instNm", instNm);
        setValue("agncNm", agncNm);
      }

      clearErrors("custNm");
      clearErrors("ebcEmail");
      clearErrors("custUkey");
      clearErrors("agncUkey");
      clearErrors("agncNm");
      clearErrors("telList");
    });
  }, []);
  return (
    <>
      <Typography variant="subtitle1">연구책임자 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>아이디(이메일)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.2} alignItems="flex-start">
                  <InputValidation
                    inputName="ebcEmail"
                    required={true}
                    errorMessage="아이디(이메일) 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="custUkey"
                    required={true}
                    // errorMessage="키값 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="agncUkey"
                    required={true}
                    // errorMessage="키값 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="telList"
                    // required={true}
                    // errorMessage="전화번호 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <OutlinedButton
                    sx={{
                      display:
                        orshType === "extr"
                          ? "none"
                          : orshType === "intn"
                            ? "none"
                            : "block",
                    }}
                    size="small"
                    buttonName="고객 검색"
                    // onClick={handleCustSearchModalOpen}
                    onClick={openPopup}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="custNm"
                    required={true}
                    errorMessage="이름을 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>소속 거래처(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="agncNm"
                    required={true}
                    errorMessage="소속 거래처(PI)를 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResearcherMngInfo;
