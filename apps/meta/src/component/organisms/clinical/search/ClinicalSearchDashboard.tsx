import { FlexGrid } from '@components/atoms/grid/FlexGrid';
import { Box, Divider, Grid, Typography, styled } from '@mui/material';
import React from 'react';
import MyIcon from '../../../../../../../packages/icon/MyIcon';

const InfoGrid = styled(Grid)`
  box-sizing: border-box;
  width: 100%;
  height: 61px;
  left: 328px;
  top: 240px;
  background: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 2px;
  margin-top: 15px;
`;
interface Props {
  data: DashboardItem[];
}

interface DashboardItem {
  icon: string;
  name: string;
  count: number;
}

export default function ClinicalSearchDashboard({ data }: Props) {
  return (
    <Grid item xs={12}>
      <InfoGrid container>
        {data.map((item, index) => (
          <Box>
            <FlexGrid item xs={3}>
              <MyIcon icon={item.icon} size={35} color="black" />
              <Typography ml={'12px'} variant="subtitle1">
                {item.name}
              </Typography>
              <Typography ml={'120px'} variant="title2">
                {item.count}
              </Typography>
            </FlexGrid>
            {data.length !== index + 1 && (
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ mr: '-1px' }}
              />
            )}
          </Box>
        ))}
      </InfoGrid>
    </Grid>
  );
}
