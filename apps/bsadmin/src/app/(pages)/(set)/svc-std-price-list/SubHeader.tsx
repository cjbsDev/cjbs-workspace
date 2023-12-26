import { Stack, Grid } from "@mui/material";
import { ContainedButton, DataCountResultInfo } from "cjbsDSTM";
import KeywordSearch from "../../../components/KeywordSearch";
import { SubHeaderProps } from "../../../types/subHeader-props";
import Link from "next/link";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => (
  <Grid container>
    <Grid item xs={6} sx={{ pt: 0 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <DataCountResultInfo totalCount={totalElements} />
        <Link href="/svc-std-price-add">
          <ContainedButton buttonName="기준가 등록" size="small" />
        </Link>
      </Stack>
    </Grid>
    <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
        {/*<KeywordSearch />*/}
      </Stack>
    </Grid>
  </Grid>
);

export default SubHeader;
