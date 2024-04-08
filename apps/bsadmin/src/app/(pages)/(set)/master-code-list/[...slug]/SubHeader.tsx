import React from "react";
import { Stack, Grid } from "@mui/material";
import { ContainedButton, DataCountResultInfo } from "cjbsDSTM";
// import KeywordSearch from "../../../components/KeywordSearch";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import MyIcon from "icon/MyIcon";

interface ExtendSubHeaderProps extends SubHeaderProps {
  handleAddRow: () => void;
}

const SubHeader = ({ totalElements, handleAddRow }: ExtendSubHeaderProps) => {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ pt: 0 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <DataCountResultInfo totalCount={totalElements} />
        </Stack>
      </Grid>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          {/*<KeywordSearch />*/}
          <ContainedButton
            buttonName="코드 추가"
            size="small"
            startIcon={<MyIcon icon="plus" size={16} />}
            onClick={handleAddRow}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
