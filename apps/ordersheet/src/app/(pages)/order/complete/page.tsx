"use client";
import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  TabProps,
  styled,
  Button,
  Grid,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import HorizontalLinearStepper from "../HorizontalLinearStepper";
import { cjbsTheme, ContainedButton, OutlinedButton } from "cjbsDSTM";
import LoadingSvg from "@public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import {useSearchParams} from "next/navigation";

const AntTabs = styled(Tabs)({
  marginTop: "10px",
  // border: '1px solid #e8e8e8',
  "& .MuiTabs-indicator": {
    // backgroundColor: '#006ECD',
    display: "none",
  },
  "& .MuiTabs-flexContainer": {
    display: "flex",
    justifyContent: "space-between",
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  width: "394px",
  maxWidth: "394px",
  border: "1px solid #e8e8e8",
  margin: 0,
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": {
    opacity: 1,
    backgroundColor: cjbsTheme.palette.grey[50],
  },
  "&.Mui-selected": {
    color: "#000",
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: "#E6F0FA",
    border: "1px solid #006ECD",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

interface StyledTabProps extends TabProps {
  label: React.ReactNode;
}

const Page = () => {
  const searchParams = useSearchParams();
  const orderNm = searchParams.get("orderNm");
  const serviceParam = searchParams.get("serviceType");
  console.log(serviceParam)
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container disableGutters={true}>
      <Box
        sx={{
          // mb: 20,
          // mt: 11,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
          padding: "50px 0 50px 0",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ borderBottom: "1px solid #000" }}
        >
          {orderNm === 'mtp' ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">MTP&nbsp;&nbsp;</Typography>
              <Typography variant="subtitle2" sx={{ pt: "3px" }}>
                Microbiome Taxonomic Profiling
              </Typography>
            </Box>
          ) : ('')}

          {orderNm === 'shotgun' ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Shotgun Metagenome&nbsp;&nbsp;</Typography>
              <Typography variant="subtitle2" sx={{ pt: "3px" }}>
                Shotgun Sequencing
              </Typography>
            </Box>
          ) : ('')}

          {orderNm === 'wg' ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">WG&nbsp;&nbsp;</Typography>
              <Typography variant="subtitle2" sx={{ pt: "3px" }}>
                Whole Genome Sequencing
              </Typography>
            </Box>
          ) : ('')}

          {orderNm === 'rs' ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">RS&nbsp;&nbsp;</Typography>
              <Typography variant="subtitle2" sx={{ pt: "3px" }}>
                RNA Sequencing
              </Typography>
            </Box>
          ) : ('')}

          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
              width: 600,
              mr: "-30px",
            }}
          >
            <HorizontalLinearStepper />
          </Box>
        </Stack>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <Stack justifyContent="center" alignItems="center" spacing={0}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: "50%",
                borderColor: "text.primary",
                mt: "36px",
                width: "116px",
                height: "116px",
                backgroundColor: "#F1F9F1",
              }}
            >
              <MyIcon
                icon="check-circle-fill"
                size={35}
                color={cjbsTheme.palette.success.main}
              />
              <Typography variant="subtitle2" sx={{ pt: "3px" }}>
                주문 완료!
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                textAlign: "center",
                mt: "20px",
              }}
            >
              <Typography variant="body2" sx={{ pt: "3px" }}>
                아래 내용 참고하여 NGS 데이터를 전달 부탁드립니다.
                <br />
                보내주신 데이터와 주문 내용이 최종 확인되면, 접수완료 메일이
                발송됩니다.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
                mt: "26px",
                p: "40px 30px",
                width: 840,
                backgroundColor: cjbsTheme.palette.grey[50],
                borderRadius: "4px",
                border: "1px solid",
                borderColor: cjbsTheme.palette.grey[400],
              }}
            >
              <Grid container spacing={2}>

                {serviceParam === 'ao' ? (
                  <>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">분석데이터 전달</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Stack spacing={0.5} alignItems="flex-start">
                        <Typography variant="body2">
                          분석에 사용되는 <Box component="span" sx={{fontWeight:700}}>Sequencing raw data</Box>는 신청인 정보와 함께 CJ바이오사이언스 NGS 대표 메일로 전달 부탁드립니다.
                        </Typography>
                        <Typography variant="body2">
                          메일로 전달이 불가능할 경우, 대표 전화 또는 메일로 연락해주세요.
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">연락처</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <MyIcon icon="telephone" size={20} />
                        <Typography variant="body2">Tel 02-6078-3456</Typography>
                        <MyIcon icon="mail-fill" size={20} />
                        <Typography variant="body2">
                          E-mail bs.ngs@cj.net
                        </Typography>
                      </Stack>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">샘플 접수</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle2">NGS 실험실</Typography>
                        <Typography variant="body2">
                          (16495) 경기 수원시 영통구 광교로42번길 55 CJ 블로썸파크
                          블루동 12층
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">연락처</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <MyIcon icon="telephone" size={20} />
                        <Typography variant="body2">Tel 02-6078-3456</Typography>
                        <MyIcon icon="mail-fill" size={20} />
                        <Typography variant="subtitle2">
                          E-mail bs.ngs@cj.net
                        </Typography>
                      </Stack>
                    </Grid>
                  </>
                )}

                <Grid item xs={2}>
                  <Typography variant="subtitle2">유의사항</Typography>
                </Grid>

                {orderNm === 'mtp' ? (
                  <>
                    {serviceParam === 'fs' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기 바랍니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. 분석 결과는 EzBioCloud로 업로드됩니다.
                        </Typography>
                        <Typography variant="body2">
                          3. DNA는 요청 시에만 반송되며, 샘플(분변, 토양 및 기타 환경샘플)은 1개월 후 자동폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          4. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          5. 분석 결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'ao' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 분석 결과는 EzBioCloud로 업로드됩니다.
                        </Typography>
                        <Typography variant="body2">
                          2. 샘플명은 영문, 숫자, -(hyphen)만 입력이 가능합니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          3. 원활한 분석 진행을 위하여 실험에 사용한 primer정보 기재를 권장합니다.
                        </Typography>
                        <Typography variant="body2">
                          4. 분석 결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'so' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 주문서 샘플명과 튜브 샘플명의 표기가 매칭되도록 기입해주세요.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. Index 정보는 필수 기입 사항입니다.
                        </Typography>
                        <Typography variant="body2">
                          3. 샘플은 결과발송 1개월 후 자동 폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          4. Sequencing only 서비스는 sequencing raw data만 제공합니다.
                        </Typography>
                        <Typography variant="body2">
                          5. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                      </Grid>
                    ) : ('')}
                  </>
                ):('')}

                {orderNm === 'shotgun' ? (
                  <>
                    {serviceParam === 'fs' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기 바랍니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. 분석 결과는 EzBioCloud로 업로드됩니다.
                        </Typography>
                        <Typography variant="body2">
                          3. DNA는 요청 시에만 반송되며, 샘플(분변, 토양 및 기타 환경샘플)은 1개월 후 자동폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          4. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          5. 분석 결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'ao' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2">
                          1. 그룹비교분석을 위해 샘플리스트의
                          <Typography component='span' variant='body2' sx={{color: cjbsTheme.palette.error.main}}>&nbsp;그룹명</Typography>
                          과&nbsp;
                          <Typography component='span' variant='body2' sx={{color: cjbsTheme.palette.error.main}}>그룹비교분석리스트</Typography>
                          를 작성해 주세요.
                        </Typography>
                        <Typography variant="body2">
                          2. 분석 결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'so' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 주문서 샘플명과 튜브 샘플명의 표기가 매칭되도록 기입해주세요.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. Index 정보는 필수 기입 사항입니다.
                        </Typography>
                        <Typography variant="body2">
                          3. 샘플은 결과발송 1개월 후 자동 폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          4. Sequencing only 서비스는 sequencing raw data만 제공합니다.
                        </Typography>
                        <Typography variant="body2">
                          5. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                      </Grid>
                    ) : ('')}
                  </>
                ):('')}

                {orderNm === 'wg' ? (
                  <>
                    {serviceParam === 'fs' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 주문서 샘플명과 접수 튜브명이 매칭되도록 기재바랍니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. 분석 결과는 EzBioCloud로 업로드됩니다.
                        </Typography>
                        <Typography variant="body2">
                          3. DNA는 요청 시에만 반송드리며,그 외 DNA및 샘플(cell pellet)은1개월 후 자동 폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          4. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          5. 16S rRNA identification(Sanger) 진행 시, QC 기간이 1주일 연장됩니다.
                        </Typography>
                        <Typography variant="body2">
                          6. 분석결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'ao' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 분석 결과는 EzBioCloud로 업로드됩니다.
                        </Typography>
                        <Typography variant="body2">
                          2. Raw data는 fastq 또는 fasta 파일로 전달바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          3. Strain name과 locus tag 미입력 시, 샘플명으로 대체합니다.
                        </Typography>
                        <Typography variant="body2">
                          4. 분석 결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'so' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 분석결과는 EzBioCloud로 업로드 됩니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. 주문서 샘플명과 접수 튜브명이 매칭되도록 기재바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          3. Index 사용하여 library 제작 진행시, index 정보는 필수기입사항 입니다.
                        </Typography>
                        <Typography variant="body2">
                          4. 샘플은 결과발송 1개월 후 자동폐기 됩니다.
                        </Typography>
                        <Typography variant="body2">
                          5. Sequencing only 서비스는 sequencing raw data만 제공합니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          6. Sequencing raw data는 1년간만 보관 되오니, 만료전에 다운로드 받으시길 바랍니다.
                        </Typography>
                      </Grid>
                    ) : ('')}
                  </>
                ):('')}

                {orderNm === 'rs' ? (
                  <>
                    {serviceParam === 'fs' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기 바랍니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. 분석 결과는 EzBioCloud로 업로드됩니다.
                        </Typography>
                        <Typography variant="body2">
                          3. 그룹정보가 있을 경우,그룹명도 함께 기재 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          4. Reference Taxonomy와 Accession No. 정보는 분석시에 사용되오니, 정확히 기입 부탁드립니다.
                        </Typography>
                        <Typography variant="body2">
                          &nbsp;&nbsp;&nbsp;&nbsp;CJ바이오사이언스에서 genome 분석한 균주가 reference인 경우, 비고란에 오더번호를 기입바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          5. RNA샘플은 반송이 불가하며,분석완료 후 1개월 후 자동 폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          6. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          7. 분석 결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'ao' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 분석 결과는 EzBioCloud로 업로드됩니다.
                        </Typography>
                        <Typography variant="body2">
                          2. 그룹정보가 있을 경우,그룹명도 함께 기재 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          3. Reference Taxonomy와 Accession No. 정보는 분석시에 사용되오니, 정확히 기입 부탁드립니다.
                        </Typography>
                        <Typography variant="body2">
                          &nbsp;&nbsp;&nbsp;&nbsp;CJ바이오사이언스에서 genome 분석한 균주가 reference인 경우, 비고란에 오더번호를 기입바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          4. RNA샘플은 반송이 불가하며,분석완료 후 1개월 후 자동 폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          5. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          6. 분석 결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}

                    {serviceParam === 'so' ? (
                      <Grid item xs={10}>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          1. 주문서 샘플명과 접수 튜브명이 매칭되도록 기재바랍니다.
                        </Typography>
                        <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                          2. 분석결과는 EzBioCloud로 업로드 되오니, 위 해당칸에 EzBioCloud ID를 반드기 기재 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          3. RNA샘플은 반송이 불가하며,서비스 완료 후 1개월 후 자동폐기됩니다.
                        </Typography>
                        <Typography variant="body2">
                          4. Sequencing raw data 보관기간은1년이오니, 만료전에 데이터센터에서 다운로드 바랍니다.
                        </Typography>
                        <Typography variant="body2">
                          5. 분석결과는 연구용으로만 사용이 가능합니다.
                        </Typography>
                      </Grid>
                    ) : ('')}
                  </>
                ):('')}

              </Grid>
            </Box>

            <Stack
              direction="row"
              spacing={0.5}
              justifyContent="center"
              sx={{ mt: "30px" }}
            >
              <OutlinedButton
                buttonName="내 주문내역 조회"
                onClick={() => router.push("/order-list")}
              />
              <ContainedButton
                buttonName="메인으로 이동"
                onClick={() => router.push("/main")}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
