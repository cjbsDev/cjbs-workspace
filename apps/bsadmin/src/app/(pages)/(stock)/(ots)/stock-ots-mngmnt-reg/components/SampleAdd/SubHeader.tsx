import React from "react";
import { Stack, Grid, Link } from "@mui/material";
import {
  DataCountResultInfo,
  ContainedButton,
  FileDownloadBtn,
  DeletedButton,
  OutlinedButton,
} from "cjbsDSTM";
import KeywordSearch from "../../../../components/KeywordSearch";
// import ResultInSearch from "./ResultInSearch";
import IconDescBar from "../../../../components/IconDescBar";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import { useSWRConfig } from "swr";
import { useFormContext } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { sampleAddAtom } from "./sampleAddAtom";

const SubHeader = ({ totalElements, openPopup }: SubHeaderProps) => {
  const { mutate } = useSWRConfig();
  // const smpAdd = useRecoilValue(sampleAddAtom);
  const [smpAdd, setSmpAdd] = useRecoilState(sampleAddAtom);
  const { getValues, watch } = useFormContext();
  const sampleUkeyList = getValues("sampleUkeyList");

  const handleDelete = () => {
    console.log("sampleUkeyList ==>>", sampleUkeyList);
    console.log("selected Ukey List ==>>", smpAdd);
    const filteredArray = sampleUkeyList.filter(
      (item) => !smpAdd.includes(item),
    );
    console.log("filteredArray ==>>", filteredArray);
    setSmpAdd(filteredArray);

    // mutate(`/ots/sample/detail?sampleUkeyList=${filteredArray}`);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ pt: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <OutlinedButton
              buttonName="샘플 추가"
              size="small"
              onClick={openPopup}
            />
            <DeletedButton
              buttonName="삭제"
              onClick={handleDelete}
              // disabled={sampleUkeyList.length === 0 ? true : false}
            />
            {/*<Link href="/stock-ots-mngmnt-reg">*/}
            {/*  <ContainedButton buttonName="아웃소싱 등록" size="small" />*/}
            {/*</Link>*/}
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            {/*<FileDownloadBtn exportUrl={`/ots/list/download`} iconName="xls3" />*/}
            {/*<KeywordSearch />*/}
            {/*<ResultInSearch />*/}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
