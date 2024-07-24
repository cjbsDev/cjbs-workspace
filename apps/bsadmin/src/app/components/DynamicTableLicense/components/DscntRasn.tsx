import React from "react";
import { ArrySelectBox, cjbsTheme, InputValidation, SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { Box, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const DscntRasn = ({ index }) => {
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const dscntRasnCc = watch(`costList[${index}].dscntRasnCc`);
  const watchIsExc = watch(`costList[${index}].isExc`);
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=anls itst&midValue=reason`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("사유 목록 ==>>", data);
  return (
    <Stack spacing={0.5}>
      <Stack direction="row" spacing={1}>
        <ArrySelectBox
          inputName={`costList[${index}].dscntRasnCc`}
          options={data}
          required={watchIsExc === "Y"}
          errorMessage="사유를 선택해 주세요."
          sx={{
            width: dscntRasnCc === "BS_1813004" ? 130 : "100%",
            // backgroundColor: "red",
            borderColor: errors?.costList?.[index]?.dscntRasnCc
              ? "red"
              : cjbsTheme.palette.grey["400"],
            borderWidth: 1,
            borderStyle: "solid",
          }}
        />
        {dscntRasnCc === "BS_1813004" && (
          <Box sx={{ width: "100%" }}>
            <InputValidation
              inputName={`costList[${index}].dscntRasnDetail`}
              required={false}
              fullWidth={true}
            />
          </Box>
        )}
      </Stack>
      {errors?.costList?.[index]?.dscntRasnCc && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
          sx={{ px: 1 }}
        >
          사유를 선택해 주세요.
        </Typography>
      )}
    </Stack>
  );
};

export default DscntRasn;
