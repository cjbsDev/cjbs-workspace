import React from "react";
import { TD, TH } from "cjbsDSTM";
import { Box, Stack, TableRow } from "@mui/material";
import BusinessNumber from "../../../../../components/NumberFormat/BusinessNumber";
import { useFormContext } from "react-hook-form";

const BusinessNumberRow = () => {
  const { watch } = useFormContext();
  const watchLctnTypeCc = watch("lctnTypeCc");

  return (
    <>
      {watchLctnTypeCc === "BS_0200002" && (
        <TableRow>
          <TH sx={{ width: "15%" }}>사업자 등록번호</TH>
          <TD sx={{ width: "85%" }} colSpan={5}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box sx={{ width: 113 }}>
                <BusinessNumber />
              </Box>
            </Stack>
          </TD>
        </TableRow>
      )}
    </>
  );
};

export default BusinessNumberRow;
