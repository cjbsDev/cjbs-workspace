import React, { useState } from "react";
import { Grid, Link, Stack } from "@mui/material";
import {
  ContainedButton,
  DataCountResultInfo,
  FileDownloadBtn,
} from "cjbsDSTM";
import KeywordSearch from "../../../../components/KeywordSearch";
import ResultInSearch from "./resultInSearch";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import AnlsFilter from "./anlsFilter";
import SampleStpByStpReg from "./sampleStpByStpReg";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const handleModalOpen = () => {
  //   console.log("Click!!!");
  //   setIsOpen(true);
  // };
  //
  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ pt: 0 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <DataCountResultInfo totalCount={totalElements} />
              <AnlsFilter />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              {/*<ContainedButton*/}
              {/*  buttonName="샘플 단계 등록"*/}
              {/*  size="small"*/}
              {/*  onClick={handleModalOpen}*/}
              {/*/>*/}
              <SampleStpByStpReg />
              <FileDownloadBtn
                exportUrl={`/expt/info/list/download${result}`}
                iconName="xls3"
              />
              <KeywordSearch />
              <ResultInSearch />
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/*<SampleStpByStpReg onClose={handleClose} open={isOpen} modalWidth={800} />*/}
    </>
  );
};

export default SubHeader;
