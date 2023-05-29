'use client';
import React from 'react';
import { fetcher } from 'api';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid, Typography } from '@mui/material';
import ClinicalDashboard from '../../component/organisms/clinical/dashboard/clinicalDashboard';
import DashboardPartsBox from '../../component/molecules/dashboard/dashboardPartsBox';
import { toast } from 'react-toastify';

export interface DiseasePartVoList {
  id: number;
  name: string;
  totalStudy: number;
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
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return;
    }

    const apiData = data.data;
    console.log('apiData > ', apiData);

    const pieData: StudyPerVoList[] = data.data.studyPerVoList;
    const diseasePartVoList: DiseasePartVoList[] = apiData.diseasePartVoList;
    const dashboardValues: DashboardValues = {
      totalDisease: apiData.totalDisease,
      totalSample: apiData.totalSample,
      totalStudy: apiData.totalStudy,
      totalSubject: apiData.totalSubject,
      lastUpdatedDate: apiData.lastUpdatedDate,
    };
    console.log('diseasePartVoList > ', apiData);

    return (
      <Box>
        <Box mb={'28px'}>
          <ClinicalDashboard pieData={pieData} values={dashboardValues} />
        </Box>
        <Grid container spacing={3}>
          {diseasePartVoList.map((disease, index) => (
            <Grid key={index} item xs={4}>
              <DashboardPartsBox
                type={disease.name}
                typeCount={disease.totalSubject}
                data={disease.diseaseVoList}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return <></>;
};

export default Dashboard;
