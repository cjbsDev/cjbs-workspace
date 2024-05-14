import React from "react";
import { EA, InputValidation, Taxon, TD, TH } from "cjbsDSTM";
import { Stack, TableRow } from "@mui/material";
import { taxonListData } from "../../../data/inputDataLists";
import TaxonCntFormat from "../../../components/NumberFormat/TaxonCntFormat";

const TaxonRow = () => {
  const defaultValues = {
    taxonBCnt: 0,
    taxonECnt: 0,
    taxonACnt: 0,
  };

  return (
    <TableRow>
      <TH sx={{ width: "15%" }}>Taxon 개수</TH>
      <TD sx={{ width: "85%" }} colSpan={5}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          {taxonListData.map((taxonItem, index) => {
            return (
              <InputValidation
                inputName={taxonItem.taxonName}
                required={true}
                errorMessage="개수를 입력해 주세요."
                pattern={/^[0-9]+$/}
                patternErrMsg="숫자만 입력해 주세요."
                sx={{
                  width: 100,
                  ".MuiOutlinedInput-input": {
                    textAlign: "end",
                  },
                  "&.MuiTextField-root": {
                    backgroundColor: "white",
                    borderRadius: 1,
                  },
                }}
                inputMode="numeric"
                InputProps={{
                  // inputComponent: (props) => (
                  //   <TaxonCntFormat
                  //     name={taxonItem.taxonName}
                  //     taxonData={defaultValues[taxonItem.taxonName]}
                  //     {...props}
                  //   />
                  // ),
                  startAdornment: <Taxon iconName={taxonItem.taxonIconName} />,
                  endAdornment: <EA />,
                }}
              />
            );
          })}
        </Stack>
      </TD>
    </TableRow>
  );
};

export default TaxonRow;
