import React, { useState } from "react";
import { Stack, Grid } from "@mui/material";
import {
  ContainedButton,
  DataCountResultInfo,
  DataTableFilter,
} from "cjbsDSTM";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import MyIcon from "icon/MyIcon";
import { useRecoilState } from "recoil";
import { filterTextAtom } from "./atom";

interface ExtendSubHeaderProps extends SubHeaderProps {
  handleAddRow: () => void;
}

const SubHeader = ({ totalElements, handleAddRow }: ExtendSubHeaderProps) => {
  // const [filterText, setFilterText] = useState("");
  const [filterText, setFilterText] = useRecoilState(filterTextAtom);
  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

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

          <DataTableFilter
            onFilter={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
