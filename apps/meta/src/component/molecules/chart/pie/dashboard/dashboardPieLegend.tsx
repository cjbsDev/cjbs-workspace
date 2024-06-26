import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { StudyPerVoList } from '../../../../../app/clinical/(mainlayout)/dashboard/page';

const LegendBox = styled(Box)`
  min-width: 145px;
  height: 136px;
`;

const Circle = styled(Box)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 7px;
`;

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-items: center;
  min-width: 118px;
`;

export interface Props {
  data: StudyPerVoList[];
  colorChart: Map<string, string>;
}

const DashboardPieLegend = ({ data, colorChart }: Props) => {
  return (
    <LegendBox>
      {data.map((item, index) => (
        <FlexBox key={index}>
          <FlexBox>
            <Circle sx={{ background: colorChart.get(item.name) }} />
            <Typography mb='9px' variant='body2'>
              {item.name}
            </Typography>
          </FlexBox>
          <Box>
            <Typography mb='9px' textAlign={'left'} variant='body2'>
              {item.totalPer}%
            </Typography>
          </Box>
        </FlexBox>
      ))}
    </LegendBox>
  );
};

export default DashboardPieLegend;
