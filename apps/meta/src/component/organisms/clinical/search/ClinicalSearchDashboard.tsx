import { FlexBox } from 'cjbsDSTM/atoms/box/FlexBox';
import { FlexGrid } from 'cjbsDSTM/atoms/grid/FlexGrid';
import MyIcon from 'icon/MyIcon';
import { Box, Divider, Grid, Typography, styled, Stack } from '@mui/material';
import React from 'react';

const InfoGrid = styled(Grid)`
  box-sizing: border-box;
  width: 100%;
  height: 61px;
  background: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 2px;
  margin-top: 15px;
`;
interface Props {
  data: DashboardItem[];
}

export interface DashboardItem {
  icon: string;
  name: string;
  count: number;
}

export default function ClinicalSearchDashboard({ data }: Props) {
  return (
    <InfoGrid container>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        {data.map((item, index) => (
          <FlexGrid key={index} item xs={3}>
            <MyIcon icon={item.icon} size={35} color="black" />
            <Typography ml={'12px'} variant="subtitle1">
              {item.name}
            </Typography>
            <Typography ml={'120px'} variant="title2">
              {item.count}
            </Typography>
            {data.length !== index + 1 && (
              <Divider
                sx={{ ml: '15%' }}
                orientation="vertical"
                variant={'middle'}
                flexItem
              />
            )}
          </FlexGrid>
        ))}
      </Stack>
    </InfoGrid>
  );
}
