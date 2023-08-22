'use client';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid, Typography } from '@mui/material';
import DashboardPartsBox from '../../../../component/molecules/dashboard/dashboardPartsBox';
import { toast } from 'react-toastify';
import ClinicalDashboard from '../../../../component/organisms/clinical/dashboard/ClinicalDashboard';
import { fetcher } from 'api';
import Title from 'src/component/atoms/Title';
import { TABLE_SKELETON_HEIGHT } from 'src/const/common';

export interface DiseasePartVoList {
  id: number;
  name: string;
  totalStudy: number;
  code: string;
  totalSubject: number;
  diseaseVoList: DiseaseVoList[];
}

export interface DiseaseVoList {
  diseasePartId: number;
  id: number;
  name: string;
  total: number;
}

export interface StudyPerVoList {
  id: number;
  name: string;
  totalPer: number;
}

export interface DashboardValues {
  totalDisease: number;
  totalSample: number;
  totalStudy: number;
  totalSubject: number;
  lastUpdatedDate: string;
}

const Dashboard = () => {
  //const { data: session, status } = useSession();

  const { data, isLoading } = useSWR('/disease/dashboard', fetcher);

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={TABLE_SKELETON_HEIGHT}
      />
    );
  } else {
    if (!data?.success) {
      toast(data?.message);
      return;
    }

    const apiData = data.data;

    const pieData: StudyPerVoList[] = data.data.studyPerVoList;
    const diseasePartVoList: DiseasePartVoList[] = apiData.diseasePartVoList;
    const dashboardValues: DashboardValues = {
      totalDisease: apiData.totalDisease,
      totalSample: apiData.totalSample,
      totalStudy: apiData.totalStudy,
      totalSubject: apiData.totalSubject,
      lastUpdatedDate: apiData.lastUpdatedDate,
    };

    console.log('diseasePartVoList > ', diseasePartVoList);

    return (
      <Box>
        <Title sx={{ mb: '14px' }}>Clinical Data Center Dashboard</Title>
        <Box mb={'28px'}>
          <ClinicalDashboard pieData={pieData} values={dashboardValues} />
        </Box>
        <Grid container spacing={3}>
          {diseasePartVoList.map((disease, index) => (
            <Grid key={index} item xs={4}>
              <DashboardPartsBox
                type={disease.name}
                code={disease.code}
                typeCount={disease.totalSubject}
                data={disease.diseaseVoList}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
};

export default Dashboard;
