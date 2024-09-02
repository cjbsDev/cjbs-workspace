import React from "react";
import { InputValidation, PostCodeBtn, TD, TH } from "cjbsDSTM";
import { Box, BoxProps, Stack, styled, TableRow } from "@mui/material";
import { useFormContext } from "react-hook-form";

const AddressRow = () => {
  const { watch } = useFormContext();
  const watchLctnTypeCc = watch("lctnTypeCc");
  return (
    <TableRow>
      <TH sx={{ width: "15%" }}>
        주소<NotRequired>[선택]</NotRequired>
      </TH>
      <TD sx={{ width: "85%" }} colSpan={5}>
        <Stack spacing={1}>
          {watchLctnTypeCc === "BS_0200002" && (
            <>
              <Stack direction="row" spacing={0.5}>
                <InputValidation
                  disabled={true}
                  inputName="zip"
                  placeholder="우편번호"
                  sx={{ width: 147 }}
                />
                <PostCodeBtn />
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <InputValidation
                  disabled={true}
                  sx={{ width: 600 }}
                  inputName="addr"
                />
              </Stack>
            </>
          )}

          <Stack direction="row" spacing={0.5}>
            <InputValidation
              sx={{ width: 600 }}
              inputName="addrDetail"
              maxLength={50}
              maxLengthErrMsg="50자 이내로 입력해주세요."
              placeholder="상세주소"
            />
          </Stack>
        </Stack>
      </TD>
    </TableRow>
  );
};

export default AddressRow;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
