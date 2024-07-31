import React from "react";
import {
  cjbsTheme,
  EA,
  InputEAType,
  InputValidation,
  Taxon,
  TD,
  TH,
} from "cjbsDSTM";
import { Box, Chip, Stack, TableRow, Typography } from "@mui/material";
import { taxonListData } from "../../../data/inputDataLists";
import TaxonCntFormat from "../../../components/NumberFormat/TaxonCntFormat";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const TaxonRow = () => {
  const defaultValues = {
    taxonBCnt: 0,
    taxonECnt: 0,
    taxonACnt: 0,
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <TableRow>
      <TH sx={{ width: "15%" }}>Taxon 개수</TH>
      <TD sx={{ width: "85%" }} colSpan={5}>
        <Stack direction="row" spacing={2} alignItems="center">
          {taxonListData.map((taxonItem, index) => {
            return (
              <Stack
                key={taxonItem.taxonName}
                direction="row"
                alignItems="center"
              >
                <Controller
                  name={taxonItem.taxonName}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Taxon iconName={taxonItem.taxonIconName} />
                      <Box sx={{ width: 75 }}>
                        <NumericFormat
                          {...field}
                          customInput={InputEAType}
                          thousandSeparator
                          onValueChange={(values, sourceInfo) => {
                            // console.log(values, sourceInfo);
                            field.onChange(values.value);
                          }}
                        />
                      </Box>
                    </Stack>
                  )}
                />
                {errors[taxonItem.taxonName] && (
                  <Typography
                    variant="body2"
                    color={cjbsTheme.palette.warning.main}
                    sx={{ pl: 0.5 }}
                  >
                    {taxonItem.taxonIconName} 개수를 입력해 주세요.
                  </Typography>
                )}
              </Stack>
            );
          })}
        </Stack>
      </TD>
    </TableRow>
  );
};

export default TaxonRow;
