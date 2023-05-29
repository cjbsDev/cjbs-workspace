import { Box, Grid, styled } from '@mui/material';
import React from 'react';
import DashboardItem from '../../../molecules/dashboard/dashboardItem';
import Person from '../../../../../public/img/dashboard/person.png';
import Disease from '../../../../../public/img/dashboard/disease.png';
import Check from '../../../../../public/img/dashboard/check.png';
import Sylinder from '../../../../../public/img/dashboard/sylinder.png';
import { DashboardValues, StudyPerVoList } from '../../../../app/clinical/page';
import DashboardPie from '../../../molecules/chart/pie/dashboard/dashboardPie';
import DashboardPieLegend from '../../../molecules/chart/pie/dashboard/dashboardPieLegend';

interface Props {
  values: DashboardValues;
  pieData: StudyPerVoList[];
}

const colorChart = new Map();

const ClinicalDashboard = ({ pieData, values }: Props) => {
  if (colorChart.size === 0) {
    pieData.map((data, index) => {
      switch (index) {
        case 0:
          colorChart.set(data.name, '#80CAEE');
          break;
        case 1:
          colorChart.set(data.name, '#6577F3');
          break;
        case 2:
          colorChart.set(data.name, '#3749A8');
          break;
        case 3:
          colorChart.set(data.name, '#3C50E0');
          break;
        case 4:
          colorChart.set(data.name, '#0FADCF');
          break;
        case 5:
          colorChart.set(data.name, '#128da9');
          break;
        case 6:
          colorChart.set(data.name, '#9c70da');
          break;
      }
    });
  }
  1;

  return (
    <GridContainer container>
      <FlexCenterGrid xs={4} justifyContent={'flex-start'} item>
        <Box mr={'31px'}>
          <DashboardPie
            totalStudy={values.totalStudy}
            colorChart={colorChart}
            data={pieData}
          />
        </Box>
        <Box>
          <DashboardPieLegend colorChart={colorChart} data={pieData} />
        </Box>
      </FlexCenterGrid>
      <FlexCenterGrid justifyContent={'center'} xs={8} item>
        <ItemsBox>
          <RightBorderBox>
            <DashboardItem
              imgPath={Disease}
              name={'총 질환 수'}
              text={values.totalDisease.toLocaleString()}
            />
          </RightBorderBox>
          <RightBorderBox>
            <DashboardItem
              imgPath={Sylinder}
              name={'총 샘플 수'}
              text={values.totalSample.toLocaleString()}
            />
          </RightBorderBox>
          <RightBorderBox>
            <DashboardItem
              imgPath={Person}
              name={'총 대상자 수'}
              text={values.totalSubject.toLocaleString()}
            />
          </RightBorderBox>
          <RightBorderBox sx={{ borderRight: 'none' }}>
            <DashboardItem
              imgPath={Check}
              name={'총 업데이트 일자'}
              text={values.lastUpdatedDate}
            />
          </RightBorderBox>
        </ItemsBox>
      </FlexCenterGrid>
    </GridContainer>
  );
};

const GridContainer = styled(Grid)`
  box-sizing: border-box;
  height: 222px;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 2px;
`;

const ItemsBox = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  width: 764px;
  height: 118px;
`;

const FlexCenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

export default ClinicalDashboard;

const RightBorderBox = styled(Box)`
  border-right: 1px solid #ced4da;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  max-width: 100%;
`;
