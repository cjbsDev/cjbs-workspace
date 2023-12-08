import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DataCountResultInfo } from "cjbsDSTM";
import { useSetRecoilState } from "recoil";
import { analDtlAtom } from "./analDtlAtom";

interface SubHeaderProps {
  sampleUkeyList: string[];
  dataLength: number;
}

const SubHeader = (props: SubHeaderProps) => {
  const { dataLength } = props;
  const [checked, setChecked] = useState(false);
  const setIsAnlsItst = useSetRecoilState(analDtlAtom);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    console.log("Handle Checked@@@@@", checked);
    setChecked(checked);
    setIsAnlsItst(checked ? "N" : "NA");
  };

  return (
    <Grid container>
      <Grid item xs={5} sx={{ pt: 0 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <DataCountResultInfo totalCount={dataLength} />
        </Stack>
      </Grid>
      <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={
            <Typography variant="body2">
              분석 내역서가 <b>생성 안된 샘플만</b> 보기
            </Typography>
          }
        />
      </Grid>
    </Grid>
  );
};

export default SubHeader;
