"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyIcon from "icon/MyIcon";
import HorizontalLinearStepper from "../../HorizontalLinearStepper";
import { ConfirmModal, cjbsTheme } from "cjbsDSTM";
import MtpFullService from "./(service)/MtpFullService";
import MtpAnalysis from "./(service)/MtpAnalysis";
import MtpSequencing from "./(service)/MtpSequencing";
import { useRecoilState } from "recoil";
import { stepperStatusAtom } from "@app/recoil/atoms/stepperStatusAtom";

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
  const [value, setValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);
  // const [stepperNo, setStepperNo] = useRecoilState(stepperStatusAtom);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    handleAlertOpen();
    setTempValue(newValue);
  };

  const handleAlertOpen = () => {
    setAlertModalOpen(true);
  };
  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const handleServiceTypeChange = () => {
    setValue(tempValue);
    // setStepperNo(1);
    handleAlertClose();
  };

  return (
    <Container disableGutters={true}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
          padding: "20px 0 50px 0",
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
          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
              width: 600,
              mr: "-30px",
            }}
          >
            {/*<HorizontalLinearStepper />*/}
          </Box>
        </Stack>

        <Typography variant="subtitle1" sx={{ mt: 4 }}>
          서비스 타입
        </Typography>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab
              label={
                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{}}>
                    Full Service
                  </Typography>
                  <Typography variant="body2" sx={{}}>
                    시퀀싱 및 BI 분석을 함께 의뢰합니다
                  </Typography>
                </Box>
              }
            />
            <AntTab
              label={
                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{}}>
                    Analysis Only
                  </Typography>
                  <Typography variant="body2" sx={{}}>
                    BI 분석만 의뢰합니다
                  </Typography>
                </Box>
              }
            />
            <AntTab
              label={
                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{}}>
                    Sequencing Only
                  </Typography>
                  <Typography variant="body2" sx={{}}>
                    시퀀싱만 의뢰합니다
                  </Typography>
                </Box>
              }
            />
          </AntTabs>
        </Box>
        {value === 0 ? <MtpFullService /> : ""}
        {value === 1 ? <MtpAnalysis /> : ""}
        {value === 2 ? <MtpSequencing /> : ""}
      </Box>

      <ConfirmModal
        alertBtnName="확인"
        alertMainFunc={handleServiceTypeChange}
        onClose={handleAlertClose}
        open={alertModalOpen}
        mainMessage={
          "서비스 타입를 변경하면 작성 중인 내용이 저장되지 않습니다.\n"
        }
        subMessage={"그래도 이동하시겠습니까?"}
      />
    </Container>
  );
};

export default Page;
