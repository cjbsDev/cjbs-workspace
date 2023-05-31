import React from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import { StudyPerVoList } from '../../../../../app/clinical/page';
import useSWR from 'swr';
import { fetcher } from 'api';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import DashboardSearchInput from '../../../../molecules/dashboard/sidemenu/dashboardSearchInput';

const LegendBox = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const DashboardSideMenu = ({}) => {
  const { data, isLoading } = useSWR('/filter/', fetcher);

  console.log('isLoading >> ', isLoading);

  if (isLoading) {
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const apiData = data.data;
    console.log('apiData111 > ', apiData);

    //     const pieData: StudyPerVoList[] = data.data.studyPerVoList;
    //     const diseasePartVoList: DiseasePartVoList[] = apiData.diseasePartVoList;
    //     const dashboardValues: DashboardValues = {
    //       totalDisease: apiData.totalDisease,
    //       totalSample: apiData.totalSample,
    //       totalStudy: apiData.totalStudy,
    //       totalSubject: apiData.totalSubject,
    //       lastUpdatedDate: apiData.lastUpdatedDate,
    //     };
    //     console.log('diseasePartVoList > ', apiData);

    return (
      <Box>
        <Box>
          <DashboardSearchInput />
        </Box>
        {/* {data.map((item) => (
        <FlexBox justifyContent={'space-between'}>
          <FlexBox>
            <Circle sx={{ background: colorChart.get(item.name) }} />
            <Typography mb="9px" variant="body2">
              {item.name}
            </Typography>
          </FlexBox>
          <Typography mb="9px" variant="body2">
            {item.totalPer}%
          </Typography>
        </FlexBox>
      ))} */}
      </Box>
    );
  }
};
export default DashboardSideMenu;
