import React from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { CheckboxSV, InputValidation, SelectBox, TD, TH } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";

const FileUploadAddInfo = () => {
  const { watch } = useFormContext();
  const watchIsSendQCEmail = watch("isSendQCEmail");

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "20%" }}>파일 설명</TH>
            <TD colSpan={3}>
              <InputValidation
                inputName="fileDesc"
                required={true}
                errorMessage="파일 설명을 입력해주세요."
              />
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "20%" }}>QC 메일 발송</TH>
            <TD colSpan={3}>
              <CheckboxSV
                inputName="isSendQCEmail"
                labelText="파일 업로드와 함께 고객에게 OC 메일을 발송합니다"
                // value="Y"
              />
            </TD>
          </TableRow>
          {watchIsSendQCEmail && (
            <TableRow>
              <TH sx={{ width: "20%" }}>QC 메일 양식</TH>
              <TD colSpan={3}>
                <SelectBox
                  required={watchIsSendQCEmail}
                  errorMessage="QC 메일 양식을 선택해주세요."
                  inputName="qcEmailTemplateCc"
                  options={[
                    { value: "BS_0810001", optionName: "한글" },
                    { value: "BS_0810002", optionName: "영문" },
                  ]}
                />
              </TD>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileUploadAddInfo;
