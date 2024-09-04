import React from "react";
import { TD, TH } from "cjbsDSTM";
import { Stack, TableRow } from "@mui/material";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import Overseas from "../../../../../components/Region/Overseas";

const LazyRegion1 = dynamic(
  () => import("../../../../../components/Region/Region1"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const LazyOverseas = dynamic(
  () => import("../../../../../components/Region/Overseas"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const RegionRow = () => {
  const { watch } = useFormContext();
  const watchLctnTypeCc = watch("lctnTypeCc");

  return (
    <>
      <TableRow>
        <TH sx={{ width: "15%" }}>지역</TH>
        <TD sx={{ width: "85%" }} colSpan={5}>
          <Stack direction="row" spacing={0.5} alignItems="flex-start">
            {watchLctnTypeCc === "BS_0200002" ? (
              <LazyRegion1 />
            ) : (
              <LazyOverseas />
            )}
          </Stack>
        </TD>
      </TableRow>
    </>
  );
};

export default RegionRow;
