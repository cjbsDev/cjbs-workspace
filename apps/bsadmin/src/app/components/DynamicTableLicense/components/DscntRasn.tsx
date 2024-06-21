import React from "react";
import { InputValidation, SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { Box, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

const DscntRasn = ({ index }) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const dscntRasnCc = watch(`sample.[${index}].dscntRasnCc`);
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=anls itst&midValue=reason`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("사유 목록 ==>>", data);
  return (
    <Stack direction="row" spacing={1}>
      <SelectBox
        errorMessage="값을 선택해 주세요."
        // inputName="bsnsMngrUkey"
        inputName={`sample.[${index}].dscntRasnCc`}
        options={data}
        required={true}
      />
      {dscntRasnCc === "BS_1813004" && (
        <Box sx={{ width: "100%" }}>
          <InputValidation
            inputName={`sample.[${index}].dscntRasnDetail`}
            required={false}
            fullWidth={true}
          />
        </Box>
      )}
    </Stack>
  );
};

export default DscntRasn;
